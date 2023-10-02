
from web_scraper.scrape_raw_html import scrape_url
from web_scraper.process_file import process_file

# high level interface connected to the web scraper repo
class Web_scraper():

    # scrape a site
    # url: the site url
    # max_pages: max number of pages to scrape
    @classmethod
    def scrape_site(cls, url, max_pages):
        try:
            file = scrape_url(url, max_pages)
            return file # returns PATH of output file
        except Exception as e:
            print(e)
            return None

    # file = the path of an file containing HTML to turn in structured data    
    @classmethod
    def process_html(cls, file):
        try:
            processed_file = process_file(file)
            return processed_file # PATH to processed file
        except Exception as e:
            print(e)
            return None
        

