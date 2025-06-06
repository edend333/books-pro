import './App.css';
import './assets/style/main.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home'
import { About } from './pages/About'
import { BookIndex } from './pages/BookIndex'
import { books } from './services/booksData';
import { storageService } from './services/async-storage.service';
import { BookDetails } from './pages/BookDetails';
import { AppHeader } from './cmps/AppHeader';
import BookList from './cmps/BookList';




function App() {



if (!localStorage.getItem("books")) {
  storageService.save("books", books)
}

  return (
    <div>
     
      <BrowserRouter>
       <AppHeader/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/booksList' element={<BookList />} />
          <Route path='/book' element={<BookIndex />} />
          <Route path='/book/:bookId' element={<BookDetails />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}


export default App;
