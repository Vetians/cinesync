import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Container, Image } from "react-bootstrap"
import "../style/movieDetail.css"

const MovieDetail = () => {
    const {id} = useParams()
    const [movie, setMovies] = useState(null)

    useEffect (() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
                api_key: import.meta.env.VITE_TMDB_KEY,
            },
        }).then((response) => {
            setMovies(response.data)
            console.log("datas detail =>", response.data)
        })
    }, [id])

    if(!movie) return <div className="text-black">Loading...</div>

    return(
        <Container fluid className="container-detail d-flex text-white" style={{
            position:"relative",
            justifyContent:"center"
        }}>
            <div 
            className="z-3"
            style={{
                paddingTop:"95px"
            }}
            ><h1>{movie.title}</h1></div>
            <div 
                className="detail-backdrop"
                style={{
                    backgroundImage: `url(${import.meta.env.VITE_IMG_URL}/${movie.backdrop_path})`,
                    backgroundSize:"cover",
                    height:"100%",
                    width:"100%",
                    filter:"brightness(0.6)",
                    position:"absolute",
                    top:"0px",
                    zIndex:1
                }}
            ></div>
            
                <div className="wrapper-detail d-flex z-2"
                style={{
                    position:"absolute",
                    left:"25%",
                    top:"20%",
                    right:"25%",
                }}
                >
                    <div className="image-wrapper d-flex">
                    <Image
                    src = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt = {movie.title}
                    style={{
                        height:"100%",
                        width:"300px",
                        marginRight:"10px"
                    }}
                    />
                    </div>
                    <div className="overview-wrapper d-flex text-white">
                    {/* <h1>{movie.title}</h1> */}
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
        </Container>
    )
}

export default MovieDetail