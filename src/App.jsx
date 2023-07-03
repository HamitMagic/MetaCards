import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFound from './pages/NotFound';
import Video from './pages/Video';
import Header from './pages/Header';


function App() {

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/video' element={<Video />} />
        <Route path='/:id' element={<Video />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
