import './AddBook.css';
import { useForm } from "react-hook-form";
import { useState } from 'react';



const AddBook = () => {
    const { reset } = useForm();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState(null);

    const onSubmit = e => {
        if (!image) {
            return alert('Please add an image')
        }

        const formData = new FormData();
        formData.append('title', title.toLowerCase());
        formData.append('author', author);
        formData.append('image', image);

        console.log(formData);

        fetch('http://localhost:500/books', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    alert('Added Successfully in Book List.');
                    reset();
                }
            })
        e.preventDefault();

    };
    return (
        <div className='add-container'>
            <form
                onSubmit={onSubmit}
                className='add-book'
            >
                <h2 style={{ marginBottom: '30px' }}>Add Your Favorite Book</h2>

                <input
                    onChange={e => setImage(e.target.files[0])}
                    accept="image/*"
                    type="file" />

                <input
                    onChange={e => setTitle(e.target.value)}
                    type='text'
                    placeholder='Book title' />
                <input
                    onChange={e => setAuthor(e.target.value)}
                    type='text'
                    placeholder='Author name' />
                <input type="submit" value='Add to List' />
            </form>
        </div>
    );
};

export default AddBook;