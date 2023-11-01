import json
from util import Util
class RelationShipFinder():
    def __init__(self, util):
        self.util = util

    def find_relationships(self,class_document,document, current_file_name, file_list,depth ):
        method_to_match = current_file_name
        file_to_search = ""
        if "." in current_file_name:
            file_to_search = current_file_name.split('.')[0]
            method_to_match = current_file_name.split('.')[1]
            method_to_match = method_to_match.split('(')[0]
            similar_files = self.util.file_name_like(file_list,file_to_search)
            for file_name in similar_files:
                file_content = self.util.read_file_as_text(file_name)
                json_content = self.util.string_to_json(file_content)
                for key in json_content:
                    if key['method'] ==method_to_match:
                        depth = depth +1
                        class_document[key["class"] +"." +key['method']] = {'description':key['description'] }
                        document = document +self.util.add_tab_spaces(depth)+"-- "+key["class"] +"." +key["method"]+"() --"+ key['description'] + "\n"
                        for function_call in key['function_calls']:
                            document,child_node = self.find_relationships(class_document[key["class"] +"." +key['method']],document, function_call, file_list,depth)
                            class_document[key["class"] +"." +key['method']] = child_node
        return document,class_document

    def find_relationship_for_controller(self, explain_file, is_all_files):
        document = ''
        code_explanation_document = []
        all_files = self.util.read_file_names_by_extension('.json')  
        for file_name in all_files:
            if is_all_files or explain_file.upper() in file_name.upper():
                file_content = self.util.read_file_as_text(file_name)
                json_content = self.util.string_to_json(file_content)
                class_document ={}
                if isinstance(json_content, list) and 'class' in json_content[0]:
                    document = document + json_content[0]['class'] + "\n"
                    class_document[json_content[0]['class']] = {}
                else:
                    continue
                        
                for key in json_content:
                    try:
                        class_document[json_content[0]['class']] = {key['method'] : {'description':key['description'] } }

                        document = document +"  --"+key['method'] +" -- "+key['description'] + "\n"
                        depth=1
                        for function_call in key['function_calls']:
                            document,child_node = self.find_relationships(class_document[json_content[0]['class']][key['method']],document, function_call, all_files,depth)
                            class_document[json_content[0]['class']][key['method']] = child_node
                    except:
                        pass
                
                code_explanation_document.append(class_document)
        self.util.write_to_file("code_explanation.txt",json.dumps(code_explanation_document))
                        