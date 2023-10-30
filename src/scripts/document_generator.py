import json
from palm_api_requester import PalmAPIRequester
from util import Util

PROMPT_FOR_JSON = "prompt_for_json.txt"

class DocumentGenerator:
    def __init__(self, util:Util):
        self.util = util

    def generate_document_for_all_files_as_json(self):
        for java_file_path in self.util.read_file_names_by_extension('.java'):
            if java_file_path and 'test' not in java_file_path:
                java_code = self.util.read_file_as_text(java_file_path)
                file_name = self.util.get_file_name_from_path(java_file_path).split('.')[0]
                self.java_to_json_doc(file_name, java_code)

    def java_to_json_doc(self,file_name, java_code):
        payload = self.util.create_prompt_payload(PROMPT_FOR_JSON, java_code)

        palm_api_requester = PalmAPIRequester(self.util.get_auth_token())
       
        generated_text = palm_api_requester.make_api_request(payload)

        #print("Generated Text for :",file_name, generated_text)
        generated_json = self.util.extract_json(generated_text)
        generated_json = json.dumps(generated_json)
        self.util.write_to_file(file_name+".json", generated_json)

