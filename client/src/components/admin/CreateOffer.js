import React, { Component } from "react";
import {
  withStyles,
  Grid,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import Spinner from "../common/Spinner";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";

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
  textarea: {
    [theme.breakpoints.up("lg")]: {
      width: 540
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10,
      width: 350
    },
    marginTop: 20,
    height: 100
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
  formControl: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10
    },
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  bigAvatar: {
    [theme.breakpoints.up("lg")]: {
      marginLeft: 160
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 70
    },
    width: 200,
    height: 200
  },
  dropzonebutton: {
    position: "absolute",
    [theme.breakpoints.up("lg")]: {
      marginLeft: 150
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: 20,
      width: 360
    }
  }
});

class CreateOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packageName: "",
      offerTitle: "",
      originalCost: "",
      offerPercent: "",
      offerValidityStartOn: "",
      offerValidityEndOn: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const offer = {
      packageName: this.state.packageName,
      offerTitle: this.state.offerTitle,
      originalCost: this.state.originalCost,
      offerPercent: this.state.offerPercent,
      offerValidityStartOn: this.state.offerValidityStartOn,
      offerValidityEndOn: this.state.offerValidityEndOn
    };
    axios
      .post("/api/offer", offer)
      .then(res => {
        window.alert(res.data.message);
        window.location.reload();
      })
      .catch(err => console.log(err.response.data));
  }

  render() {
    const { classes } = this.props;
    const {
      packageName,
      offerTitle,
      originalCost,
      offerPercent,
      offerValidityStartOn,
      offerValidityEndOn
    } = this.state;
    let dashboardContent;
    dashboardContent = (
      <div style={{ overflowX: "hidden" }}>
        <Grid container>
          <Grid
            item
            container
            lg={12}
            direction="vertical"
            style={{ marginTop: 50 }}
          >
            <form
              className={classes.container}
              autoComplete="off"
              onSubmit={this.onSubmit}
            >
              <Grid container item lg={12} direction="vertical">
                <Grid container item lg={12}>
                  <Grid item lg={4} />
                  <Grid item lg={4}>
                    <TextField
                      id="outlined-email-input"
                      label="Offer Title"
                      type="text"
                      className={classes.textField}
                      name="offerTitle"
                      value={offerTitle}
                      autoComplete="name"
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
                      id="outlined-email-input"
                      label="Package Name"
                      type="text"
                      className={classes.textField}
                      name="packageName"
                      value={packageName}
                      autoComplete="name"
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
                      id="outlined-email-input"
                      label="Original Cost"
                      className={classes.textField}
                      type="number"
                      name="originalCost"
                      value={originalCost}
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
                    <TextField
                      id="outlined-email-input"
                      label="Discount Percentage"
                      className={classes.textField}
                      type="number"
                      name="offerPercent"
                      value={offerPercent}
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
                    <Typography>Starts On: </Typography>
                    <TextField
                      id="outlined-password-input"
                      className={classes.textField}
                      name="offerValidityStartOn"
                      value={offerValidityStartOn}
                      type="date"
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
                    <Typography>Ends On: </Typography>
                    <TextField
                      id="outlined-password-input"
                      className={classes.textField}
                      name="offerValidityEndOn"
                      value={offerValidityEndOn}
                      type="date"
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
                        Create Offer
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

    return (
      <div>
        <Grid container direction="vertical" style={{ marginBottom: 40 }}>
          <Grid item xs={12} style={{ marginTop: 40 }}>
            <Typography variant="h2" align="center">
              Create Offer
            </Typography>
            <br />
            <Typography variant="subtitle1" align="center">
              You can Create an Offer
            </Typography>
          </Grid>
          <Grid item xs={12} direction="vertical">
            {dashboardContent}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(CreateOffer);
