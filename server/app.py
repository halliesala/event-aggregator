from flask import Flask, request, jsonify, session, Response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource 
from datetime import datetime
from Web_scraper import Web_scraper
from load_events import load_events

from models import db, Event, User, UserEvent, Site

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.secret_key = 'BAD_SECRET_KEY'


migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

class Home(Resource):
    def get(self):
        return {"message": "Welcome to the Event Aggregator RESTful API"}, 200

api.add_resource(Home, '/')


class CheckSession(Resource):
    def get(self):
        try:
            return User.query.filter_by(id ==session.get('user_id')).first().to_dict()
        except:
            return {'message': '401: Not Authorized'}, 401
api.add_resource(CheckSession, '/check_session')

class Login(Resource):
    def post(self):
        data = request.json
        user = User.query.filter_by(username=data['username']).first()
        if user:
            session['user_id'] = user.id
            session['test'] = 'hello!'
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {'message': '204 No Content'}, 204
api.add_resource(Logout, '/logout')

class Events(Resource):
    def get(self):
        return [e.to_dict() for e in Event.query.all()], 200
api.add_resource(Events, '/events')


class EventsById(Resource):
    def get(self, id):
        try:
            return Event.query.filter_by(id=id).one().to_dict(), 200
        except:
            return {"error": "no such event"}, 404 
api.add_resource(EventsById, '/events/<int:id>')

class Users(Resource):
    def get(self):
        return [u.to_dict() for u in User.query.all()], 200
api.add_resource(Users, '/users')

class UsersById(Resource):
    def get(self, id):
        try:
            return User.query.filter_by(id=id).one().to_dict(), 200
        except:
            return {"error": "no such user"}, 404 
api.add_resource(UsersById, '/users/<int:id>')

class Sites(Resource):
    def get(self):
        return [s.to_dict() for s in Site.query.all()], 200 
    
    # curl -i -X POST "localhost:5555/sites" -H "Content-Type: application/json" -d '{"last_scraped": "2023-09-25 1:23:00", "url": "https://fake.com", "data_path": "/fake.html"}'
    def post(self):
        new_record = Site(**request.json)
        db.session.add(new_record)
        db.session.commit()
        return new_record.to_dict(), 201

api.add_resource(Sites, '/sites')


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


