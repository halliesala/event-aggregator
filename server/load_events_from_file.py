from app import app
from models import db, Event, User, UserEvent
from random import choice
from load_events import load_events

EVENTS_FILENAME = 'dice_test_file.csv'


if __name__ == '__main__':
    with app.app_context():
        
        print(f"Loading events from {EVENTS_FILENAME}...")

        events = load_events(EVENTS_FILENAME)
        
        db.session.add_all(events)
        db.session.commit()

        print("Done.")

        