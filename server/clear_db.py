from app import app
from models import db, Event, User, UserEvent, Site


if __name__ == '__main__':
    with app.app_context():

        print("Clearing db...")
        UserEvent.query.delete()
        Event.query.delete()
        # User.query.delete()
        # Site.query.delete()
        db.session.commit()
        print("Done!")