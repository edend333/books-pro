import { Link } from 'react-router-dom'
import { Book } from '../types/book.type'

type BookPreviewProps = {
  book: Book
}

export function BookPreview({ book }: BookPreviewProps) {
  return (
    <article className="book-preview">
      <h3>{book.title}</h3>
      <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
      <img src={book.thumbnail} alt="book thumbnail" />
    </article>
  )
}
