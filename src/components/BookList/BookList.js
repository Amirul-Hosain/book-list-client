import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BookList.css'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const BookList = ({ books, setBooks }) => {


    useEffect(() => {
        fetch('https://powerful-woodland-85495.herokuapp.com/books')
            .then(res => res.json())
            .then(data => {
                setBooks(data)
            })
    }, [])


    // DELETE a Single Book
    const handleDeleteBook = id => {
        const proceed = window.confirm('Are You Sure, You Want to Delete this Book?');
        if (proceed) {
            const url = `https://powerful-woodland-85495.herokuapp.com/books/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        alert('Deleted Successfully from Book List.');

                        const remainingBook = books.filter(book => book._id !== id);
                        setBooks(remainingBook);
                    }
                })
        }
    }

    return (
        <div>
            <Container>
                <h2 className='total-books'>Total Books in Your Shelf: {books.length}</h2>

                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{ fontSize: '20px' }} className='table-header'>Cover page</StyledTableCell>
                                <StyledTableCell style={{ fontSize: '20px' }} align="center">Book title</StyledTableCell>
                                <StyledTableCell style={{ fontSize: '20px' }} align="center">Author</StyledTableCell>
                                <StyledTableCell style={{ fontSize: '20px' }} align="center">Edit</StyledTableCell>
                                <StyledTableCell style={{ fontSize: '20px' }} align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map((book) => (
                                <StyledTableRow key={book.name}>
                                    <StyledTableCell component="th" scope="row">
                                        <img width='60px' height='70' src={`data:image/*;base64,${book.image}`} alt="" />
                                    </StyledTableCell>
                                    <StyledTableCell style={{ fontSize: '18px' }} align="center">{book.title}</StyledTableCell>
                                    <StyledTableCell style={{ fontSize: '18px' }} align="center">{book.author}</StyledTableCell>
                                    <StyledTableCell style={{ fontSize: '18px' }} align="center"><Link to={`/editbook/${book._id}`}><button style={{ backgroundColor: 'aqua', border: 'none', padding: '2px 20px' }}>Edit</button></Link></StyledTableCell>
                                    <StyledTableCell style={{ fontSize: '18px' }} align="center"><button style={{ backgroundColor: 'rgb(255, 38, 74)', border: 'none', padding: '2px 15px', borderRadius: '2px' }} onClick={() => handleDeleteBook(book._id)}>Delete</button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
};

export default BookList;