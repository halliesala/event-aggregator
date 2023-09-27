import openai
from .key import key
from bs4 import BeautifulSoup
import json
import concurrent.futures
from datetime import datetime

openai.api_key = key
  
 # this is essentially a normal GPT function but with a timeout - i.e. if GPT takes too long to respond
 # the function will time out and return None to limit processing time 

def get_completion(prompt, model="gpt-3.5-turbo", temperature=0):
        
        messages = [{"role": "system", "content": prompt}]
        try:
            response = openai.ChatCompletion.create(
            model=model,
            messages=messages,
            temperature=temperature,
            request_timeout=15 
            )
        except Exception as e:
            print("GPT Error:")
            print(e)
            return None
        return response.choices[0].message["content"]

# extracts visible text from raw html and structures it with GPT
def prep_contents(element):

    soup = BeautifulSoup(str(element), 'lxml')
    # get all links in the HTML
    links = [a['href'] for a in soup.find_all('a', href=True)]

    # all of this text processing is to remove anything that is not plain text in the html
    for script in soup(["script", "style"]):
            script.extract()

    text = soup.get_text()
    lines = (line.strip() for line in text.splitlines())
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
    text = '-'.join(chunk for chunk in chunks if chunk)
    # structure contents 

    if len(text) < 20:
        print("Element too short. Removing...")
        return None 
        
    structured = structure_contents(text, links)
    return structured

# turn plain text into structured JSON via GPT
def structure_contents(contents, links):
    event_tags = [
    "Music", "Happy-hour", "Food", "Networking", "Art", "Workshop", "Sports", 
    "Charity", "Education", "Festival", "Outdoor", "Performance", "Lecture",
    "Seminar", "Conference", "Dance", "Film", "Theater", "Comedy", "Literature",
    "Family-friendly", "Cultural", "Fashion", "Craft", "Exhibition", "Fitness",
    "Yoga", "Meditation", "Technology", "Fundraiser", "Auction", "Launch", 
    "Celebration", "Spiritual", "Culinary", "Wine-tasting", "Beer-tasting", 
    "Pop-up", "DIY", "Virtual", "Adventure", "Travel", "Nightlife", "Rave", "Retreat",
    "Reunion", "Gaming", "Role-playing", "Cosplay", "Market", "Trade-show"
    ]

    now = datetime.now()

    short_prompt = f"""
Given the text and links below, provide a response following the provided JSON structure:

Text:
{contents}

Links:
{links}

JSON Format:
{{
  "is_event": "boolean",  # Set to 'True' ONLY if the text refers to ONE SPECIFIC event. Set to 'False' for general mentions or non-informative content.
  "title": "string",
  "description": "string",  # Brief summary.
  "start_date": "string",   # Format: YYYY-MM-DD or YYYY-MM-DD HH:MM. Default to {now.year}-{now.month} if partial.
  "end_date": "string",
  "location": "string",
  "price": "float",         # Use -1 if not mentioned, 0 if free.
  "sold_out": "boolean",
  "link": "string",         # Provide a relevant link from the 'links'.
  "img_link": "string",     # Provide a search string which is less specific than the title to locate an image relevant to the event, rather than a direct link. This cannot be null.
  "tags": ["string", ...],  # Use ONLY 1-3 appropriate tags from the list: {event_tags}
  "confidence": "integer"   # Confidence level (0-10) regarding the accuracy of event details.
}}

If any attribute is unavailable, use "attribute_name": null. Ensure every attribute is included. Stick to the date format: YYYY-MM-DD or YYYY-MM-DD HH:MM.
"""


 

    # tags and GPT prompt
   
    prompt = f"""
Given the text below describing an event, respond using the provided JSON template format. Only respond with the JSON structure and no additional text.

{contents}

Links: 
JSON Format:
{{
  "title": "string",       # The event title.
  "description": "string", # A short summary of the event.
  "start_date": "string",  # Start date in YYYY-MM-DD format. Include time as HH:MM if provided. If the date provided lacks a month or year, assume the year is {now.year} and the month is {now.month}.
  "end_date":"string",     # End date in YYYY-MM-DD format. Include time as HH:MM if provided. If the date provided lacks a month or year, assume the year is {now.year} and the month is {now.month}.
  "location": "string",   # The event location.
  "price": "float",       # The event price. If not specified, use -1. If the event is free, use 0.
  "sold_out": "boolean",  # True if anything indicates the event can't be attended currently.
  "link": "string"        # Try to extract a link which is likely to provide more information on the event.                          
  "img_link":"string"     # Try to extract a link which is likely an image relating to the link
  "tags": ["string", ...] # An array of strings as 'tags' to describe the event. Pick as many as needed from this list: 
}}

If any attribute isn't present or identifiable, use the format:
"example_missing_attribute": null
Never omit a variable in the output JSON, always use the above format.
"""

    #resp = get_completion_timout(short_prompt)
    return short_prompt

    """
    print(resp)

    # attempt to parse JSON
    try:
        # ensure common errors are fixed. Ex: false -> False
        valid_json_string = (resp.replace("Null", "null")
                    .replace("False", "false")
                    .replace("True", "true"))
        event = json.loads(valid_json_string)
        return event
    except Exception as e: # return None if error
        print("Error converting GPT ouput to JSON")
        print(e)
        return None
        """
    
def parse_json(input):
    try:
        # ensure common errors are fixed. Ex: false -> False
        valid_json_string = (input.replace("Null", "null")
                    .replace("False", "false")
                    .replace("True", "true"))
        event = json.loads(valid_json_string)
        return event
    except Exception as e: # return None if error
        print("Error converting GPT ouput to JSON")
        print(e)
        return None