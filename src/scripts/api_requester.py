
import requests

class APIRequester:
    def __init__(self, auth_token, model_type):
        self.auth_token = auth_token
        self.model_type = model_type
        self.palm_api_url = "https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText"
        self.gpt_url = "https://api.openai.com/v1/chat/completions"

    def api_url(self):
        if self.model_type== 'PALM':
            return self.palm_api_url + "?key=" + self.auth_token
        else:
            return self.gpt_url 
    
    def create_payload(self,prompt):
        
        if self.model_type== 'PALM':
             payload ={
                 "prompt": {"text": prompt},
             }
             return payload
            
        else:
            payload = {
                "model": "gpt-3.5-turbo",
                "messages": [
                    {"role": "user", "content": prompt}
                ]

            }
            
            return payload


    def make_api_request(self,prompt):
        headers = {
            "Content-Type": "application/json",
        }
        if self.model_type != 'PALM':
            headers['Authorization'] = "Bearer " + self.auth_token

        response = requests.post(self.api_url(), json=self.create_payload(prompt), headers=headers)

        if response.status_code == 200:
            response_json = response.json()
            if self.model_type == 'PALM':
                generated_text = response_json["candidates"][0]["output"]
                return generated_text
            else:
                generated_text = response_json["choices"][0]["message"]["content"]
                return generated_text
        else:
            #self.logging.info(f"Request failed with status code {response.status_code}:\n{response.text}")
            return None