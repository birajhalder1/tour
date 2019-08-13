import React, { Component } from "react";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {}
});

class UsersList extends Component {
  render() {
    return <div>Hello Users</div>;
  }
}

export default withStyles(styles)(UsersList);
