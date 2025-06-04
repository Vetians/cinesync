import {Card, Container, Image, Button} from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import axios from "axios"
import PaginationComponent from "./PaginationComponent"
import logo_play from "../assets/logo_play.png"

import fallback from "../assets/fallback-image.png"

const SearchPage = ({searchQuery, currentPage, setCurrentPage, totalPages, setTotalPages}) =>{
    
    const [paginatedMovies, setPaginatedMovies] = useState([])

    useEffect(() => {
        const fetchMoviesByPage = async () => {
            if(searchQuery.length > 0){
                try{
                    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/search/movie`, {
                        params: {
                            api_key: import.meta.env.VITE_TMDB_KEY,
                            query: searchQuery,
                            page: currentPage,
                        },
                    })
                    console.log("data search: ", res.data)
                    setPaginatedMovies(res.data.results)
                    setTotalPages(res.data.total_pages)
                } catch (err){
                    console.error("gagal fetch data:", err)
                }
            }
        }
        fetchMoviesByPage()
    }, [searchQuery, currentPage, setTotalPages])

    useEffect(() => {
        window.scrollTo(0, 0)
    },[currentPage])
    
    return (
        <div>
            <div className="searchPagess d-flex pt-5">
            <Container>
                <br />
                <h1 className="text-white">Hasil Pencarian untuk: "{searchQuery}" </h1>
                <br />
                <div style={{
                    height:"auto",
                    display:"flex",
                    flexDirection:"column"
                }}>
                        {paginatedMovies.map((results) => {
                            return (
                                    <div 
                                    key={results.id}
                                    className="movieWrapper-searchpage text-white" 
                                    style={{
                                        display:"flex",
                                        width:"100%",
                                        borderBottom:"1px solid #555f",
                                        padding:"15px"
                                    }}
                                    >
                                        <Card className="hover-card">
                                            <Link to={`/movie/${results.id}`} className="card-link">
                                            <div className="card-image-wrapper">
                                                <Card.Img
                                                src={
                                                    results.poster_path 
                                                    ? `${import.meta.env.VITE_IMG_URL}/${results.poster_path}`
                                                    : fallback
                                                }
                                                // className="card-image"
                                                style={{
                                                    width:"200px"
                                                }}
                                                />
                                                <div className="play-icon"><img src={logo_play} alt="play-logo" className="play-logo" /></div>
                                            </div>
                                            </Link>
                                        </Card>
                                            <div className="bg-dark" style={{flex:"1"}}>
                                                <div className="p-2 m-1 text-white">
                                                <div style={{ fontSize: "2rem", fontWeight:"bold"}}>{results.title}</div>
                                                <div className="text-left overview">
                                                {results.overview}
                                                </div>
                                                <div className="text-left">{results.release_date}</div>
                                                </div>
                                            </div>
                                    </div>
                            )
                        })}
                </div>
                        <div>
                        <PaginationComponent
                        currentPage = {currentPage}
                        totalPages = {totalPages}
                        onPageChange = {setCurrentPage}
                        />
                        </div>
            </Container>
        </div>
        </div>
    )
}

export default SearchPage
