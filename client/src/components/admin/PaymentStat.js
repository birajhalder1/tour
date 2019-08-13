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
  Button,
  TableHead
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

class PaymentStat extends Component {
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
      .get("/api/payment")
      .then(res => {
        this.setState({
          rows: res.data
        });
      })
      .catch(err => console.log(err.data));
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
              SEE THE LIST OF PAYMENTS
            </Typography>
            <br />
            <br />
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography>Payment Id</Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography>Package Name</Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography>User Email</Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography>Payment Date</Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography>Payment Ammount (Rs.)</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      return (
                        <TableRow key={row._id}>
                          <TableCell component="th" scope="row">
                            <Typography>{row.paymentId}</Typography>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Typography>{row.packageName}</Typography>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Typography>{row.userEmail}</Typography>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Typography>{row.paymentDate}</Typography>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Typography>{row.paymentAmount}</Typography>
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
          <ScrollUpButton EasingType="easeInOutCubic" />
        </Grid>
      );
    }
    return <div>{rows.length > 0 ? content : <Spinner />}</div>;
  }
}

PaymentStat.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaymentStat);
