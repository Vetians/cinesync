import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

const GenreList = () => {
    const navigate = useNavigate()
    const [genres, setGenres] = useState([])

    useEffect(() => {
        const fetchGenres = async () => {
            const res = await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
                params:{
                    api_key : import.meta.env.VITE_TMDB_KEY,
                }
            })
            setGenres(res.data.genres)
            console.log(res.data.genres)
        }
        fetchGenres()
    },[])

    return (
        <Container fluid style={{position:"relative"}}>
            <div 
            className="genre-list-wrapper"
            style={{
                height:"600px",
                width:"1360px",
                backgroundColor:"#0B192C",
                position:"absolute",
                top:"100px",
                left:"70px",
            }}
            >
                <div style={{
                    borderBottom:"1px solid #555f",
                    marginBottom:"30px"
                }}>
                    <h2 className="text-white">Genres</h2>
                </div>
                <div variant="dark">
                    <Row className="justify-content-center">
                        {genres.map((genre) => (
                            <Col key={genre.id} md={3} className="mb-4">
                                <Button className="genre-btn" variant="outline-light" onClick={() => navigate(`/genre/${genre.id}`)}>{genre.name}</Button>
                            </Col>
                        ))}
                </Row>
                </div>
            </div>
        </Container>
    )
}

export default GenreList






