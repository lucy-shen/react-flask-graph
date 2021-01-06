import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';

class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert(this.state.value + 'was searched');
      event.preventDefault();
    }
  
    render() {
      return (
            <form onSubmit={this.handleSubmit}>
            <TextField id="outlined-basic" label="Label" variant="outlined" margin="normal" fullWidth
            value={this.state.value} onChange={this.handleChange} 
            />


            <Grid container spacing={2} justify="center">
            <Grid item>
                <Button variant="contained" color="primary" type="submit">
                Search
            </Button>
            </Grid>
            <Grid item>
                <Button variant="outlined" color="primary">
                Examples
            </Button>
            </Grid>
            </Grid>
            </form>
      );
    }
  }

  export default Search;