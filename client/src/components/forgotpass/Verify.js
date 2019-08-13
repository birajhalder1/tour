import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Grid,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import axios from "axios";

const styles = theme => ({
  navbar: {
    background: "transparent",
    color: "black",
    boxShadow: "none"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    [theme.breakpoints.up("lg")]: {
      width: 540
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10,
      width: 350
    }
  },
  button: {
    [theme.breakpoints.up("lg")]: {
      width: 540
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10,
      width: 350
    },
    marginTop: 15,
    height: 50
  },
  input: {
    display: "none"
  },
  typography1: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 50
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 130
    }
  },
  typography2: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10,
      width: 340
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 90,
      width: 370
    }
  }
});

class Verify extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const verficationData = {
      email: this.state.email
    };
    axios.post("/api/resetPassword", verficationData).then(res => {
      // Save to localStorage
      // Set token to ls
      localStorage.setItem("verificationToken", res.data.token);
      localStorage.setItem("email", res.data.email);
      if (window.confirm(res.data.message)) {
        if (verficationData.email !== "") {
          window.open(
            "https://www.google.com/gmail",
            "_blank",
            "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=1000,height=600"
          );
        }
      }
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { classes, errors } = this.props;
    return (
      <div>
        <Grid container direction="vertical" style={{ marginBottom: 40 }}>
          <Grid item container lg={12} style={{ marginTop: 40 }}>
            <Grid item lg={4} />
            <Grid item lg={4}>
              <Typography
                variant="h2"
                style={{ width: 160 }}
                className={classes.typography1}
              >
                Verification
              </Typography>
              <br />
              <Typography
                variant="subtitle1"
                className={classes.typography2}
                align="center"
              >
                Verify Your Profile Using Your Email Registered Yet
              </Typography>
            </Grid>
            <Grid item lg={4} />
          </Grid>
          <Grid item xs={12}>
            <form className={classes.container} onSubmit={this.onSubmit}>
              <Grid container item lg={12} direction="vertical">
                <Grid container item lg={12}>
                  <Grid item lg={4} />
                  <Grid item lg={4}>
                    <TextField
                      id="outlined-email-input"
                      label="Email Address"
                      className={classes.textField}
                      type="email"
                      name="email"
                      value={this.state.email}
                      autoComplete="email"
                      margin="normal"
                      variant="outlined"
                      onChange={this.onChange}
                    />
                  </Grid>
                  <Grid item lg={4} />
                </Grid>
                <Grid container item lg={12}>
                  <Grid item lg={4} />
                  <Grid item lg={4}>
                    <input
                      className={classes.input}
                      id="contained-button-submit"
                      type="submit"
                    />
                    <label htmlFor="contained-button-submit">
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.onSubmit}
                      >
                        Send Verfication Email
                      </Button>
                    </label>
                  </Grid>
                  <Grid item lg={4} />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Verify.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default withStyles(styles)(Verify);
