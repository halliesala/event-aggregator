from .lib.GPT_structuring import prep_contents, get_completion, parse_json
from concurrent.futures import ThreadPoolExecutor, as_completed, TimeoutError
from functools import partial
import threading
import json
import csv
import os
# Identify all html files in raw_html folder
processed_count = 0
lock = threading.Lock()

def timeout_wrapper(prompt, timeout_duration):
    """
    Wrapper function to execute get_completion with a timeout.
    """
    with ThreadPoolExecutor(max_workers=1) as inner_executor:
        future = inner_executor.submit(get_completion, prompt)
        try:
            return future.result(timeout=timeout_duration)
        except TimeoutError:
            print("GPT Timout error")
            return None  # or any appropriate default value

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

def progress_callback(future, prompts):
    global processed_count
    with lock:
        print(future.result())
        processed_count += 1
    print(f"Processed {processed_count}/{len(prompts)}")


# Convert raw HTML file to structured data and output to CSV in the processed_events folder
def process_file(path):
    global processed_count
    # create name for new file from the name of the raw html file
    processed_count = 0
    fname = path.split("/")[-1] 
    fname = fname.split(".")[0]
    output_path = f"processed_events/{fname}.csv"

    # check if the file has anything in it
    data = read_file(path)
    if not data:
        return  # Exit if there's no data

    prompts = []
    for element in data:
        prompt = prep_contents(element)
        if prompt:
            prompts.append(prompt)

    structured_data = []
    with ThreadPoolExecutor(max_workers=10) as executor:
        timout_duration = 30
        futures = [executor.submit(timeout_wrapper, prompt, timout_duration) for prompt in prompts]
        for future in futures:
            future.add_done_callback(partial(progress_callback, prompts=prompts))
            
        for future in as_completed(futures):
            structured_data.append(future.result())
    
    if os.path.exists(output_path):
        print("Output CSV exits: deleting")
        os.remove(output_path)

    # # append data as it is structured
    headers = ["title","description","start_date","end_date","location","price", "sold_out","link","img_link","tags"]
    with open(output_path, 'w', newline='') as f:
         #f_names = parse_json(structured_data[0]).keys()
         writer = csv.DictWriter(f, fieldnames=headers)
         writer.writeheader()

         for event in structured_data:
            if event:
                e = parse_json(event)
                if e['is_event'] == True:
                    e_filtered = {k: e[k] for k in headers}
                    writer.writerow(e_filtered)
                    print("This is an event")
                else:
                    print("GPT determined that this is not an event.")

    
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

