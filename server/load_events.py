from models import db, Event, User, UserEvent
import csv
from dateutil import parser
from dateutil.parser._parser import ParserError

def load_events(filename, site):
        events = []
        with open(filename, 'r') as file:
            reader = csv.reader(file)
            next(reader)
            for line in reader:
                (title, description, start_date, end_date, location, price, sold_out, link, img_link, tags) = line
                sold_out = True if sold_out=='TRUE' else False
                try:
                    print(f"STARRT DATE: {start_date}") 
                    start_date = parser.parse(str(start_date))
                    end_date = parser.parse(str(end_date))

                except Exception as e:
                    print(e)

                e = Event(title=title, description=description, location=location, price=price, start_date=start_date, end_date=end_date,link=link, img_link=img_link,tags=str(tags), sold_out=sold_out, site=site)
             
                events.append(e)
        return events

