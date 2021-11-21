import React, { useState } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'

const Header = ({ setBooks }) => {
    const [search, setSearch] = useState([]);

    const handleInput = e => {
        setSearch(e.target.value);
    }
    const handleBookSearch = () => {
        const url = `http://localhost:500/searchEvent?search=${search}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setBooks(data)
            })
    }

    return (
        <div className='header-container'>
            <nav className="navbar container header-route navbar-expand-lg navbar-light ">
                <div>
                    <img width='80' height='50' src={logo} alt="" />
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse right-nav navbar-collapse" id="navbarSupportedContent">
                    <div header-detail>
                        <Link className='header-link' to='/booklist'>Book List</Link>
                        <Link className='header-link' to='/addbook'>Add New Book</Link>
                    </div>
                    <div className='search-field'>
                        <input onBlur={handleInput} type="text" />
                        <button type='submit' onClick={handleBookSearch} >Search</button>
                    </div>
                </div>
            </nav>


        </div>
    );
};

export default Header;