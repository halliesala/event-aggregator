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
    url = 'https://duckduckgo.com/'
    params = {'q': event.title}
    
    # Introduce a random delay before making the request
    delay = random.uniform(0.5, 2.0)  # Random delay between 0.5 to 2 seconds
    time.sleep(delay)
    
    try:
        res = requests.post(url, data=params)
        searchObj = re.search(r'vqd=([\d-]+)\&', res.text, re.M | re.I)
        if not searchObj:
            return event  # Could not obtain token

        params = (
            ('l', 'us-en'),
            ('o', 'json'),
            ('q', event.title),
            ('vqd', searchObj.group(1)),
            ('f', ',,,'),
            ('p', '1'),
            ('v7exp', 'a'),
        )

        requestUrl = url + "i.js"
        res = requests.get(requestUrl, params=params)
        data = res.json()

        if "results" in data and len(data["results"]) > 0:
            event.img_link = data["results"][0]["image"]
    except Exception as e:
        event.img_link = "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
        pass
    return event

def parallel_fetch(events, max_workers=10):
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        results = list(executor.map(fetch_image_url, events))
    return results
