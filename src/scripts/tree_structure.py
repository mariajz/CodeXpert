import json
import anytree
from anytree import Node, RenderTree

class TreeStructure:
    def __init__(self,):
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
            #print(f"{pre}{node_name}")
        return tree_structure
    




