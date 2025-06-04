import axios from "axios"
import { useEffect, useState } from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import {Card, Container, Button} from "react-bootstrap"
import { Navigation } from "swiper/modules"
import { Link } from 'react-router-dom'

import "swiper/css"
import "swiper/css/navigation"

import { FaArrowLeft, FaArrowRight, FaPlay } from "react-icons/fa"

const NowPlaying = () => {
    const [nowPlaying, setNowPlaying] = useState([])

    useEffect (() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/movie/now_playing`, {
            params: {
                api_key: import.meta.env.VITE_TMDB_KEY
            }
        }).then((response) => {
            console.log("datas upcoming =>", response.data)
            setNowPlaying(response.data.results)
        })
    },[])

    return (
        <Container className="container-upcoming"> 
            <br />
            <div className="d-flex justify-content-between align-items-center w-100">
                <h1 className="text-white" id="now-playing">NOW PLAYING</h1>
                <div className="d-flex justify-content-end gap-1">
                    <Button
                    className="swiperLeftNowPlaying"
                    style={{
                        backgroundColor:"#FF6500",
                        borderColor:"#FF6500"
                    }}
                    >
                        <FaArrowLeft />
                    </Button>

                    <Button
                    className="swiperRightNowPlaying"
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
                nextEl: ".swiperRightNowPlaying",
                prevEl: ".swiperLeftNowPlaying"
            }}
            spaceBetween={10}
            slidesPerView={"auto"}
            className="mySwiper"
            >
                {nowPlaying?.map((results, index) => {
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
                                        <div className="play-icon"><FaPlay/></div>
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

export default NowPlaying