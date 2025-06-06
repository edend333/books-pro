import { bookService } from "../services/book.service.js"
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function BookDetails() {
    const [book, setbook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setbook)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onBack() {
        navigate('/book')
    }

    console.log('Render', params)
    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>book title: {book.title}</h1>
            <h1>book subtitle: {book.subtitle}</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            <img src={`../assets/img/${book.vendor}.png`} alt="book-image" />
            <button onClick={onBack}>Back</button>
            <section>
                {/* <Link to={`/book/${book.prevbookId}`}><button>Prev book</button></Link>
                <Link to={`/book/${book.nextbookId}`}><button>Next book</button></Link> */}
            </section>
        </section>
    )
}