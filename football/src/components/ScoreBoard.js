import React from 'react';
import { useSelector } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import SimpleModal from "./SimpleModal"
import TablePaginationActions from "./TablePaginationActions"


export default function CustomPaginationActionsTable({rows}) {
  const stat = useSelector( state => state.stat )

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [modalOpen,setModalOpen] = React.useState(false) ;
  const [modalData,setModalData] = React.useState({})
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handelModal = (event) => {
    let text = event.target.innerText
    if(!stat[text]) return   
    setModalOpen(true)
    setModalData({...stat[text],...{name:text}})
    // console.log(event.target.innerText)
  };
  return (
    
    <TableContainer component={Paper}>
      <Table  size="small" aria-label="custom pagination table">
        <TableBody>
            {
                <TableRow>
                    <TableCell>
                        <span className="table-head-text">Date</span>
                    </TableCell>
                    <TableCell  align="center">
                       <span className="table-head-text">Teams</span>
                    </TableCell>
                    <TableCell>
                        <span className="table-head-text">Score</span>
                    </TableCell>
                </TableRow>    
            }
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row,k) => (
            <TableRow key={k}>
              <TableCell  >
                {row.date}
              </TableCell>
              <TableCell style={{ }} align="center">
                    <span onClick={handelModal} > 
                          <a href="#" >{row.team1}</a> VS <a href="#">{row.team2}</a> 
                    </span>
              </TableCell>
              <TableCell style={{ }} align="left">
                <span className="scores">
                  {`${row.score.ft[0]} -  ${row.score.ft[1]}`}
                </span>  
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'items per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <SimpleModal  modalOpen={modalOpen}  setModalOpen={setModalOpen} modalData={modalData}/>
    </TableContainer>
  );
}
