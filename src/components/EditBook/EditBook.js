import React, { useEffect, useState } from 'react';
import './EditBook.css';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';


const EditBook = () => {
    const [books, setBooks] = useState({});
    const { id } = useParams();
    const { register, handleSubmit } = useForm();

    // get single book
    useEffect(() => {
        const url = `http://localhost:500/books/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setBooks(data);
            })
    }, [])


    // update book
    const onSubmit = data => {
        const url = `http://localhost:500/books/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(books)
        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount > 0) {
                    alert('Edit Successfully.')
                    setBooks({});
                }
            })
    };
    const handleImageChange = e => {
        const updatedImage = e.target.value;
        const updatedBook = { image: updatedImage, title: books.title, author: books.author, };
        setBooks(updatedBook)
    }
    const handleTitleChange = e => {
        const updatedTitle = e.target.value;
        const updatedBook = { title: updatedTitle, image: books.image, author: books.author };
        setBooks(updatedBook)
    }
    const handleAuthorChange = e => {
        const updatedAuthor = e.target.value;
        const updatedBook = { author: updatedAuthor, image: books.image, title: books.title };
        setBooks(updatedBook)
    }


    return (
        <div style={{ width: '100%' }}>
            {/* <h1 style={{ color: 'black' }}>{id}</h1> */}

            <div className='edit-book-container'>
                <div>
                    <img width='300' height='350' src={books.image} alt="" />
                    <h4 style={{ marginTop: '25px' }}>Book title: {books.title}</h4>
                    <h4>Author: {books.author}</h4>
                </div>


                <div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='edit-book'
                    >
                        <h2 style={{ marginBottom: '30px' }}>Edit the Book</h2>
                        <input {...register("image")} onChange={handleImageChange} value={books.image || ''} placeholder='Image url' />
                        <input {...register("title")} onChange={handleTitleChange} value={books.title || ''} placeholder='Book title' />
                        <input {...register("author")} onChange={handleAuthorChange} value={books.author || ''} placeholder='Author name' />
                        <input type="submit" value='Add to List' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBook;