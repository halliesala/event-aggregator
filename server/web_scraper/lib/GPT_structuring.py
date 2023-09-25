import openai
from .key import key
from bs4 import BeautifulSoup
import json
import concurrent.futures

openai.api_key = key
  
 # this is essentially a normal GPT function but with a timeout - i.e. if GPT takes too long to respond
 # the function will time out and return None to limit processing time 
def get_completion_timout(prompt, model="gpt-3.5-turbo", temperature=0.1,timeout=10):
    # nested GPT function 
    def get_completion():
        messages = [{"role": "system", "content": prompt}]
        
        response = openai.ChatCompletion.create(
            model=model,
            messages=messages,
            temperature=temperature
        )
        return response.choices[0].message["content"]
    # dont 100% understand this but i believe its running on another thread 
    with concurrent.futures.ThreadPoolExecutor() as executor:
          future = executor.submit(get_completion)
          try:
               return future.result(timeout=timeout)
          # exception for timeout
          except concurrent.futures.TimeoutError:
               print("API call took too long... moving on")
               return None
          # exception for any GPT related error
          except Exception as e:
               print("GPT Error")
               print(e)
               return None
               
               

# extracts visible text from raw html and structures it with GPT
def extract_contents(element):

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
    print("getting response...")

    # structure contents 
    structured = structure_contents(text, links)
    print("done structureing")
    return structured

# turn plain text into structured JSON via GPT
def structure_contents(contents, links):
    # tags and GPT prompt
    event_tags = [
    "Music", "Happy-hour", "Food", "Networking", "Art", "Workshop", "Sports", 
    "Charity", "Education", "Festival", "Outdoor", "Performance", "Lecture",
    "Seminar", "Conference", "Dance", "Film", "Theater", "Comedy", "Literature",
    "Family-friendly", "Cultural", "Fashion", "Craft", "Exhibition", "Fitness",
    "Yoga", "Meditation", "Technology", "Fundraiser", "Auction", "Launch", 
    "Celebration", "Spiritual", "Culinary", "Wine-tasting", "Beer-tasting", 
    "Pop-up", "DIY", "Virtual", "Adventure", "Travel", "Nightlife", "Retreat",
    "Reunion", "Gaming", "Role-playing", "Cosplay", "Market", "Trade-show"
]
    prompt = f"""
Given the text below describing an event, respond using the provided JSON template format. Only respond with the JSON structure and no additional text.

{contents}

Links: {links}
JSON Format:
{{
  "title": "string",       # The event title.
  "description": "string", # A short summary of the event.
  "start_date": "string",  # Start date in YYYY-MM-DD format. Include time as HH:MM if provided.
  "end_date":"string",     # End date in YYYY-MM-DD format. Include time as HH:MM if provided.
  "location": "string",   # The event location.
  "price": "float",       # The event price. If not specified, use -1. If the event is free, use 0.
  "sold_out": "boolean",  # True if anything indicates the event can't be attended currently.
  "link": "string"        # Try to extract a link which is likely to provide more information on the event.                          
  "img_link":"string"     # Try to extract a link which is likely an image relating to the link
  "tags": ["string", ...] # An array of strings as 'tags' to describe the event. Pick as many as needed from this list: {event_tags}
}}

If any attribute isn't present or identifiable, use the format:
"example_missing_attribute": null
Never omit a variable in the output JSON, always use the above format.
"""

    resp = get_completion_timout(prompt)
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