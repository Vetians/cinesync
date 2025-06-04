import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Container, Image } from "react-bootstrap"
import "../style/movieDetail.css"
import fallback from "../assets/fallback-image.png"

const MovieDetail = () => {
    const {id} = useParams()
    const [movie, setMovies] = useState(null)
    const [credits, setCredits] = useState([])

    // useEffect (() => {
    //     axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
    //         params: {
    //             api_key: import.meta.env.VITE_TMDB_KEY,
    //         },
    //     }).then((response) => {
    //         setMovies(response.data)
    //         console.log("datas detail =>", response.data)
    //     })
    // }, [id])

    useEffect(() => {
        const fetchMovieAndCredits = async () => {
            try {
                const movieRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {
                        api_key: import.meta.env.VITE_TMDB_KEY,
                    }
                })
                setMovies(movieRes.data)

                const creditRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
                    params: {
                        api_key: import.meta.env.VITE_TMDB_KEY,
                    }
                })
                setCredits(creditRes.data.cast)
                console.log(movieRes.data)
            }catch(error){
                console.error("Gagal fetch data", error)
            }
        }
        fetchMovieAndCredits()
    },[id])


    if(!movie) return <div className="text-black">Loading...</div>

    return(
        <Container fluid className="container-detail d-flex text-white" style={{
            position:"relative",
            justifyContent:"center"
        }}>
                <div 
                    className="detail-backdrop"
                    style={{
                        backgroundImage: `url(${
                            movie.backdrop_path
                            ? `${import.meta.env.VITE_IMG_URL}/${movie.backdrop_path}` 
                            : movie.poster_path 
                                ? `${import.meta.env.VITE_IMG_URL}/${movie.poster_path}`
                                : fallback
                        })`,
                        backgroundSize:"cover",
                        height:"100%",
                        width:"100%",
                        filter:"brightness(0.6)",
                        position:"absolute",
                        top:"0px",
                        zIndex:1,
                    }}
                ></div>

                    <div 
                    className="detail-wrapper"
                    style={{
                        height:"630px",
                        width:"1000px",
                        zIndex:2,
                        position:"absolute",
                        top:"100px",
                        display:"flex",
                        justifyContent:"start",
                        flexDirection:"column",
                        // backgroundColor:"rgba(28, 28, 28, 0.5)",
                        // backdropFilter:"blur(1px)",
                        // borderRadius:"10px",
                        // padding:"10px"

                    }}
                    >
                        <div style={{textAlign:"center"}}> 
                            <h1>{movie.title}</h1>
                        </div>

                        <div className="wrapper-detail d-flex z-2">
                            <div className="image-wrapper d-flex">
                            <Image
                            src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt = {movie.title}
                            style={{
                                height:"auto",
                                width:"230px",
                                marginRight:"10px"
                            }}
                            />
                            </div>
                            <div className="overview-wrapper d-flex text-white">
                            <p>{movie.release_date}</p>
                            <div>
                                <strong>Genres: </strong>
                                {movie.genres && movie.genres.map((genre, index) => (
                                    <span key = {genre.id}>
                                        {genre.name}{index < movie.genres.length - 1 ? ', ': ''}
                                    </span>
                                ))}
                            </div>
                            <br />
                            <p>{movie.overview}</p>
                            </div>
                        </div>
                        <div
                        style={{
                            display:"flex",
                            flexDirection:"column",
                            // backgroundColor:"rgba(19, 19, 19, 0.5)",
                            // borderRadius:"10px",
                            // padding:"10px"
                        }}
                        >
                            <div>
                                <h5>Pemeran Utama:</h5>
                            </div>
                        <div className="d-flex gap-3">
                            {credits.slice(0, 9).map(actor => (
                                <div 
                                key={actor.id}
                                style={{width:"120px",
                                    textAlign:"center",
                                }}
                                >
                                    <Image
                                    src={
                                        actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                        : fallback
                                    }
                                    alt={actor.name}
                                    roundedCircle
                                    style={{
                                        width:"80px",
                                        height:"80px",
                                        objectFit:"cover"
                                    }}
                                    ></Image>
                                    <p className="mt-2 mb-0" style={{fontSize:"0.9rem"}}>
                                        <strong>{actor.name}</strong><br />
                                        <small>({actor.character})</small>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
        </Container>
    )
}

export default MovieDetail