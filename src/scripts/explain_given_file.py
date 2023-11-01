
import json
import sys
from document_generator import DocumentGenerator
from relationship_finder import RelationShipFinder
from util import Util
from tree_structure import TreeStructure
import os


file_path = (sys.argv[1])
auth_token = sys.argv[2]


util = Util(file_path,auth_token)

util.make_directory_if_not_exists("documents")

document_generator = DocumentGenerator(util)
# generate document for all files using google palm api
document_generator.generate_document_for_all_files_as_json()
# from generated json files, link method calls to their respective files
file_to_explain = sys.argv[3]
file_to_explain = util.get_file_name_from_path(file_to_explain)
file_to_explain = file_to_explain.split('.')[0]

util.write_logs("Explaining file: "+file_to_explain)

RelationShipFinder(util).find_relationship_for_controller(file_to_explain,False)
tree_structure = TreeStructure(util)

try:
    file_path_for_code_explantion = os.path.normpath(file_path+'/documents/code_explanation.txt')
    with open(file_path_for_code_explantion) as json_file:
        util.write_logs("Code structure generated")
        data = json.load(json_file) 
        util.write_logs("Code structure written to file")
        util.write_to_file("code_structure.txt",tree_structure.create_tree_structure(data))
        util.write_logs("Code tree structure written to file")
        print(util.read_file_as_text(file_path+"/documents/code_structure.txt"))
except Exception as e:
    util.write_logs("Error generating code structure "+ str(e))