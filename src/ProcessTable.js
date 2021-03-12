import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

export default class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TableContainer
        component={Paper}
        style={{ width: "100%", maxWidth: "520px", margin: "0 auto" }}
      >
        <Table className={""} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Process</StyledTableCell>
              <StyledTableCell align="center">
                {this.props.middle}
              </StyledTableCell>
              <StyledTableCell align="right">Priority&nbsp;(p)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.processors.map((p) => (
              <StyledTableRow key={p.process}>
                <StyledTableCell component="th" scope="row">
                  {p.process}
                </StyledTableCell>

                {!p.semaphore ? (
                  <StyledTableCell align="center">
                    {p.burstTime}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell align="center">
                    {p.semaphore}
                  </StyledTableCell>
                )}

                {/* <StyledTableCell align="center">{p.burstTime}</StyledTableCell> */}

                <StyledTableCell align="right">{p.priority}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
