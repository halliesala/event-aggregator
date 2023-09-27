###
###
### This is a GPT adapted version of this repo: https://github.com/deepanprabhu/duckduckgo-images-api
###

import requests
import re
import time
import random
import concurrent.futures

def fetch_image_url(event):
    # Introduce a random delay before making the request
    delay = random.uniform(0.8, 3.2)
    time.sleep(delay)
    
    def fetch_img(search, is_retry=False):
        if is_retry:
            # If this is a retry, wait a bit longer
            retry_delay = random.uniform(2.8, 5.3)
            time.sleep(retry_delay)

        url = 'https://duckduckgo.com/'
        params = {'q': search}
        res = requests.post(url, data=params)
        searchObj = re.search(r'vqd=([\d-]+)\&', res.text, re.M | re.I)
        if not searchObj:
            return None  # Could not obtain token

        params = (
            ('l', 'us-en'),
            ('o', 'json'),
            ('q', search),
            ('vqd', searchObj.group(1)),
            ('f', ',,,'),
            ('p', '1'),
            ('v7exp', 'a'),
        )
        requestUrl = url + "i.js"
        res = requests.get(requestUrl, params=params)
        return res.json()

    try:
        data = fetch_img(event.title)
        if data:
            if "results" in data:
                if len(data["results"]) > 0:
                    print("Found image...")
                    event.img_link = data["results"][0]["image"]
                else:
                    print("No image results found in the data.")
                    print(data)  # Printing out the data to inspect its structure
            else:
                print("The 'results' key is missing in the data.")
                print(data)  # Printing out the data to inspect its structure
        else:
            print("Data is empty or None. Trying another search...")
            data = fetch_img(event.img_link, is_retry=True)  
            if data and "results" in data and len(data["results"]) > 0:
                event.img_link = data["results"][0]["image"]
            else:
                raise ValueError("Failed to fetch image after retrying.")

    except Exception as e:
        print("Error fetching image:")
        print(e)
        print(f"DEBUG: title:{event.title}, img_link: {event.img_link}")
        event.img_link = "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"

    return event

# The parallel_fetch function remains unchanged.



def parallel_fetch(events, max_workers=6):
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        results = list(executor.map(fetch_image_url, events))
    return results
