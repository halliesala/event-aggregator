import requests
from bs4 import BeautifulSoup, Tag
from collections import defaultdict
from selenium import webdriver
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.common.by import By
from .content_identifier import ProcessHTML
import time

# Class to handle web fetching of pages and extracting content
class WebFetch:
    # Constructor initializes with default max_pages and minimum likes
    def __init__(self, max_pages, min_like_values=5):
        self.min_like_values = min_like_values
        self.max_pages = max_pages
        self.setup()  # set up web driver

    # Function to get content of a webpage
    def get_web_content(self, url, waitMultiplier=1):
        # Check if webpage uses infinite scrolling
        infinite_scroll = True

        # Open browser and navigate to specified URL
        self.driver.get(url)  
        # Allow some time for the page to load
        time.sleep(2 * waitMultiplier)  

        # Get the current height of the webpage
        last_height = self.driver.execute_script("return document.body.scrollHeight")

        # Try to scroll to see if there's more content (to handle infinite scrolling)
        for i in range(self.max_pages):  
            # Scroll to the bottom of the current page view
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            # Pause for new content to load if there's any
            time.sleep(1 * waitMultiplier)  
            # Get new height of the page
            new_height = self.driver.execute_script("return document.body.scrollHeight")
            # If height doesn't change, infinite scroll isn't present
            if new_height == last_height:  
                infinite_scroll = False
                break

        processer = ProcessHTML(url)

        # If no infinite scroll, process each page
        if not infinite_scroll:
            HTML_buffer = []
            for i in range(self.max_pages):
                processer.get_items(self.driver.page_source)
                if not self.navigate_to_next_page():
                    print("No next page, quitting.")
                    break
                time.sleep(1 * waitMultiplier)
        else:
            processer.get_items(self.driver.page_source)

        return processer.rep_elems

    # Setup function initializes web driver settings
    def setup(self):
        self.options = webdriver.FirefoxOptions()
        # Point to the location of Firefox binary
        self.options.binary_location = "./drivers/Firefox.app"
        # Run Firefox in headless mode
        self.options.add_argument("--headless=new")  
        # Initialize the web driver
        self.driver = webdriver.Firefox(options=self.options)

    # Function to close the browser session
    def end_session(self):
        self.driver.close()

    def get_items(self):
        self.traverse_tree(self.soup.body)

    # Function to navigate to the next page of a multi-page website
    def navigate_to_next_page(self):
        
        # Look for all anchor tags
        elements = self.driver.find_elements(By.TAG_NAME, 'a')
        has_next_page = False

        def click_button(element):
            y_position = element.location['y'] - (self.driver.get_window_size()['height'] / 2)
                # Use JavaScript to scroll to the desired position
            self.driver.execute_script(f"window.scrollTo(0, {y_position});")
            time.sleep(0.5)
            element.click()


        # Check each link to see if it indicates a 'next page'
        for element in elements:
            text = element.text.lower().strip()
            # If the link has "next" in its text, consider it a next page link
            if "next" in text:
                """
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(0.5)
                has_next_page = True
                element.click()
                """
                click_button(element)
                has_next_page = True
                break

            if "show more" in text:
                click_button(element)
                has_next_page = True
                break
            if "more events" in text:
                click_button(element)
                has_next_page = True
                break


        return has_next_page  # Return True if next page is found, False otherwise

    
    def attempt_to_load_more(self):
        pass

    
    # DEPRECIATED: classic HTML fetch method - doesnt load JS
    @classmethod
    def fetchHTML(cls, url, fake_headers=True):
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        if fake_headers:
            resp = requests.get(url, headers=headers)
        else:
            resp = requests.get(url)

        if resp.status_code == 200:
            html_content = resp.text
            soup = BeautifulSoup(html_content, 'lxml')
            return soup
        
        else:
            print(f"Failed to fetch webpage. Status code: {resp.status_code}")
            return None
        
        
        


        