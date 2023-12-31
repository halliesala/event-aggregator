from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    # serialize_rules = ('-user_events.events', '-users')
    serialize_only = ('id', 'title', 'description', 'start_date',
                   'end_date', 'location', 'price', 'sold_out',
                   'link', 'img_link', 'tags', 'site_id', 'site', 'coords', 'user_events.user_id', 'user_events.user.username')

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    location = db.Column(db.String)
    price = db.Column(db.Float)
    sold_out = db.Column(db.Boolean)
    link = db.Column(db.String)
    img_link = db.Column(db.String)
    tags = db.Column(db.String)

    coords_id = db.Column(db.Integer, db.ForeignKey("coords.id"))
    site_id = db.Column(db.Integer, db.ForeignKey("sites.id"))
    site = db.Relationship("Site")

    coords = db.relationship("Coords")
    user_events = db.relationship("UserEvent", back_populates="event")

    users = association_proxy("user_events.events", "user")

class Coords(db.Model, SerializerMixin):
    __tablename__ = 'coords'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_only = ('id', 'username', 'f_name', 'l_name', 'password')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    f_name = db.Column(db.String)
    l_name = db.Column(db.String)

    user_events = db.Relationship("UserEvent", back_populates="user")

    events = association_proxy("user_events", "event")
    

class UserEvent(db.Model, SerializerMixin):
    __tablename__ = 'user_events'

    serialize_only = ('id', 'user_id', 'event_id')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    user = db.Relationship("User", back_populates="user_events")
    event = db.Relationship("Event", back_populates="user_events")


class Site(db.Model, SerializerMixin):
    __tablename__ = "sites"
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String)
    last_scraped = db.Column(db.String, nullable=True)
    data_path = db.Column(db.String, nullable=True)

