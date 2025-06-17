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
import GenreList from './components/GenreList'
import GenrePage from './components/GenrePage'
import ButtonTop from './components/ButtonTop'
import CallbackPage from './components/CallbackPage'
import AuthProvider from './context/AuthProvider'
import ProfileDetail from './components/ProfileDetail'
import ProfileRated from './components/ProfileRated'
import ProfileWatchlist from './components/ProfileWatchlist'

const App = () => {

  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  return (
      <Router>
        <AuthProvider>
          <ScrollToTop />
          <NavigationBar onSearchResult={setMovies} onSearchQuery = {setSearchQuery} setCurrentPage = {setCurrentPage} setTotalPages = {setTotalPages}/>
          <Routes>
            {/* intro section */}
            <Route path = "/" element ={<LandingPage />}  />
            {/* end of intro section */}

            {/* search page */}
              <Route path = "/search" element = {<SearchPage movies = {movies} searchQuery = {searchQuery} currentPage = {currentPage} setCurrentPage = {setCurrentPage} totalPages = {totalPages} setTotalPages = {setTotalPages}/>} />
            {/* end of search page */}
            
            {/* movie detail */}
              <Route path='/movie/:id' element = {<MovieDetail />} />
            {/* end of movie detail */}

            {/* genre list */}
            <Route path='/genres' element = {
              <div className='genreList'>
              <GenreList />
              </div>
              } />
            {/* end of genre list */}

            {/* genre page */}
              <Route path='/genre/:genreId' element = {
                <div className='genrePage'>
                <GenrePage currentPage = {currentPage} setCurrentPage = {setCurrentPage} totalPages = {totalPages} setTotalPages = {setTotalPages}/>
                </div>
                } />
            {/* end of genre page */}

                {/* Login Route */}
                <Route path='/callback' element={<CallbackPage />} />
                {/* end of login route */}

                {/* Profile Detail */}
                <Route path='/profile/:username' element={
                  <div className='profile'>
                    <ProfileDetail />
                  </div>
                }>
                  <Route path='rating' element={<ProfileRated />}></Route>
                  <Route path='watchlist' element={<ProfileWatchlist />}></Route>
                </Route>
                {/* end of Profile Detail */}

          </Routes>
          <div className='footer'>
            <Footer />
          </div>
          <ButtonTop />
        </AuthProvider>
      </Router>
  )
}

export default App
