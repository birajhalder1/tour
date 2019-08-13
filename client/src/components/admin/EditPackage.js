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

class EditPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packageName: "",
      overview: "",
      places: "",
      capacity: "",
      startDate: "",
      endDate: "",
      tourCost: "",
      state: "",
      city: "",
      country: "",
      files: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    axios
      .get(`/api/package/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          packageName: res.data.packageName,
          overview: res.data.overview,
          places: res.data.places,
          capacity: res.data.capacity,
          startDate: res.data.startDate,
          endDate: res.data.endDate,
          tourCost: res.data.tourCost,
          state: res.data.state,
          city: res.data.city,
          country: res.data.country
        });
      })
      .catch(err => console.log(err.response.data));
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();

    let selectedFiles = this.state.files;
    const fd = new FormData();
    // If file selected
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        fd.append("multipleImage", selectedFiles[i], selectedFiles[i].name);
      }
    } else {
      // if file not selected throw error
      //this.ocShowAlert("Please upload file", "red");
    }
    /*axios
      .post("/api/package", packageDet)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err.response.data));*/
    fd.append("packageName", this.state.packageName);
    fd.append("overview", this.state.overview);
    fd.append("places", this.state.places);
    fd.append("capacity", this.state.capacity);
    fd.append("startDate", this.state.startDate);
    fd.append("endDate", this.state.endDate);
    fd.append("tourCost", this.state.tourCost);
    fd.append("state", this.state.state);
    fd.append("city", this.state.city);
    fd.append("country", this.state.country);
    axios
      .post(`/api/package/${this.props.match.params.id}`, fd, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${fd._boundary}`
        }
      })
      .then(res => {
        if (200 === res.status) {
          // If file size is larger than expected.
          if (res.data.error) {
            if ("LIMIT_FILE_SIZE" === res.data.error.code) {
              //this.ocShowAlert("Max size: 2MB", "red");
            } else if ("LIMIT_UNEXPECTED_FILE" === res.data.error.code) {
              //this.ocShowAlert("Max 4 images allowed", "red");
            } else {
              // If not the given ile type
              //this.ocShowAlert(res.data.error, "red");
            }
          } else {
            // Success
            let fileName = res.data;
            console.log("fileName", fileName);
            //this.ocShowAlert("File Uploaded", "#3089cf");
          }
        }
        window.alert("Package Saved Successfully!");
        this.props.history.push("/packages");
      })
      .catch(err => console.log(err));
  }

  handleChangeFiles(files) {
    this.setState({
      files: files
    });
  }
  render() {
    const { classes } = this.props;
    const {
      packageName,
      overview,
      places,
      capacity,
      startDate,
      endDate,
      tourCost,
      state,
      city,
      country
    } = this.state;
    let dashboardContent;
    if (packageName === "") {
      dashboardContent = <Spinner />;
    } else {
      const startdate = new Date(startDate);
      let smonth;
      if (/^\d$/.test(startdate.getMonth() + 1)) {
        smonth = `0${startdate.getMonth() + 1}`;
      } else {
        smonth = startdate.getMonth() + 1;
      }
      let sdate;
      if (/^\d$/.test(startdate.getDate())) {
        sdate = `0${startdate.getDate()}`;
      } else {
        sdate = startdate.getDate() + 1;
      }
      const enddate = new Date(endDate);
      let emonth;
      if (/^\d$/.test(enddate.getMonth() + 1)) {
        emonth = `0${enddate.getMonth() + 1}`;
      } else {
        emonth = enddate.getMonth() + 1;
      }
      let edate;
      if (/^\d$/.test(enddate.getDate())) {
        edate = "0" + enddate.getDate();
      } else {
        edate = enddate.getDate() + 1;
      }
      dashboardContent = (
        <div style={{ overflowX: "hidden" }}>
          <Grid container>
            <Grid
              item
              container
              lg={12}
              direction="vertical"
              style={{ marginBottom: 40 }}
            >
              <Grid container item lg={12}>
                <Grid item lg={4} />
                <Grid item lg={4}>
                  <DropzoneArea onChange={this.handleChangeFiles.bind(this)} />
                </Grid>
                <Grid item lg={4} />
              </Grid>
            </Grid>

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
                        label="Package Name"
                        type="text"
                        className={classes.textField}
                        value={packageName}
                        name="packageName"
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
                      <span>Overview: </span>
                      <textarea
                        className={classes.textarea}
                        placeholder="Overview"
                        name="overview"
                        value={overview}
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
                        label="Places"
                        className={classes.textField}
                        type="text"
                        name="places"
                        value={places}
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
                        label="Capacity"
                        className={classes.textField}
                        type="number"
                        name="capacity"
                        value={capacity}
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
                        name="startDate"
                        type="date"
                        defaultValue={`${startdate.getFullYear()}-${smonth}-${sdate}`}
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
                        name="endDate"
                        type="date"
                        defaultValue={`${enddate.getFullYear()}-${emonth}-${edate}`}
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
                        label="Tour Cost"
                        type="text"
                        className={classes.textField}
                        name="tourCost"
                        value={tourCost}
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
                        label="State"
                        type="text"
                        className={classes.textField}
                        name="state"
                        value={state}
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
                        label="City"
                        type="text"
                        className={classes.textField}
                        name="city"
                        value={city}
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
                        label="Country"
                        type="text"
                        className={classes.textField}
                        name="country"
                        value={country}
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
                          Update Package
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
    return (
      <div>
        <Grid container direction="vertical" style={{ marginBottom: 40 }}>
          <Grid item xs={12} style={{ marginTop: 40 }}>
            <Typography variant="h2" align="center">
              Update Package
            </Typography>
            <br />
            <Typography variant="subtitle1" align="center">
              You can Update a Package
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

export default withStyles(styles)(EditPackage);
