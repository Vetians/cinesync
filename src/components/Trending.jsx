import { useEffect, useState } from "react"
import {Card, Container, Button} from "react-bootstrap"
import axios from "axios"
import {Swiper, SwiperSlide} from "swiper/react"
import { Navigation } from "swiper/modules"
import { Link } from 'react-router-dom'

import "swiper/css"
import "swiper/css/navigation"

import { FaArrowLeft, FaArrowRight } from "react-icons/fa"


const Trending = () => {
    const [movies, setMovies] =  useState ([])

    useEffect (() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/trending/movie/day`, {
            params: {
                api_key: import.meta.env.VITE_TMDB_KEY
        }
    }).then((response) => {
        console.log("datas => ", response.data)
        setMovies(response.data.results)
    })

    }, [])

    return (
            <Container>
                <br />
            {/* Judul + Tombol Navigasi */}
            <div className="d-flex justify-content-between w-100 align-items-center">
                <h1 className="text-white">TRENDING MOVIES</h1>

                <div className="buttonSwiper d-flex justify-content-end gap-1">
                    <Button
                        className="swiperLeft"
                    >
                    <FaArrowLeft/>
                    </Button>

                    <Button
                        className="swiperRight"
                    >
                    <FaArrowRight/>
                    </Button>
                </div>
            </div>
                    <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: ".swiperRight",
                        prevEl: ".swiperLeft"
                    }}
                    spaceBetween={10}
                    slidesPerView={"auto"}
                    grabCursor={true}
                    className="mySwiper"
                    id="trending"
                    >
                        {movies?.map((results, index) => {
                            return (
                                <SwiperSlide 
                                key={index} 
                                style={{
                                    width:"200px",
                                    flexShrink: 0
                                }}
                                >
                                <Card className="movieImage">
                                    <Link to={`/movie/${results.id}`}>
                                        <Card.Img 
                                            variant="top"
                                            src={`${import.meta.env.VITE_IMG_URL}/${results.poster_path}`} 
                                            alt="Test" 
                                            className="images"
                                            draggable="false"
                                        />
                                    </Link>
                                </Card>
                            </SwiperSlide>
                            )
                        })}
                    </Swiper>
            </Container>
    )
}

export default Trending