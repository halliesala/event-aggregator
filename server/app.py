from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from datetime import datetime
from Web_scraper import Web_scraper
from load_events import load_events

from models import db, Event, User, UserEvent, Site

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

migrate = Migrate(app, db)
db.init_app(app)

@app.get('/')
def index():
    return "Event Aggregator Server"

@app.get('/events')
def get_events():
    return jsonify([e.to_dict() for e in Event.query.all()]), 200

@app.get('/users')
def get_users():
    return jsonify([u.to_dict() for u in User.query.all()]), 200

@app.get('/events/<int:id>')
def get_event(id):
    try:
        return jsonify(Event.query.filter_by(id=id).one().to_dict()), 200
    except:
        return jsonify({"error": "no such event"}), 404
    
@app.get('/users/<int:id>')
def get_user(id):
    try:
        return jsonify(User.query.filter_by(id=id).one().to_dict()), 200
    except:
        return jsonify({"error": "no such user"}), 404

@app.post('/sites')
def post_site():
    data = request.json
    try:
        new_site = Site(url=data.get('url'), last_scraped=None, data_path=None)
        db.session.add(new_site)
        db.session.commit()
        return jsonify(new_site.to_dict())
    
    except:
        return jsonify({"error":"Bad post request"})

@app.get('/sites')
def get_sites():
    sites = Site.query.all()
    return jsonify([site.to_dict() for site in sites])

# scrape site with specified id    
@app.get('/scrape/<int:id>')
def scrape_site(id):
    now = datetime.now()
    try:
        site = Site.query.filter(Site.id == id).first()
        if site:
            data = Web_scraper.scrape_site(site.url)
            site.data_path = data
            site.last_scraped = now.strftime('%Y-%m-%d %H:%M:%S')
            db.session.add(site)
            db.session.commit()
            return data
    except:
        return jsonify({"error":"Scraping failed"})
    
@app.get('/process/<int:id>')
def process_site(id):
    site = Site.query.filter(Site.id == id).first()
    if not site:
        return jsonify({"error":"Site not found"}), 404
    
    try: 
        file = Web_scraper.process_html(site.file_path) 
        load_events(file, site)
        return "success"
    except:
        return jsonify({'error':'unable to process site data'})
    


if __name__ == "__main__":
    app.run(port=5559)


