from .lib.GPT_structuring import extract_contents
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading
import json
import csv
import os
# Identify all html files in raw_html folder
def ident_files():
    path = "raw_html/"
    files = os.listdir(path)
    output = []
    for file in files:
        # check if the file is html
        if "html" in file:
            # append to output with full file path
            output.append(path + file)
    return output

# read a file and convert to JSON
def read_file(path):
    with open(path, 'r') as f:
        data = json.load(f)
    return data

# Convert raw HTML file to structured data and output to CSV in the processed_events folder
def process_file(path, max_events=-1):
    # create name for new file from the name of the raw html file
    fname = path.split("/")[-1] 
    fname = fname.split(".")[0]
    output_path = f"processed_events/{fname}.csv"

    # check if the file has anything in it
    data = read_file(path)
    if not data:
        return  # Exit if there's no data

    # create the headers for the CSV
    f_names = extract_contents(data[0]).keys()
  
    # write headers to file
    if not os.path.exists(output_path):
        with open(output_path, 'w', newline='') as f:
            print(f_names)
            writer = csv.DictWriter(f, fieldnames=f_names)
            writer.writeheader()
    i = 0
    # append data as it is structured
    with open(output_path, 'a', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=f_names)
        for element in data:
            if i > max_events and max_events != -1:
                break
            event = extract_contents(element)
            i += 1
            # check if event isnt empty in the case that GPT failed or timed out
            if event:
                writer.writerow(event)
                f.flush() # this forces python to write to file in real time
    
    return output_path

# process all raw html files in the raw_html folder
def process_all_files():
    # get all file paths
    files = ident_files()
    cur_file = 1
    for file in files:
        print(f"Processing {file} ||| {cur_file} of {len(files)}")
        process_file(file)
        cur_file += 1

