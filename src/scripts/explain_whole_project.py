
import json
import sys
from document_generator import DocumentGenerator
from relationship_finder import RelationShipFinder
from util import Util
from tree_structure import TreeStructure


file_path = (sys.argv[1])
auth_token = sys.args[2]
util = Util(file_path,auth_token)

util.make_directory_if_not_exists("documents")

document_generator = DocumentGenerator(util)
# generate document for all files using google palm api
document_generator.generate_document_for_all_files_as_json()
# from generated json files, link method calls to their respective files
RelationShipFinder(util).find_relationship_for_controller("",True)
tree_structure = TreeStructure()
try:
    with open(file_path+'\documents\code_explanation.txt') as json_file:
        data = json.load(json_file)
        util.write_to_file("code_structure.txt",tree_structure.create_tree_structure(data))
        print(util.read_file_as_text(file_path+"\documents\code_structure.txt"))
except Exception as e:
    #print("Please run the script with the following command: python main.py <path_to_project_folder>")
    #print(str(e))
    pass