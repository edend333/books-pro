import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home'
import { About } from './pages/About'
import { BookIndex } from './pages/BookIndex'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/book' element={<BookIndex />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
