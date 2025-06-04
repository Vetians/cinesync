import {Container, Card, Button} from "react-bootstrap"
import axios from "axios"
import { useState, useEffect } from "react"
import { Swiper,SwiperSlide } from "swiper/react"
import { Link } from 'react-router-dom'
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules"
import logo_play from "../assets/logo_play.png"


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
          <div className="desktopOverviewIntro d-none d-md-flex">
            <div className="introTitle text-white"
            style={{
              display:"flex",
              // backgroundColor:"red",
              height:"75%",
              width:"25%",
              position:"absolute",
              left:"0px",
              top:"0",
              paddingTop:"100px",
              paddingLeft:"50px",
              paddingRight:"20px",
              flexDirection:"column"
            }}
            >
              {activeSlide &&(<h3>{activeSlide.title}</h3>)}
              {activeSlide &&(<p>{activeSlide.overview}</p>)}
              <br />
              {activeSlide &&(<p>{activeSlide.release_date}</p>)}
            </div>
          </div>

          <div className="desktopBackdrop d-none d-md-flex">
          {activeSlide && (
            <div 
            className="intro-backdrop"
            style={{
              backgroundImage:`linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 20%), linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 20%), url(${import.meta.env.VITE_IMG_URL}/${activeSlide.backdrop_path})`,
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

          <div className="mobileOverviewIntro text-white d-md-none"
          style={{
            display:"flex",
            position:"absolute",
            height:"20vw",
            width:"100vw",
            top:"30px",
            marginTop:"20px",
            paddingTop:"160px",
            paddingBottom:"50px",
            paddingRight:"10px",
            paddingLeft:"10px",
            justifyContent:"start",
            textAlign:"left",
            alignItems:"start",
            overflowY:"auto",
            zIndex:10
          }}
          >
            <div className="textWrapperMobile" 
            style={{
              position:"absolute",
              top:"0px"
            }}>
            {activeSlide && (<h3>{activeSlide.title}</h3>)}
            </div>
            {/* {activeSlide &&(<p>{activeSlide.overview}</p>)} */}
          </div>

          <div className="mobileBackdrop d-md-none">
          {activeSlide && (
            <div 
            className="intro-backdrop"
            style={{
              backgroundImage:`linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 20%), linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 10%), url(${import.meta.env.VITE_IMG_URL}/${activeSlide.backdrop_path})`,
              position:"absolute",
              top:"13%",
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
                  <Card className="hover-card">
                    <Link to={`/movie/${results.id}`} className="card-link">
                    <div className="card-image-wrapper">
                        <Card.Img 
                        src={`${import.meta.env.VITE_IMG_URL}/${results.poster_path}`} 
                        alt="test gagal"
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
          {/* DESKTOP */}
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
        {/* MOBILE */}
        <div className="buttonIntroGroup d-flex justify-content-between align-items-center d-md-none"
            style={{
              width:"100vw",
              height:"100px",
              position:"absolute",
              top:"130px",
              left:"0",
            }}
          >
          <Button className="swiper-button-next position-absolute end-0"></Button>
          <Button className="swiper-button-prev position-absolute start-0"></Button>
        </div>
        </div>
      </Container>
    )
}

export default Intro