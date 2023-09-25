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
                (title, description, date, time, location, price, sold_out) = line
                sold_out = True if sold_out=='TRUE' else False
                try: 
                    date = parser.parse(date + ' ' + time)
                except ParserError:
                    try:
                        date = parser.parse(date)
                    except ParserError:
                        date = None

                e = Event(title=title, description=description, location=location, price=price, date=date, sold_out=sold_out, site=site)
                events.append(e)

        return events

