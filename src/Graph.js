import React, { useState, useEffect, useMemo } from 'react';
import Graph from "react-graph-vis";
import ErrorBoundary from './ErrorBoundary';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { useWindowWidth } from "@react-hook/window-size";

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
  const windowWidth = useWindowWidth();
  const [currentEdge, setCurrentEdge] = useState('Select an edge');

  const [graph, setGraph] = useState({
    nodes: [
    ],
    edges: [
    ]
  });

  // console.log(dimensions);

  const [update, setUpdate] = useState(0);
  const version = useMemo(uuidv4, [graph, update, windowWidth]);

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
      setCurrentEdge("You selected:" + edges);
    }
  };

  return (
    <div>
      <Typography>
        {currentEdge}
      </Typography>
      <Button onClick={()=>setUpdate(update+1)} size="small" color="primary">recenter</Button>
      <ErrorBoundary>
        <Graph
          key={version}
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