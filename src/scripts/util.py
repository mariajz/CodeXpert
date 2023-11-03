import json
import os
import re
import logging

from api_requester import APIRequester

class Util:

    def __init__(self, root_path):
        self.root_path = root_path
        logging.basicConfig(filename=root_path+'/log.log', filemode='w', format='%(name)s - %(levelname)s - %(message)s', level=logging.INFO)

    def parse_config_file(self):
        config = {}
        try:
            #logging.info(self.root_path+"/.env")
            with open(self.root_path+"/.env", 'r') as file:
                for line in file:
                    line = line.strip()
                    if line and not line.startswith("#"):
                        key, value = line.split("=", 1)
                        value = value.replace('"', '')
                        config[key.strip()] = value.strip()
        except Exception as e:
            logging.error("Error parsing config file: "+str(e))
        return config

    def get_model_type_and_token(self):
        model_type, auth_token ='',''
        with open(self.root_path+"/.env", 'r') as f:
            config_file = self.parse_config_file()
            model_type = config_file["API_TYPE"]
            auth_token = config_file["PALM_API_KEY"] if model_type == "PALM" else config_file["GPT_API_KEY"]
            
        return  [auth_token, model_type]
    
    
    def write_logs(self,log):
        logging.info(log)
        
    def find_file_by_name(self,file_name, search_path):
        for root, dir, files in os.walk(search_path):
            if file_name in files:
                return os.path.join(root, file_name)

    def file_name_like(self,json_files,name_to_search):
        file_names = []
        for file_name in json_files:
            if name_to_search.upper() in file_name.upper():
                file_names.append(file_name)
        return file_names

    def write_to_file(self,file_name, text):
        try:
            with open(self.root_path+"/documents/"+file_name, 'w',encoding='utf-8') as f:
                f.write(text)
        except Exception as e:
            logging.error("Error writing to file: "+file_name+ " "+str(e))

    def make_directory_if_not_exists(self,directory_name):
        if not os.path.exists(self.root_path+"/"+directory_name):
            os.makedirs(self.root_path+"/"+directory_name)

    def read_file_names_by_extension(self,extension):
        file_names = []
        for root, dir, files in os.walk(self.root_path):
            for file in files:
                if file.endswith(extension):
                    file_names.append(os.path.join(root, file))
        return file_names
    
    def identify_project_type_based_on_extension(self):
        for root, dir, files in os.walk(self.root_path):
            for file in files:
                if file.endswith('.java'):
                    return ".java"
                if file.endswith('.py'):
                    return ".py"
                if file.endswith('.go'):
                    return ".go"
                
        return None

    def read_file_as_text(self,file_name):
        with open(file_name, 'r') as f:
            return f.read()
        
    def get_file_name_from_path(self,file_path):
        file_name = os.path.basename(file_path)
        return file_name
        
    def extract_json(self,text):
        pattern = r'\[.*\]' 
        json_matches = re.findall(pattern, text, re.DOTALL)
        if json_matches:
            try:
                extracted_json = json_matches[0]
                extracted_json = extracted_json.replace("\n","")
                extracted_json = extracted_json.replace("\\","")
                extracted_json = json.loads(extracted_json)
            except:
                logging.error("Error loading json" +extracted_json)
                pass
            return extracted_json
        else:
            logging.info("No JSON content found in the text.")
            return None

    def create_prompt_payload(self,file_name, content):
        prompt = ""
        with open(self.root_path +"/"+ file_name, 'r') as f:
            prompt = f.read()
        prompt = prompt +"\n" + content
        payload = {
                "prompt": {"text": prompt}
        }
        return prompt
    
    def get_auth_token(self):
        return self.auth_token

    def string_to_json(self,text):
        try:
            json_data =  json.loads(text)
            if isinstance(json_data, str):
                auth_token,model_type = self.util.get_model_type_and_token()[0], self.util.get_model_type_and_token()[1]
                palm_api_requestor = APIRequester(auth_token,model_type)
                text = palm_api_requestor.make_api_request(self.create_prompt_payload("prompt_for_json_conversion.txt",text))
                json_data = self.extract_json(text)
                return json_data
            else:
                return json_data
        except:
            logging.error("Error loading json:"+text)
            pass
        return None

    def add_tab_spaces(self,num_tabs):
        tab_space = '\t' * num_tabs
        return tab_space
