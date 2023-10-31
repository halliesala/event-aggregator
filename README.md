# event-aggregator
Get NYC events from public event calendars. 

# Overview
Event Aggregator revolutionizes how New Yorkers discover city events. Frustrated by the scattered nature of event information online, this project introduces a single, streamlined platform to easily find and track NYC happenings. At its core is a specially developed web scraper that intelligently identifies and extracts event details from various websites. This scraper, utilizing a unique algorithm alongside the GPT API, processes raw, unordered data into a structured format efficiently through multithreading.

The data, consistently updated and accurately organized, is stored in a SQL database via SQLAlchemy. Our React frontend isn't just about displaying information; it offers a personalized experience with user authentication, enabling visitors to save their favorite events. Event Aggregator is more than a tool; it's an innovation enhancing the cultural engagement of New Yorkers, ensuring they're always just a click away from finding their next memorable event.

#Features
Event Aggregator is enriched with a variety of features, enhancing both user experience and technical robustness:

##Event Discovery and Display
Aggregated Event Information: Compiles a comprehensive list of NYC events from various sources into a single, user-friendly platform.
###Dynamic Event Details: Utilizes the Google Maps API to show event locations, making it easier for users to find nearby activities.
###Visual Engagement: Displays relevant event images from the DuckDuckGo API, adding a visual dimension to event listings.
###Event Sorting Options: Offers the ability to sort events by tags, distance, or date on the events display page, providing users with personalized browsing.

##User Experience

###Interactive Frontend: Built with React and styled using Semantic UI, ensuring an attractive, responsive, and user-friendly interface.
###Customized User Accounts: Secure signup and login, with personalization features letting users save and manage their favorite events.
##Advanced Data Handling
###Cutting-Edge Web Scraping: Selenium is employed for comprehensive data extraction, even from JavaScript-heavy sites.
###Data Structuring with AI: The GPT API aids in transforming raw data into organized, accessible formats.
###Efficient Updates: Multithreading techniques keep the platform updated with the latest events swiftly and reliably.

##Secure and Scalable Backend

###Flask-based Architecture: Delivers a strong, scalable server-side solution with RESTful API support for smooth frontend-backend integration.
###Reliable SQL Database: Managed with SQLAlchemy for secure, robust data handling and storage.

##Security and Authentication

###bcrypt for Password Hashing: Ensures high-level security for user passwords, protecting accounts from unauthorized access.
###Secure User Authentication: Implements robust mechanisms to safeguard user data and preferences, enhancing overall platform security.





Drivers:
https://drive.google.com/file/d/169P3YocT5IbMNuP1eMVf-kCDX6LHvA8G/view?usp=drive_link
