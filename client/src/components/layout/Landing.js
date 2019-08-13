import React, { Component } from "react";
import PropTypes from "prop-types";

import { Grid, withStyles, Typography } from "@material-ui/core";
import SliderDemo from "../slider/SliderDemo";
import VisitedPlace from "../places/VisitedPlace";
import TripDetails from "../places/TripDetails";
import SelectDemo from "../common/SelectDemo";
import ScrollUpButton from "react-scroll-up-button";
import { getCurrentProfile } from "../../actions/profileActions";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    overflow: "hidden"
  },
  about: {
    fontFamily: "modern",

    [theme.breakpoints.up("lg")]: {
      fontSize: 30,
      paddingTop: "50px"
    },
    [theme.breakpoints.down("sm")]: {
      align: "justify",
      fontSize: 20,
      paddingTop: "30px"
    }
  },
  responsiveAbout: {
    [theme.breakpoints.down("sm")]: {
      width: 300,
      marginLeft: 40,
      paddingBottom: "30px"
    },
    [theme.breakpoints.up("lg")]: {
      width: "100%",
      marginLeft: "auto",
      paddingBottom: "50px"
    }
  },
  selectdemo: {
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  }
});

class Landing extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile !== null || !nextProps.profile.loading) {
      if (nextProps.profile.profile.admin === "true") {
        this.props.history.push("/admin");
      }
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        direction="vertical"
        style={{ marginBottom: 40 }}
        className={classes.root}
      >
        <Grid item xs={12}>
          <SliderDemo />
        </Grid>
        <div className={classes.selectdemo}>
          <SelectDemo />
        </div>
        <Grid item container xs={12} className={classes.responsiveAbout}>
          <Grid item xs={1} />
          <Grid item xs>
            <Typography className={classes.about}>
              We provide best Package Price for tour in different places with
              best facilities. Millions of Users use our website. Visit Through
              our Website. We provide best Package Price for tour in different
              places with best facilities. Millions of Users use our website.
              Visit Through our Website.
            </Typography>
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <VisitedPlace />
        <TripDetails />
        <ScrollUpButton EasingType="easeInOutCubic" />
      </Grid>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(withStyles(styles)(Landing));
