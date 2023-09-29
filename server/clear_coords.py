
from app import app
from models import db, Coords

if __name__ == '__main__':
    with app.app_context():
        print("Deleting coords ...")
        Coords.query.delete()
        db.session.commit()