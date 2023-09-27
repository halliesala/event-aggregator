from bs4 import BeautifulSoup, Tag
from collections import defaultdict
from .RepetitiveElement import ElementContainer

# Class to process and analyze HTML content
class ProcessHTML:

    # Default minimum number of similar values for consideration
    min_like_values = 5

    # Constructor initializes the ElementContainer with a given URL
    def __init__(self, url):
        self.rep_elems = ElementContainer(url)
        self.orphanElems = []
        self.currentLevel = 0

    # Reset the content of the ElementContainer
    def are_elements_similar(elem1, elem2):
        common_keys = set(elem1.keys()).intersection(set(elem2.keys()))
        for key in common_keys:
            if elem1[key] != elem2[key]:
                return False
        return True


    def checkOrphans(self):
        trueOrphans = []
        for orphan in self.orphanElems:
            orphan = str(orphan[0])
            if len(orphan) > 100:
                mini_soup = BeautifulSoup(orphan, 'lxml')
                tag = mini_soup.find('div')
                if tag:
                    trueOrphans.append(tag.attrs)
                    
                    
        for val in trueOrphans:
            print("================================================")
            print(val)

    # Parse the HTML, traverse its tree structure, and retrieve items
    def get_items(self, html, checkOrphans=False):
        # Create a BeautifulSoup object from the HTML
        soup = BeautifulSoup(html, 'lxml')
        # Traverse the tree structure starting from the body
        self.traverse_tree(soup.body, soup)
        if checkOrphans:
            self.checkOrphans()
        return self.rep_elems

    # Find common/shared values at the same hierarchy level within the HTML
    def get_shared_values_at_same_level(self, element, soup):
        self.currentLevel += 1
        # Dictionary to count occurrences of each value
        value_counts = defaultdict(int)
        
        # Iterate over each child of the current element
        children_list = list(element.children)
        for i in range(len(children_list)):
        #for child in element.children:
            child = children_list[i]
            hasAttribute = False
            # If the child is an HTML tag (and not just text or a comment)
            if isinstance(child, Tag):
                # Get the classes of the child, if any
                classes = child.get('class', [])
                # Increment the count for each class
                for c in classes:
                    value_counts[c] += 1
                    hasAttribute = True

                # Check for 'itemtype' attribute and count its occurrences
                itemType = child.get('itemtype')
                if itemType:
                    value_counts[itemType] += 1
                    hasAttribute = True
                
                if (not hasAttribute) and (i+1 < len(children_list)):
                    grandChildren = list(child.children)
                    if (len(grandChildren) == 1 and (self.currentLevel > 5)):
                        self.orphanElems.append(grandChildren)
                                            

        # List to store shared values that meet our criteria
        output = []
        for value, count in value_counts.items():
            # If the count exceeds our threshold
            if count > self.min_like_values:
                # Find all elements with the class matching the value
                items = soup.find_all(class_=value)
                # If not found as a class, try finding by 'itemtype' attribute
                if len(items) == 0:
                    items = soup.find_all(attrs={"itemtype": value})
                # Add the discovered items to our ElementContainer
                self.rep_elems.add(value, count, items)

        return output

    # Recursive function to traverse the HTML tree and find shared values
    def traverse_tree(self, element, soup):
        # Find shared values at the current hierarchy level
        shared_values = self.get_shared_values_at_same_level(element, soup)

        # If there are any shared values, add them to the ElementContainer
        if shared_values:
            for value in shared_values:
                self.rep_elems.append(value)
                
        # Recursively traverse children of the current element
        for child in element.children:
            # If the child is an HTML tag (and not just text or a comment)
            if isinstance(child, Tag):
                self.traverse_tree(child, soup)
