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
      marginLeft: 50,
      width: 300
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 50,
      width: 450
    }
  },
  typography2: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 110
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 180
    }
  }
});

class ResetPass extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      password2: "",
      errors: {},
      flag: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem("verificationToken")) {
      this.props.history.push("/");
    }
    if (
      this.props.match.params.token ===
      localStorage.getItem("verificationToken")
    ) {
      this.setState({
        flag: true
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const resetData = {
      email: localStorage.getItem("email"),
      password: this.state.password
    };
    axios
      .post("/api/resetPassword/editpassword", resetData)
      .then(res => {
        localStorage.removeItem("email");
        localStorage.removeItem("verificationToken");
        this.props.history.push("/login");
      })
      .catch(err => console.log(err));
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { classes, errors } = this.props;
    const { flag } = this.state;
    const resetPassContent = (
      <div style={{ overflowX: "hidden" }}>
        <Grid container direction="vertical" style={{ marginBottom: 40 }}>
          <Grid item container lg={12} style={{ marginTop: 40 }}>
            <Grid item lg={4} />
            <Grid item lg={4}>
              <Typography
                variant="h2"
                className={classes.typography1}
                align="center"
              >
                Reset Password
              </Typography>
              <br />
              <Typography
                variant="subtitle1"
                style={{ width: 300 }}
                className={classes.typography2}
              >
                Reset Your Password
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
                      id="outlined-password-input"
                      label="New Password"
                      className={classes.textField}
                      type="password"
                      name="password"
                      value={this.state.password}
                      autoComplete="current-password"
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
                    <TextField
                      id="outlined-password-input"
                      label="Confirm New Password"
                      className={classes.textField}
                      type="password"
                      name="password2"
                      value={this.state.password2}
                      autoComplete="current-password"
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
                        Reset Password
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
    const errorContent = (
      <div style={{ overflowX: "hidden" }}>
        <Typography variant="h6">Verify Again</Typography>
        <br />
        <a href={"/ForgotPassword"}>Go Back To The Verification Page</a>
      </div>
    );
    return flag ? resetPassContent : errorContent;
  }
}

ResetPass.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default withStyles(styles)(ResetPass);
