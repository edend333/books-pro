import React, { useEffect } from 'react'
import { Book } from '../types/book.type'
import { BookListProps } from '../types/book.type';
import { Link } from 'react-router-dom';
import { BookPreview } from './BookPreview';

export function BookList({ booksLocal }: BookListProps) {


  useEffect(() => {
    console.log(' booksLocal:', booksLocal)
  }, [booksLocal])

  // const getReadingLevel = (pageCount) => {
  //   if (pageCount > 500) return 'Serious Reading'
  //   if (pageCount > 200) return 'Descent Reading'
  //   if (pageCount < 100) return 'Light Reading'
  //   return ''
  // }

  // const getPublishedStatus = (year) => {
  //   const currentYear = new Date().getFullYear()
  //   const diff = currentYear - year
  //   if (diff > 10) return 'Vintage'
  //   if (diff <= 1) return 'New'
  //   return ''
  // }

  // const getPriceClass = (amount) => {
  //   if (amount > 150) return 'price-red'
  //   if (amount < 20) return 'price-green'
  //   return ''
  // }

  return (
    <>
      <ul className="book-list">
        {booksLocal.map(book =>
          <li key={book.id}>
            <BookPreview book={book} />
            <div className="btn-group">
              <button onClick={() => console.log('Remove', book.id)}>Remove</button>
              <Link to={`/book/details/${book.id}`}>
                <button>Details</button>
              </Link>
              <Link to={`/book/${book.id}`}>
                <button>Edit</button>
              </Link>
            </div>
          </li>
        )}
      </ul >

    </>
  )
}
