# from app import app
from models import db, Event, Coords
from google_maps_api_key import MAPS_API_KEY
import requests
import googlemaps

EVENTS_FILENAME = 'dice_test_file.csv'

# Bounds for New York City
bounds = {
    'northeast': {'lat': 40.9176, 'lng': -73.7004},
    'southwest': {'lat': 40.4774, 'lng': -74.2591},
}
    

class GetCoords():
    def __init__(self, app):
        self.app = app

    def get_coordinates(self, address):
        gmaps = googlemaps.Client(key=MAPS_API_KEY)
        geocode_result = gmaps.geocode(address, bounds=bounds)
        if geocode_result:
            location = geocode_result[0]['geometry']['location']
            return location['lat'], location['lng']
        else:
            return None
    
    def run_script(self):
        with self.app.app_context():
            print("Getting coords ...")
            events = Event.query.all()
            locations = {c.name for c in Coords.query.all()}

            for i, e in enumerate(events):
                print(f"#{i}")
                if not e.coords:
                    if e.location in locations:
                        print(f"Coords for {e.location} known; updating db.")
                        e.coords = Coords.query.filter_by(name=e.location).first()
                        db.session.commit()
                    else:
                        print("Getting coords for location: ", e.location)
                        try:
                            (lat, lng) = self.get_coordinates(e.location)
                        except:
                            print("Could not get coords for location: ", e.location, ". Dummy coords added.")
                            # If no coords, it's in the middle of the East River
                            lat, lng = 40.738553075435945, -73.9676952401294
                        coords = Coords(lat=lat, lng=lng, name=e.location)
                        db.session.add(coords)
                        db.session.commit()
                        locations.add(coords.name)
                        e.coords = coords
                        print("Added coords: ", coords.to_dict())

            print("Done.")

