import json
from api_requester import APIRequester
from util import Util

PROMPT_FOR_JSON = "prompt_for_json.txt"

class DocumentGenerator:
    def __init__(self, util:Util):
        self.util = util

    def generate_document_for_all_files_as_json(self, extension='.java'):
        for java_file_path in self.util.read_file_names_by_extension(extension):
            if java_file_path and 'test' not in java_file_path:
                java_code = self.util.read_file_as_text(java_file_path)
                file_name = self.util.get_file_name_from_path(java_file_path).split('.')[0]
                self.java_to_json_doc(file_name, java_code)

    def java_to_json_doc(self,file_name, java_code):
        payload = self.util.create_prompt_payload(PROMPT_FOR_JSON, java_code)
        auth_token,model_type = self.util.get_model_type_and_token()[0], self.util.get_model_type_and_token()[1]

        api_requester = APIRequester(auth_token,model_type)
       
        generated_text = api_requester.make_api_request(payload)

        generated_json = self.util.extract_json(generated_text)
        generated_json = json.dumps(generated_json)
        self.util.write_to_file(file_name+".json", generated_json)

