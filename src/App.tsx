import './App.css';
import './assets/style/main.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from './pages/Home'
import { About } from './pages/About'
import { BookIndex } from './pages/BookIndex'
import { books } from './services/booksData';
import { BookDetails } from './pages/BookDetails';
import { AppHeader } from './cmps/AppHeader';
import { useEffect, useState } from 'react';
import { Book } from '../src/types/book.type'
import { BookList } from './cmps/BookList';
import { storageService } from './services/async-storage.service';
import { BookEdit } from './pages/BookEdit';



function App() {

  const [booksLocal, setBooksLocal] = useState<Book[]>([])

  useEffect(() => {
    const booksInStorage = localStorage.getItem("books")

    if (!booksInStorage) {
      storageService.save("books", books)
      setBooksLocal(books)
    } else {
      const booksFromStorage = JSON.parse(booksInStorage)
      setBooksLocal(booksFromStorage)
    }
  }, [])

  console.log("books", books);

  return (
    <div>

      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/booksList' element={<BookList booksLocal={booksLocal} />} />
          <Route path='/book' element={<BookIndex />} />
          <Route path='/book/details/:bookId' element={<BookDetails />} />
          <Route path='/book/:bookId' element={<BookEdit />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}


export default App;
