from models import db, Event, User, UserEvent
import csv
from dateutil import parser
from dateutil.parser._parser import ParserError
#from duckduckgo_images_api import search


def load_events(filename, site=None):
        events = []
        with open(filename, 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            next(reader)
            for line in reader:
                (title, description, start_date, end_date, location, price, sold_out, link, img_link, tags) = line
                sold_out = True if sold_out=='TRUE' else False
                try:
                    if start_date:
                        start_date = parser.parse(str(start_date))
                    if end_date:
                        end_date = parser.parse(str(end_date))
                    else:
                         end_date = start_date
                except Exception as e:
                    print("Error parsing date:")
                    print(e)
                    continue

                e = Event(title=title, description=description, location=location, price=price, start_date=start_date, end_date=end_date,link=link, img_link=img_link,tags=str(tags), sold_out=sold_out, site=site)
             
                events.append(e)
        return events



        
     

