# advanced web scraper
 My attempt at a somwhat universal web scraper designed for sites with repetitive content

To install:

```
pipenv install
```

Create a folder called "drivers" within the working directory.

Download gecko driver here: https://github.com/mozilla/geckodriver/releases
Download firefox

Place both firefox and geckodriver in the drivers folder.

Run scraper.py

## **Objective**: 
The primary objective of this project is to process web pages (in the form of saved HTML content) and identify and structure repetitive elements/events within them, ultimately saving the extracted structured information into a CSV file.

---

## **Components**:

1. **Classes**:
   - `ProcessHTML`: This class is responsible for parsing the HTML and identifying repetitive elements (elements with similar classes or item types). 
     - The `get_items` method is the entry point, where it takes HTML content, parses it using BeautifulSoup, and traverses the parsed tree to identify and record repetitive elements.
     - `traverse_tree` recursively traverses the HTML tree, while `get_shared_values_at_same_level` looks for repeated classes or item types at the same nesting level.
   - `RepetitiveElement`: Represents a set of repetitive elements from the HTML. It captures the identifier, count, and the actual content (HTML elements).
     - The `write_elements` method allows for saving the raw HTML content of these elements to a file.
   - `ElementContainer`: Maintains a list of `RepetitiveElement` objects. It ensures that, if elements with the same identifier are encountered, they get merged rather than creating duplicate entries.

2. **API Interaction**:
   - `get_completion_timout`: This function interfaces with the GPT-3 API, sending content to it and receiving structured data as JSON. It has a built-in timeout mechanism to handle cases where the API call takes too long.

3. **Content Extraction & Structuring**:
   - `extract_contents`: This takes raw HTML, extracts links and texts while removing scripts and styles, then sends the content to GPT-3 for structuring using the `structure_contents` function.
   - `structure_contents`: It crafts a prompt for GPT-3, guiding the model on how to structure the provided content, especially concerning events. Once the structured response is obtained from GPT-3, it's converted into a JSON format for further processing.

4. **File Handling**:
   - `read_file`: Reads the contents of a specified file and returns it.
   - `process_file`: Orchestrates the overall processing. It reads an HTML file, extracts and structures its content, and then writes the structured data to a CSV file.

---

## **Workflow**:

1. The `process_file` function initiates the workflow. 
2. It first reads raw HTML data using `read_file`.
3. It then extracts structured information from the first piece of this data using `extract_contents` (just to determine the structure/fields).
4. If the destination CSV doesn't exist, it's created and headers are written based on the extracted structure.
5. The function then iterates through each piece of data (HTML content) from the source file:
   - For each piece, it extracts and structures the content.
   - The structured data is then appended to the CSV file.
6. The `ProcessHTML` class, in tandem with `RepetitiveElement` and `ElementContainer`, helps in identifying and organizing repetitive elements in the raw HTML data, which may be essential in pinpointing the key content areas in the web pages.
7. To derive structure from the extracted raw content, the project leverages the power of GPT-3. It sends a carefully crafted prompt to guide the model in organizing the content in a desired structured format (especially focusing on event-related data).
8. Once the data is structured, it's written to a CSV for easy access and further analysis.

---

## **Conclusion**:
The project is essentially a pipeline to transform raw web page content into a structured format, especially focusing on event-related information. It smartly combines traditional HTML parsing techniques with the advanced NLP capabilities of GPT-3 to derive meaningful and structured data from unstructured web content.