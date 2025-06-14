import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { storageService } from '../services/async-storage.service'
import { bookService } from '../services/book.service'
import { Book } from '../types/book.type'

export function BookEdit() {
  const [book, setBook] = useState<Book | null>(null)
  const { bookId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (bookId) loadBook(bookId)
  }, [bookId])

  async function loadBook(id: string) {
    try {
      const book = await bookService.get(id)
      setBook(book)
    } catch (err) {
      console.error('Failed to load book:', err)
    }
  }

  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = ev.target
    if (!book) return

    if (name === 'price') {
      setBook({
        ...book,
        listPrice: { ...book.listPrice, amount: +value },
      })
    } else {
      setBook({
        ...book,
        [name]: value,
      })
    }
  }

  function onSaveBook(ev: React.FormEvent) {
    ev.preventDefault()
    if (!book) return

    storageService.put('books', book).then(() => {
      navigate('/book')
    })
  }

  if (!book) return <div>Loading...</div>

  return (
    <section className="book-edit">
      <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
      <form onSubmit={onSaveBook}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={book.title}
          onChange={handleChange}
        />

        <label htmlFor="subtitle">Subtitle:</label>
        <input
          type="text"
          name="subtitle"
          id="subtitle"
          value={book.subtitle}
          onChange={handleChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          id="price"
          value={book.listPrice.amount}
          onChange={handleChange}
        />

        <label htmlFor="language">Language:</label>
        <input
          type="text"
          name="language"
          id="language"
          value={book.language}
          onChange={handleChange}
        />

        <section className="btns">
          <button>Save</button>
          <button type="button" onClick={() => navigate('/book')}>
            Back
          </button>
        </section>
      </form>
    </section>
  )
}
