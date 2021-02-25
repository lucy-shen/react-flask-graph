import time
from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/api/graph', methods=['GET'])
def get_graph():
    value = request.args.get('name')
    g = {"nodes": [
      { "id": "1", "label": value, "title": "node 1 tootip text" },
      { "id": "2", "label": "Node 2", "title": "node 2 tootip text" },
      { "id": "3", "label": "Node 3", "title": "node 3 tootip text" }
    ],
    "edges": [
      { "id": "1to2", "from": "1", "to": "2" },
      { "from": "1", "to": "3" },
    ]}
    time.sleep(3)
    return {'value': g}