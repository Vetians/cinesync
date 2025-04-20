import axios from "axios"
import { useEffect, useState } from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import {Card, Container, Button} from "react-bootstrap"
import { Navigation } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"

import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

const Upcoming = () => {
    const [Upcoming, setUpcoming] = useState([])

    useEffect (() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/movie/upcoming`, {
            params: {
                api_key: import.meta.env.VITE_TMDB_KEY
            }
        }).then((response) => {
            console.log("datas upcoming =>", response.data)
            setUpcoming(response.data.results)
        })
    },[])

    return (
        <Container className="container-upcoming"> 
            <br />
            <div className="d-flex">
                <h1 className="text-white">UPCOMING MOVIE</h1>
                <div className="buttonSwiper">
                    <Button
                    className="swiperLeftUpcoming">
                        <FaArrowLeft />
                    </Button>

                    <Button
                    className="swiperRightUpcoming">
                        <FaArrowRight/>
                    </Button>
                </div>
            </div>

            <Swiper
            modules={[Navigation]}
            navigation = {{
                nextEl: ".swiperRightUpcoming",
                prevEl: ".swiperLeftUpcoming"
            }}
            spaceBetween={10}
            slidesPerView={"auto"}
            className="mySwiper"
            id="upcoming"
            >
                {Upcoming?.map((results, index) => {
                    return (
                        <SwiperSlide 
                        key={index}
                        style={{
                            width:"200px",
                            flexShrink: 0
                        }}  
                        >
                            <Card>
                                <Card.Img 
                                variant="top"
                                src={`${import.meta.env.VITE_IMG_URL}/${results.poster_path}`}
                                alt="test"
                                className="images"
                                draggable="false"
                                />
                            </Card>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Container>
    )
}

export default Upcoming