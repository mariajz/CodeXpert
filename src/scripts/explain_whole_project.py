
import json
import sys
from document_generator import DocumentGenerator
from relationship_finder import RelationShipFinder
from util import Util
from tree_structure import TreeStructure
import os


file_path = sys.argv[1]
auth_token = sys.argv[2]

util = Util(file_path,auth_token)

util.write_logs("Starting to explain the project")
util.make_directory_if_not_exists("documents")
util.write_logs("documents folder created")   

document_generator = DocumentGenerator(util)
util.write_logs("document generator created")

# generate document for all files using google palm api
document_generator.generate_document_for_all_files_as_json()
util.write_logs("document generated for all files")
# from generated json files, link method calls to their respective files

RelationShipFinder(util).find_relationship_for_controller("",True)
util.write_logs("relationship found for all files")
tree_structure = TreeStructure(util)

try:
    file_path_for_code_explantion = os.path.normpath(file_path+'/documents/code_explanation.txt')
    with open(file_path_for_code_explantion) as json_file:
        util.write_logs("Code structure generated")
        data = json.load(json_file) 
        util.write_logs("Code structure written to file")
        util.write_to_file("code_structure.txt",tree_structure.construct_html_tree_structure(data))
        util.write_logs("Code tree structure written to file")
        print(util.read_file_as_text(file_path+"/documents/code_structure.txt"))
except Exception as e:
    util.write_logs("Error generating code structure "+ str(e))
