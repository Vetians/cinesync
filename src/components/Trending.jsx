import { useRef, useEffect, useState } from "react"
import {Card, Container, Row, Col, Button} from "react-bootstrap"
import axios from "axios"

const Trending = () => {
    const [movies, setMovies] =  useState ([])
    const scrollRef = useRef(null)
    const[isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [swipeLeft, setSwipeLeft] = useState(0)

    useEffect (() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/discover/movie`, {
            params: {
                api_key: import.meta.env.VITE_TMDB_KEY
        }
    }).then((response) => {
        console.log("datas => ", response.data)
        setMovies(response.data.results)
    })

    }, [])

    const scrollLeft = () => {
        scrollRef.current.scrollBy({left: -350, behavior:"smooth"})
    }

    const scrollRight = () => {
        scrollRef.current.scrollBy({left: 350, behavior:"smooth"})
    }

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setSwipeLeft(scrollRef.current.scrollLeft)
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e) => {
        if(!isDragging) return;

        const move = (e.pageX - scrollRef.current.offsetLeft - startX) * 0.5
        scrollRef.current.scrollLeft = swipeLeft - move
    }

    return (
            <Container>
                <br />
                <h1 className="text-white">TRENDING MOVIES</h1>
                <br />
                <div className="swiper-container position-relative" style={{height: "40px"}}>
                    <div className="swiper-group">
                        <Button
                            variant="dark"
                            onClick={scrollLeft}
                            className="position-absolute "
                            style={{zIndex: 10, right:"50px"}}
                            >
                            ←
                        </Button>

                        <Button
                            variant="dark"
                            onClick={scrollRight}
                            className="position-absolute"
                            style={{zIndex: 10, right:"8px"}}
                            >
                            →
                        </Button>
                    </div>
                </div>

                <div 
                className="scroll-container overflow-auto py-3 horizontal_scroll" 
                style={{cursor: isDragging? 'grabbing' : 'grab', userSelect: 'none', scrollBehavior:"smooth"}}
                ref={scrollRef} 
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                >
                    <Row className="flex-nowrap gx-3">
                        {movies.map((results, index) => {
                            return (
                                <Col style={{flex:"0 0 auto", width:"350px"}} id="trending" key={index}>
                                    <Card className="movieImage">
                                        <Card.Img 
                                        variant="top" 
                                        src={`${import.meta.env.VITE_IMG_URL}/${results.poster_path}`} 
                                        alt="Test" className="images"
                                        draggable="false"
                                        />
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </div>

            </Container>
    )
}

export default Trending