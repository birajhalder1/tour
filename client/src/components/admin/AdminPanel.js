import React, { Component } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { getCurrentProfile } from "../../actions/profileActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";

class AdminPanel extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile !== null || !nextProps.profile.loading) {
      if (nextProps.profile.profile.admin === "false") {
        this.props.history.push("/");
      }
    }
  }
  render() {
    const { profile, loading } = this.props;
    let content;
    if (profile.profile === null || loading) {
      content = <Spinner />;
    } else {
      content = (
        <Grid container lg={12}>
          <Grid container lg={12}>
            <Grid item lg={1} />
            <Grid item lg={11}>
              <Typography style={{ fontSize: 50 }}>
                Administrator Panel
              </Typography>
              <Typography style={{ fontSize: 20 }}>
                Welcome Administrator {profile.profile.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid container lg={12} style={{ marginTop: 20 }}>
            <Grid item lg={1} />
            <Grid item lg={11}>
              <Typography style={{ fontSize: 30 }}>
                Tour Related Controls
              </Typography>
              <Typography style={{ fontSize: 20, marginLeft: 20 }}>
                Packages
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            lg={12}
            style={{ marginTop: 10, marginBottom: 10, marginLeft: 40 }}
          >
            <Grid item lg={1} />
            <Grid item lg={4}>
              <Button href="/packages">
                <Typography style={{ fontSize: 15, color: "blue" }}>
                  See All Packages List
                </Typography>
              </Button>
            </Grid>
            <Grid item lg={7}>
              <Button href="/createpackage" style={{ marginLeft: 20 }}>
                <Typography style={{ fontSize: 15, color: "blue" }}>
                  Create a Package Entry
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container lg={12} style={{ marginTop: 10 }}>
            <Grid item lg={1} />
            <Grid item lg={11}>
              <Typography style={{ fontSize: 20, marginLeft: 20 }}>
                Offers
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            lg={12}
            style={{ marginTop: 10, marginBottom: 10, marginLeft: 40 }}
          >
            <Grid item lg={1} />
            <Grid item lg={4}>
              <Button href={"/offers"}>
                <Typography style={{ fontSize: 15, color: "green" }}>
                  See Offers of All Packages
                </Typography>
              </Button>
            </Grid>
            <Grid item lg={7}>
              <Button href="/createoffer" style={{ marginLeft: 20 }}>
                <Typography style={{ fontSize: 15, color: "green" }}>
                  Create an Offer of a Package
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container lg={12} style={{ marginTop: 20 }}>
            <Grid item lg={1} />
            <Grid item lg={11}>
              <Typography style={{ fontSize: 30 }}>
                Passengers Related Status
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            lg={12}
            style={{ marginTop: 10, marginBottom: 10, marginLeft: 40 }}
          >
            <Grid item lg={1} />
            <Grid item lg={4}>
              <Button variant="contained" color="secondary">
                <Typography style={{ fontSize: 15, color: "white" }}>
                  Booking & Payment Status (Checking List)
                </Typography>
              </Button>
            </Grid>
            <Grid item lg={7}>
              <Button style={{ marginLeft: 20 }} href="/paymentstat">
                <Typography style={{ fontSize: 15, color: "orange" }}>
                  Payment Status
                </Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container lg={12} style={{ marginTop: 20 }}>
            <Grid item lg={1} />
            <Grid item lg={11}>
              <Typography style={{ fontSize: 30 }}>
                User Accounts Status
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            lg={12}
            style={{ marginTop: 10, marginBottom: 10, marginLeft: 40 }}
          >
            <Grid item lg={4} />
            <Grid item lg={8}>
              <Button href={"/userslist"}>
                <Typography
                  style={{ fontSize: 15, color: "blue" }}
                  align="center"
                >
                  See All User Accounts and their Profiles
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      );
    }
    return <div>{content}</div>;
  }
}

AdminPanel.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(AdminPanel);
