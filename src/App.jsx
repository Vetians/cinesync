import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import NavigationBar from "./components/NavigationBar"
import "./style/landingPage.css"
import Intro from './components/Intro'
import Trending from "./components/Trending"
import Superhero from './components/Superhero'
import SearchPage from './components/SearchPage'
import LandingPage from './components/landingPage'
import { useState} from 'react'
import ScrollToTop from './components/ScrollToTop'


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
          
        </Routes>
      </Router>
  )
}

export default App
