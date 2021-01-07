import React, { useState, useEffect } from 'react';
import Graph from "react-graph-vis";
import ErrorBoundary from './ErrorBoundary';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'

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
  const [currentEdge, setCurrentEdge] = useState('Select an edge');

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
      // setCurrentEdge("You selected:" + edges);
    }
  };

  return (
    <div>
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