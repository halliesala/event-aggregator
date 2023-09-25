from app import app
from models import db, Event, User, UserEvent
from faker import Faker
from random import randint, choice
from load_events import load_events

fake = Faker()
EVENTS_FILENAME = 'test_data.csv'


if __name__ == '__main__':
    with app.app_context():
        print("Seeding database...")

        print("Deleting old data...")
        #UserEvent.query.delete()
        Event.query.delete()
        db.session.commit()
        #User.query.delete()
"""
        print("Seeding users...")
        def get_username():
            return fake.word() + '_' + fake.word()
        users = [User(username=get_username(), 
                      f_name=fake.first_name(), 
                      l_name=fake.last_name()) 
                 for _ in range(10)]
        db.session.add_all(users)
        db.session.commit()

        # print("Seeding events...")
        # TAGS = ('kid-friendly', 'opera', 'halloween', 'food', 'street fair', 'free', 'all day', 'ticketed', 'dancing', 'relaxed')
        # events = [Event(title=fake.catch_phrase(),
        #                 description=fake.text(max_nb_chars=200),
        #                 date=fake.date_time_this_month(),
        #                 location=fake.address(),
        #                 price=randint(0, 100),
        #                 sold_out=choice((True, False)),
        #                 category=choice(("music", "theater", "festival", "film")),
        #                 tags=f'"tags": {[choice(TAGS) for _ in range(3)]}') 
        #           for _ in range(100)]
        
        print(f"Loading events from {EVENTS_FILENAME}")

        events = load_events(EVENTS_FILENAME)
        
        db.session.add_all(events)
        db.session.commit()

        print("Seeding user_events...")
        user_events = [UserEvent(user=choice(users), 
                                 event=choice(events))
                       for _ in range(100)]
        
        db.session.add_all(user_events)
        """
        #db.session.commit()

        #print("Seeding complete!")