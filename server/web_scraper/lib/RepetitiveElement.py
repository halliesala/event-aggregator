from bs4 import BeautifulSoup, Tag
import re
import json

# I had GPT write these comments
# Represents elements that are repetitive in the web content
class RepetitiveElement:
    # Constructor initializes with identification, count of occurrences, content, and optional source URL
    def __init__(self, ident, count, content, source=None):
        self.content = list(content)  # Content list for the repetitive element
        self.count = count  # Count of this repetitive element
        self.ident = ident  # Identifier, could be class or any other type
        self.source = source  # Source URL from where this repetitive element is found

    # String representation for debugging purposes
    def __repr__(self):
        return f"<Identifier: {self.ident}, Elements present: {self.count}>"

    # Debug method to print titles from the content (assuming the content has 'h4' tags)
    def debug(self):
        for element in self.content:
            if element is not None:
                soup = BeautifulSoup(str(element), 'lxml')
                title = soup.find('h4').text.strip()
                print(title)

    # Writes the raw HTML of repetitive elements to a file in the raw_html folder
    def write_elements(self):
        # Create a sanitized filename using only word characters from the source URL
        name = "".join([c for c in self.source if re.match(r'\w', c)])  # consider adding date here
        file_path = f"raw_html/{name}.html"
        with open(file_path, "w") as f:
            formatted_text = [str(item) for item in self.content]
            json.dump(formatted_text, f)
        return file_path


# Container to hold all the repetitive elements found in the web content
class ElementContainer:
    # Constructor initializes with a given URL
    def __init__(self, url):
        self.elements = []  # List to store repetitive elements
        self.url = url  # Source URL

    # Adds a new repetitive element to the container
    def add(self, ident, count, content):
        new_element = RepetitiveElement(ident, count, content, self.url)
        for element in self.elements:
            # If an element with the same identifier exists, merge their content and counts
            if new_element.ident == element.ident:
                element.content += new_element.content
                element.count += new_element.count
                return
        # If no existing element has the same identifier, append the new element to the list
        self.elements.append(new_element)

    # Debug method to print content of all elements in the container
    def print(self):
        for element in self.elements:
            print("======= ELEMENT ========")
            print(element.content)

    # Returns the repetitive element with the highest occurrence
    def get_most_likely_content(self):
        # Sort elements based on count in descending order and return the top one
        self.elements.sort(key=lambda x: x.count, reverse=True)
        return self.elements[0]


        