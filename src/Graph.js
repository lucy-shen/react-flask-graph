import React, { useState, useEffect } from 'react';
import Graph from "react-graph-vis";
import Button from '@material-ui/core/Button';
import ErrorBoundary from './ErrorBoundary';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'

// const graph = {
//   nodes: [
//     { id: 1, label: "Node 1", title: "node 1 tootip text" },
//     { id: 2, label: "Node 2", title: "node 2 tootip text" },
//     { id: 3, label: "Node 3", title: "node 3 tootip text" },
//     { id: 4, label: "Node 4", title: "node 4 tootip text" },
//     { id: 5, label: "Node 5", title: "node 5 tootip text" }
//   ],
//   edges: [
//     { id: '1to2', from: 1, to: 2 },
//     { from: 1, to: 3 },
//     { from: 2, to: 4 },
//     { from: 2, to: 5 }
//   ]
// };

const options = {
  layout: {
    hierarchical: true
  },
  edges: {
    color: "#000000"
  },
  height: "500px"
};

function NetworkGraph(props) {

  const [currentTime, setCurrentTime] = useState({
    nodes: [],
    edges: []
  });

  const [currentEdge, setCurrentEdge] = useState('select an edge');

  const [graph, setGraph] = useState({
    nodes: [
    ],
    edges: [
    ]
  });


  useEffect(() => {
    axios.get('/api/graph', { params: { value: props.sentence } }).then(response => {
      setGraph(response.data.value);
      console.log(response)
      console.log(currentTime)
      console.log(graph)
    });
  }, [props.sentence]);

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
      console.log("Selected nodes:");
      console.log(nodes);
      console.log("Selected edges:");
      console.log(edges);
      setCurrentEdge("You selected:" + edges);
    }
  };

  return (
    <div>
      <Button onClick={() => window.location.reload(false)} size="small" color="primary">reload</Button>
      <Typography>
        from props {props.sentence}
      </Typography>
      <Typography>
        {currentEdge}
      </Typography>
      <ErrorBoundary>
        <Graph
          key={uuidv4()}
          graph={graph}
          options={options}
          events={events}
          getNetwork={network => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
        />
      </ErrorBoundary>
    </div>
  );
}

export default NetworkGraph;