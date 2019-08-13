import React, { Component } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TableFooter,
  TablePagination,
  withStyles,
  Button
} from "@material-ui/core";
import Carousel from "nuka-carousel";
import PropTypes from "prop-types";
import TablePaginationActionsComponent from "../common/TablePaginationActionsComponent";
import ScrollUpButton from "react-scroll-up-button";
import Spinner from "../common/Spinner";

const styles = theme => ({
  root: {
    width: "70%",
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 30,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  table: {
    [theme.breakpoints.up("lg")]: {
      minWidth: 500
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: 200
    }
  },
  tableWrapper: {
    overflowX: "auto"
  },
  avatar: {
    margin: 10,
    width: 130,
    height: 130
  },
  rootresponsive: {
    [theme.breakpoints.up("lg")]: {
      display: "none"
    }
  }
});

class TourPackages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      page: 0,
      rowsPerPage: 4
    };
  }
  componentDidMount() {
    axios
      .get("/api/package")
      .then(res => {
        this.setState({
          rows: res.data
        });
      })
      .catch(err => console.log(err.response.data));
  }
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handChangePage = (event, page) => {
    this.setState({ page: page });
  };

  onDeleteClick(value) {
    axios
      .delete(`/api/package/${value}`)
      .then(res => {
        window.alert(res.data.message);
        window.location.reload();
      })
      .catch(err => console.log(err.data));
  }

  render() {
    const { rows, page, rowsPerPage } = this.state;
    const { classes } = this.props;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    let content;
    if (rows.length > 0) {
      content = (
        <Grid container xs={12}>
          <Paper className={classes.root}>
            <Typography variant="h4" align="center">
              SEE THE LIST OF PACKAGES
            </Typography>
            <br />
            <br />
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      let imagesContent = [];
                      for (let i = 0; i < row.imagesUrl.length; i++) {
                        imagesContent[i] = (
                          <img
                            src={row.imagesUrl[i]}
                            width={200}
                            height={150}
                            alt={row.packageName}
                          />
                        );
                      }
                      return (
                        <TableRow key={row._id}>
                          <TableCell component="th" scope="row">
                            <Carousel
                              cellAlign="center"
                              style={{ width: 200, height: 150 }}
                              autoplay={200}
                              speed={200}
                            >
                              {imagesContent}
                            </Carousel>
                          </TableCell>
                          <TableCell style={{ width: 500 }}>
                            <TableRow>
                              <TableCell colSpan={2} align="center">
                                <Typography variant="h6">
                                  {row.packageName}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={{ width: 250 }}>
                                <Typography variant="subtitle1">
                                  {`Start Date: ${row.startDate}`}
                                </Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Typography variant="subtitle2">
                                  {`Cost: ₹${row.tourCost}/_`}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Typography variant="subtitle1">
                                  {`End Date: ${row.endDate}`}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle1">
                                  {`Capacity: ${row.capacity}`}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableCell>
                          <TableCell align="right">
                            <TableRow>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={this.onDeleteClick.bind(
                                    this,
                                    row._id
                                  )}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Button
                                  color="primary"
                                  href={`/editpackage/${row._id}`}
                                >
                                  Edit
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      colSpan={3}
                      rowsPerPageOptions={[6, 10, 25]}
                      page={page}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      onChangePage={this.handChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActionsComponent}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </Paper>
          <Paper className={classes.rootresponsive}>
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      let imagesContent = [];
                      for (let i = 0; i < row.imagesUrl.length; i++) {
                        imagesContent[i] = (
                          <img
                            src={row.imagesUrl[i]}
                            width={200}
                            height={150}
                            alt={row.packageName}
                          />
                        );
                      }
                      return (
                        <TableRow key={row._id}>
                          <TableCell component="th" scope="row">
                            <TableRow>
                              <TableCell>
                                <TableCell align="center">
                                  <Typography variant="h6">
                                    {row.packageName}
                                  </Typography>
                                </TableCell>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Carousel
                                  cellAlign="center"
                                  style={{ width: 200, height: 150 }}
                                  autoplay={200}
                                  speed={200}
                                >
                                  {imagesContent}
                                </Carousel>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Typography variant="subtitle1">
                                  {`Start Date: ${row.startDate}`}
                                </Typography>
                                <Typography variant="subtitle2">
                                  {`Cost: ₹${row.tourCost}/_`}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Typography variant="subtitle1">
                                  {`End Date: ${row.endDate}`}
                                </Typography>
                                <Typography variant="subtitle1">
                                  {`Capacity: ${row.capacity}`}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="center">
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  href={`/BookPackageForm/${row._id}`}
                                >
                                  Book Now
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="center">
                                <Button
                                  color="primary"
                                  href={`/PackageDetails/${row._id}`}
                                >
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>
                      <TablePagination
                        rowsPerPageOptions={[6, 10, 25]}
                        page={page}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        onChangePage={this.handChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActionsComponent}
                      />
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </Paper>
          <ScrollUpButton EasingType="easeInOutCubic" />
        </Grid>
      );
    }
    return <div>{rows.length > 0 ? content : <Spinner />}</div>;
  }
}

TourPackages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TourPackages);
