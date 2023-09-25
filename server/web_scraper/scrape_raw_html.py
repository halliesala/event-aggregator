
from .lib.WebFetch import WebFetch
from .lib.content_identifier import ProcessHTML


# read URLs.txt and return the urls as an array
def read_url_file(filename="URLs.txt"):
    with open(filename, "r") as file:
        urls = [url.strip() for url in file.readlines()]
    return urls

# read URLs.txt then scrape content at each URL
def scrape_url(url, max_pages, waitMultiplier=1.2):
    try:
    # initialize the web scraper - max_pages specifies how many pages per url will be scraped
        fetcher = WebFetch(max_pages=max_pages)
        # get the repetitive elements and write them to a file
        elements = fetcher.get_web_content(url, waitMultiplier=waitMultiplier) # waitMultiplier sets how long the fetcher will wait for pages to load before performing actions
        rep_elem = elements.get_most_likely_content()
        file = rep_elem.write_elements()
        fetcher.end_session()
        return file
    except Exception as e:
        fetcher.end_session()
        print("There was an error:")
        print(e)
        return None







