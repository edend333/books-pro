import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Book } from '../types/book.type'
import { bookService } from '../services/book.service'

export function BookDetails() {
  const [book, setBook] = useState<Book | null>(null)
  const { bookId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log("book", bookId);
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
  function getReadingLevel(pageCount: number): string {
    if (pageCount > 500) return 'Serious Reading'
    if (pageCount > 200) return 'Decent Reading'
    if (pageCount < 100) return 'Light Reading'
    return ''
  }

  function getPublishedInfo(publishedDate: number): string {
    const currentYear = new Date().getFullYear()
    const diff = currentYear - publishedDate
    if (diff > 10) return 'Vintage'
    if (diff < 1) return 'New'
    return ''
  }

  function getPriceClass(amount: number): string {
    if (amount > 150) return 'price-high'
    if (amount < 20) return 'price-low'
    return ''
  }

  function onBack() {
    navigate('/book')
  }

  if (!book) return <div>Loading book...</div>

  return (
    <section className="book-details">
      <h2>{book.title}</h2>
      <h4>{book.subtitle}</h4>
      <div className="content">
        <img src={book.thumbnail} alt={book.title} />
        <div className="info">
          <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
          <p><strong>Published:</strong> {book.publishedDate} <span className="published-info"></span></p>
          <p><strong>Pages:</strong> {book.pageCount} <span className="reading-level"></span></p>
          <p><strong>Categories:</strong> {book.categories.join(', ')}</p>
          <p><strong>Language:</strong> {book.language}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <p className={getPriceClass(book.listPrice.amount)}>
            <strong>Price:</strong> {book.listPrice.amount} {book.listPrice.currencyCode}
          </p>
          {book.listPrice.isOnSale && (
            <p className="on-sale">🔥 On Sale!</p>
          )}
          <button onClick={onBack}> Back</button>
        </div>
      </div>
    </section>

  )
}
