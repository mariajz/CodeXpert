
import requests

class PalmAPIRequester:
    def __init__(self, auth_token):
        self.auth_token = auth_token
        self.palm_api_url = "https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText"


    def api_url(self):
        return self.palm_api_url + "?key=" + self.auth_token

    def make_api_request(self,payload):
        headers = {
            "Content-Type": "application/json",
        }

        response = requests.post(self.api_url(), json=payload, headers=headers)

        if response.status_code == 200:
            response_json = response.json()
            generated_text = response_json["candidates"][0]["output"]
            return generated_text
        else:
            #self.logging.info(f"Request failed with status code {response.status_code}:\n{response.text}")
            return None