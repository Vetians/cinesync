import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import NavigationBar from "./components/NavigationBar"
import "./style/landingPage.css"
import SearchPage from './components/SearchPage'
import LandingPage from './components/LandingPage'
import MovieDetail from './components/MovieDetail'
import {useState} from 'react'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'

const App = () => {

  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  return (
      <Router>
        <ScrollToTop />
        <NavigationBar onSearchResult={setMovies} onSearchQuery = {setSearchQuery}/>
        <Routes>
          {/* intro section */}
          <Route path = "/" element ={<LandingPage />}  />
          {/* end of intro section */}

          {/* search page */}
            <Route path = "/search" element = {<SearchPage movies = {movies} searchQuery = {searchQuery} />} />
          {/* end of search page */}
          
          {/* movie detail */}
            <Route path='/movie/:id' element = {<MovieDetail />} />
          {/* end of movie detail */}
        </Routes>
        <div className='footer'>
          <Footer />
        </div>
      </Router>
  )
}

export default App
