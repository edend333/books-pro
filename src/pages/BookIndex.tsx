import { useState, useEffect } from 'react';
import { Book } from '../types/book.type';
import { BookFilter } from '../cmps/BookFilter';
import { BookList } from '../cmps/BookList';
import { storageService } from '../services/async-storage.service';

export function BookIndex() {
  const [books, setBooks] = useState<Book[]>([])
  const [filterBy, setFilterBy] = useState({ title: '', maxPrice: Infinity })

useEffect(() => {
  storageService.query('books').then((loadedBooks) => {
    setBooks(loadedBooks as Book[])
  })
}, [])
  function getBooksToShow() {
    return books.filter((book) => {
      const isTitleMatch = book.title.toLowerCase().includes(filterBy.title.toLowerCase())
      const isPriceMatch = book.listPrice.amount <= filterBy.maxPrice
      return isTitleMatch && isPriceMatch
    })
  }

  return (
    <section className="book-index">
      <BookFilter filterBy={filterBy} onSetFilter={setFilterBy} />
      <BookList booksLocal={getBooksToShow()} />
    </section>
  )
}
