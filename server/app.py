from flask import Flask, request, jsonify, session, Response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource 
from datetime import datetime
from Web_scraper import Web_scraper
from load_events import load_events
from flask_bcrypt import Bcrypt

from models import db, Event, User, UserEvent, Site

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.secret_key = 'BAD_SECRET_KEY'


migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)
bcrypt = Bcrypt(app)

# AUTH HELPER METHODS #
def logged_in_user():
    return User.query.filter_by(id=session.get('user_id')).first()

def username_taken(username):
    return bool(User.query.filter_by(username=username).first())

class Home(Resource):
    def get(self):
        return {"message": "Welcome to the Event Aggregator RESTful API"}, 200

api.add_resource(Home, '/')


class CheckSession(Resource):
    def get(self):
        try:
            return logged_in_user().to_dict(), 200
        except:
            return {'message': 'No user found.'}, 401
api.add_resource(CheckSession, '/check_session')

class SignUp(Resource):
    def post(self):
        data = request.json
        username, password, f_name, l_name = data['username'], data['password'], data['f_name'], data['l_name']
        if username_taken(username):
            return {'message': 'That username is taken.'}, 400
        else:
            password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
            new_user = User(username=username, password=password_hash, f_name=f_name, l_name=l_name)
            
            # Add user to db
            db.session.add(new_user)
            db.session.commit()

            # Save user_id in cookie
            session['user_id'] = new_user.id
            return new_user.to_dict(), 201
api.add_resource(SignUp, '/signup')
        

class Login(Resource):
    def post(self):
        data = request.json
        print(data)

        user = User.query.filter_by(username=data['username']).first()
        print(user)
        if user:
            if bcrypt.check_password_hash(user.password, data['password']):
                session['user_id'] = user.id
                return user.to_dict(), 201
            else:
                print(f"Incorrect password.")
                return {'message': 'Incorrect password'}, 401
        else:
            return {'message': 'Invalid username'}, 401
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
    
    def delete(self, site_id):
        site = Site.query.filter(Site.id == site_id).first()
        if not site:
            return {"error":"site not found"}, 404
        db.session.delete(site)
        db.session.commit()
        return site.to_dict(), 200

api.add_resource(Sites, '/sites', '/sites/<int:site_id>')


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
        file = Web_scraper.process_html(site.data_path, max_events=1) 
        events = load_events(file, site)
        for event in events:
            db.session.add(event)
        db.session.commit()
        return "success"
    except Exception as e:
        return str(e)
    


if __name__ == "__main__":
    app.run(port=5555)


