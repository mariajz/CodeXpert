import json
import anytree
from anytree import Node, RenderTree
from util import Util

class TreeStructure:
    def __init__(self, util:Util):
        self.util = util
        self.root = Node("Root")

    def create_tree(self,data, parent=None):
        for key, value in data.items():
            key_label = value if key=="description" else key
            node = Node(key_label, parent=parent)
            if isinstance(value, dict):
                self.create_tree(value, parent=node)

    def create_tree_structure(self,json_data):
        for data in json_data:
            self.create_tree(data, parent=self.root)
        tree_structure = ""
        for pre, fill, node in RenderTree(self.root):
            node_name = node.name.encode('utf-8', errors='ignore').decode('utf-8', errors='ignore')
            tree_structure = tree_structure+(f"{pre}{node_name}")+"\n"
            self.util.write_logs(f"{pre}{node_name}"+"\n")
        return tree_structure
    
    def html_tree(self,data):
        html = ''
        for key, value in data.items():
            
            html = html + '<li class="folder folder-open">' + key 

            if isinstance(value, dict):
                html = html + '<ul>'
                html = html + self.html_tree(value)
                html = html + '</ul>'
            else:
                html = html + '<ul>'
                html = html + '<li class="file">' + value + '</li>'
                html = html + '</ul>'

            html = html + '</li>'
        
        return html
    
    def construct_html_tree_structure(self,json_data):
        html = ""
        for single_node in json_data:
            html = html + self.html_tree(single_node)
        return html

    




