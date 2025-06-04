import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Container, Pagination } from "react-bootstrap";
import PaginationComponent from "./PaginationComponent"

import {FaPlay } from "react-icons/fa"

const GenrePage = () => {

    const {genreId} = useParams()
    const [movies, setMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [genreList, setGenreList] = useState([])

    useEffect(() => {
        const fetchGenres = async () => {
            const res = await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
                params:{
                    api_key: import.meta.env.VITE_TMDB_KEY,
                    language: "en-US",
                },
            });
            setGenreList(res.data.genres)
        }
        fetchGenres()
    },[])

    const getGenreName = (id) => {
        const genre = genreList.find((g) => g.id.toString() === id.toString())
        return genre ? genre.name : "Unknown Genre"
    }

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            try{
                const [res1, res2] = await Promise.all([
                    axios.get("https://api.themoviedb.org/3/discover/movie", {
                        params:{
                            api_key: import.meta.env.VITE_TMDB_KEY,
                            with_genres: genreId,
                            page: currentPage,
                            },
                    }),
                    axios.get("https://api.themoviedb.org/3/discover/movie", {
                        params:{
                            api_key: import.meta.env.VITE_TMDB_KEY,
                            with_genres: genreId,
                            page: currentPage + 1,
                            },
                    }),
                ])

                const combinedMovies = [...res1.data.results, ...res2.data.results]
                setMovies(combinedMovies)
                console.log(combinedMovies)

                setTotalPages(Math.floor(res1.data.total_pages / 2))
                    } catch(error){
                        console.error("Error fetching movies by genre:", error)
                    }
                }
                fetchMoviesByGenre()
            }, [genreId, currentPage])

    useEffect(() => {
        window.scrollTo(0, 0)
    },[currentPage])

    return (
        <Container fluid style={{position:"relative", padding:"60px"}}>
        <div className="moviesGenre-wrapper"
        style={{
            display:"flex",
            flexDirection:"column",
        }}>
           <div
            className="text-white d-flex align-items-center justify-content-center"
            style={{
                paddingTop:"10px",
                marginBottom: "30px",
                gap: "10px"
            }}
            >
                <div style={{ flex: 1, height: "1px", backgroundColor: "#fff" }} />
                    <h2 style={{ whiteSpace: "nowrap", margin: "0 10px" }}>{getGenreName(genreId)}</h2>
                <div style={{ flex: 1, height: "1px", backgroundColor: "#fff" }} />
            </div>
                <div className="movies-grid">
                    {movies.map((results, index) => (
                        <div key={index} style={{ width: '100%' }}>
                        <Card className="hover-card"                             
                            style={{
                            width:"250px",
                                }}>
                                <Link to={`/movie/${results.id}`} className="card-link">
                                    <div className="card-image-wrapper">
                                    <Card.Img 
                                        variant="top"
                                        src={`${import.meta.env.VITE_IMG_URL}/${results.poster_path}`} 
                                        alt="" 
                                        className="card-image"
                                        />
                                    <div className="play-icon"><FaPlay/></div>
                                    </div>
                                </Link>
                            </Card>
                            <Link to={`/movie/${results.id}`} style={{fontSize:"0.9rem", textDecoration:"none"}} className="titleMovieGenre"><p className="mt-1">{results.title}</p></Link>
                        </div>
                    ))}
                </div>
            </div>
            <PaginationComponent 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            />
            
        </Container>
    )
}

export default GenrePage



