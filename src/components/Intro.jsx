import {Container, Card, Button} from "react-bootstrap"
import axios from "axios"
import { useState, useEffect } from "react"
import { Swiper,SwiperSlide } from "swiper/react"
import { Link } from 'react-router-dom'
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules"
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'




const Intro = () => {
  const [popular, setPopular] = useState([])
  const [activeSlide, setActiveSlide] = useState(null)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/movie/popular`, {
      params: {
        api_key: import.meta.env.VITE_TMDB_KEY
      }
    }).then((response) => {
      console.log("datas popular =>", response.data)
      setPopular(response.data.results)
      setActiveSlide(response.data.results[0])
    })
  },[])

    return (
      <Container fluid id="intro" style={{
          backgroundColor:"black",
          display:"flex", 
          position:"relative", 
          overflow:"hidden",
          justifyContent:"center",
          alignItems:"end",
        }}>
          <div className="desktopBackdrop d-none d-md-flex">
          {activeSlide && (
            <div 
            className="intro-backdrop"
            style={{
              backgroundImage:`linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0)), url(${import.meta.env.VITE_IMG_URL}/${activeSlide.backdrop_path})`,
              position:"absolute",
              top:"0",
              right:"0",
              width:"75%",
              height:"75%",
              backgroundSize:"cover",
              filter:"brightness(0.9)",
            }}
            ></div>
          )}
          </div>
          <div className="mobileBackdrop d-md-none">
          {activeSlide && (
            <div 
            className="intro-backdrop"
            style={{
              backgroundImage:`linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0)), url(${import.meta.env.VITE_IMG_URL}/${activeSlide.backdrop_path})`,
              position:"absolute",
              top:"25%",
              right:"0",
              width:"100vw",
              height:"50vw",
              backgroundSize:"cover",
              filter:"brightness(0.9)",
            }}
            ></div>
          )}
          </div>

        <div className="swiperWrapper">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 300,
              modifier: 1,
              slideShadows: true
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiperIntro"
            style={{paddingBottom: "35px", maxWidth:"99vw"}}
            onSlideChange={(swiper) => {
              const index = swiper.realIndex
              setActiveSlide(popular[index])
            }}
            >
            {popular?.map((results, index) => {
              return (
                <SwiperSlide
                key={index}
                style={{
                  width:"200px",
                  flexShrink: 0,
                  position:"relative",
                }}
                >
                  <Card>
                    <Link to={`/movie/${results.id}`}>
                      <Card.Img 
                      src={`${import.meta.env.VITE_IMG_URL}/${results.poster_path}`} 
                      alt="test gagal"
                      className="imagesIntro" 
                      />
                  </Link>
                  </Card>
                </SwiperSlide>
              )
            })}
          </Swiper>
          <div className="buttonIntroGroup d-flex justify-content-between align-items-center d-none d-md-flex"
            style={{
              width:"40vw",
              height:"100px",
              position:"absolute",
              bottom: -20,
              left:"30%",
            }}
          >
          <Button className="swiper-button-next position-absolute end-0" ></Button>
          <Button className="swiper-button-prev position-absolute start-0" ></Button>
        </div>
        <div className="buttonIntroGroup d-flex justify-content-between align-items-center d-md-none"
            style={{
              width:"90vw",
              height:"100px",
              position:"absolute",
              bottom: -20,
              left:"5%",
            }}
          >
          <Button className="swiper-button-next position-absolute end-0" ></Button>
          <Button className="swiper-button-prev position-absolute start-0" ></Button>
        </div>
        </div>
      </Container>
    )
}

export default Intro