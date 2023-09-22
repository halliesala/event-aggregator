from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from models import db, Event, User, UserEvent

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
    

if __name__ == "__main__":
    app.run(port=5555)


