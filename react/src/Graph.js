import React, { useState, useEffect, useMemo } from 'react';
import Graph from "react-graph-vis";
import ErrorBoundary from './ErrorBoundary';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useWindowWidth } from "@react-hook/window-size";
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme) => ({
  cardContent: {
    flexGrow: 1,
  }
}));

function NetworkGraph(props) {
  const classes = useStyles();
  const windowWidth = useWindowWidth();
  const [currentEdge, setCurrentEdge] = useState('Select an edge');
  var ip = window.location.host;

  const [graph, setGraph] = useState({
    nodes: [
    ],
    edges: [
    ]
  });

  // console.log(dimensions);

  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(true);
  const version = useMemo(uuidv4, [graph, update, windowWidth]);

  useEffect(() => {
    // if (!props.sentence) {
    //   props.sentence = "Johnson";
    // }
    setLoading(true);
    axios.get('http://' + ip + '/api/graph', { params: { name: props.sentence } }).then(response => {
      setGraph(response.data.value);
      setLoading(false);
      console.log(response);
      // console.log(graph)
    });
  }, [props.sentence]);

  // const events = {
  //   select: function (event) {
  //     var { edges } = event;
  //     console.log("Selected edges:");
  //     console.log(edges);
  //     setCurrentEdge("You selected: " + edges[0]);
  //   }
  // };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
      console.log("Selected nodes:");
      console.log(nodes);
      console.log("Selected edges:");
      var selected_edges_labels = graph.edges.filter(function (item) {
        return edges.indexOf(item.id) > -1;
      })
      console.log(selected_edges_labels)
      setCurrentEdge(selected_edges_labels.map(edge => [edge.title]));
    }
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Card>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                Nodes
            </Typography>
            <Typography>
                You have entered: {props.sentence}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                Edges
            </Typography>
              <Typography>
                {currentEdge}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
        {loading ? <CircularProgress /> :  
          <Card>
            <Button onClick={() => setUpdate(update + 1)} size="small" color="primary">recenter</Button>
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
          </Card>
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default NetworkGraph;