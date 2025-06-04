import axios from "axios"
import { useEffect, useState } from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import {Card, Container, Button} from "react-bootstrap"
import { Navigation } from "swiper/modules"
import { Link } from 'react-router-dom'
import logo_play from "../assets/logo_play.png"


import "swiper/css"
import "swiper/css/navigation"

import { FaArrowLeft, FaArrowRight, FaPlay } from "react-icons/fa"

const TopRated = () => {
    const [topRated, setTopRated] = useState([])

    useEffect (() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/movie/top_rated`, {
            params: {
                api_key: import.meta.env.VITE_TMDB_KEY
            }
        }).then((response) => {
            console.log("datas topRated =>", response.data)
            setTopRated(response.data.results)
        })
    },[])

    return (
        <Container className="container-upcoming"> 
            <br />
            <div className="d-flex justify-content-between align-items-center w-100">
                <h1 className="text-white" id="upcoming">TOP RATED</h1>
                <div className="d-flex justify-content-end gap-1">
                    <Button
                    className="swiperLeftUpTopRated"
                    style={{
                        backgroundColor:"#FF6500",
                        borderColor:"#FF6500"
                    }}
                    >
                        <FaArrowLeft />
                    </Button>

                    <Button
                    className="swiperRightUpTopRated"
                    style={{
                        backgroundColor:"#FF6500",
                        borderColor:"#FF6500"
                    }}
                    >
                        <FaArrowRight/>
                    </Button>
                </div>
            </div>

            <Swiper
            modules={[Navigation]}
            navigation = {{
                nextEl: ".swiperRightUpTopRated",
                prevEl: ".swiperLeftUpTopRated"
            }}
            spaceBetween={10}
            slidesPerView={"auto"}
            className="mySwiper"
            >
                {topRated?.map((results, index) => {
                    return (
                        <SwiperSlide 
                        key={index}
                        style={{
                            width:"200px",
                            flexShrink: 0
                        }}  
                        >
                            <Card className="hover-card">
                                <Link to={`/movie/${results.id}`} className="card-link">
                                <div className="card-image-wrapper">
                                    <Card.Img 
                                        variant="top"
                                        src={`${import.meta.env.VITE_IMG_URL}/${results.poster_path}`}
                                        alt="test"
                                        className="card-image"
                                        />
                                        <div className="play-icon"><img src={logo_play} alt="play-logo" className="play-logo" /></div>
                                </div>
                                </Link>
                            </Card>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Container>
    )
}

export default TopRated