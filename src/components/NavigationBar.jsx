import { Navbar, Container, Nav, Button, NavItem } from "react-bootstrap"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { FaSearch } from "react-icons/fa";
import { RiHomeHeartFill } from "react-icons/ri";

const NavigationBar = ({onSearchResult, onSearchQuery, setCurrentPage, setTotalPages}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [query, setQuery] = useState("")
    const [isScrollingDown, setIsScrollingDown] = useState(false)
    const lastScroll = useRef(0)
    const [showBottomBackground, setShowBottomBackground] = useState(false)
    // const [totalPages, setTotalPages] = useState(1)

    const handleNavClick = (targetId) => {
        if (location.pathname !== "/"){
            navigate("/")
            setTimeout (() => {
                const element = document.getElementById(targetId)
                if (element) {
                    element.scrollIntoView({behavior: "smooth"})
                }
            },300)
        } else {
            const element = document.getElementById(targetId)
            if (element) {
                element.scrollIntoView({behavior: "smooth"})
            }
        }
    }

    const search = async() => {
        if(query.length > 3){
            const results = await searchMovie(query)
            onSearchResult(results.results)
            onSearchQuery(query)
            navigate("/search")
            setCurrentPage && setCurrentPage(1)
            setTotalPages && setTotalPages(results.total_pages)
        }else{
            onSearchResult([])
            setTotalPages && setTotalPages(1)
        }
    }

    const searchMovie = async (q) => {
        const search = await axios.get(`${import.meta.env.VITE_BASE_URL}/search/movie`, {
            params :{
                query: q,
                api_key: import.meta.env.VITE_TMDB_KEY,
            }
        })
        return search.data
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter"){
            search()
        }
    }

    const handleScroll = () => {
        const currentScroll = window.scrollY
        const intro = document.getElementById("intro")
        const introHeight = intro?.offsetHeight || 0
        if(currentScroll < 13){
            setIsScrollingDown(false)
        }else {
            if(currentScroll > lastScroll.current) {
                setIsScrollingDown(true)
            }else{
                setIsScrollingDown(false)
            }
        }
        lastScroll.current = currentScroll

        if (currentScroll > introHeight - 600) {
            setShowBottomBackground(true)
        } else {
            setShowBottomBackground(false)
        }
    }

    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div>
        <Navbar id="navbar" expand="md" bg="dark" variant="dark" className={`fixed-top px-3 pt-2 pb-1 transition-all ${isScrollingDown ?  "navbar-hidden" : "navbar-visible"}`}>
            <Container>
                <div className="containerTop d-flex text-nowrap justify-content-between align-items-center w-100 mb-1">
                    <Button variant="dark" className="brandName fw-bold fs-4 text-white me-2" onClick={() => {handleNavClick("intro")}}>Cinesync</Button>
                    <div className="searchGroup d-flex justify-content-end">
                        <div variant="dark" className = "d-flex justify-content-around gap-2 d-none d-md-flex">
                            <Nav className="d-flex flex-row w-100 justify-content-around">
                                {/* <NavItem>
                                    <Nav.Link onClick={() => {handleNavClick("intro")}}></Nav.Link>
                                </NavItem> */}
                                <NavItem>
                                    <Button variant = "outline-light" onClick={() =>  navigate("/genres")}>GENRES</Button>
                                </NavItem>
                                {/* <NavItem>
                                    <Nav.Link 
                                    onClick={() => {handleNavClick("trending")}}
                                        >
                                            Trending
                                    </Nav.Link>
                                </NavItem>
                                <NavItem>
                                    <Nav.Link onClick={() => {handleNavClick("upcoming")}}>Upcoming</Nav.Link>
                                </NavItem>       */}
                            </Nav>
                        </div>
                            <NavItem className="movieSearch d-flex align-items-center gap-2" >
                                        <input 
                                        placeholder="cari nama film" 
                                        className="form-control"
                                        onChange = {(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        />
                                    </NavItem>
                                    <NavItem>
                                        <Button variant = "outline-light" onClick={search}><FaSearch/></Button>
                                    </NavItem>
                    </div>
                </div>
            </Container>
        </Navbar>
                    <Navbar variant="dark">
                        <Container>
                        <div className={`containerBottom d-md-none ${showBottomBackground ? 'solid' : 'transparent'}`}>
                            <Nav variant="dark" className="d-flex flex-row w-100 justify-content-around">
                            <NavItem>
                                <Nav.Link onClick={() => {handleNavClick("intro")}}>Home</Nav.Link>
                            </NavItem>
                            <NavItem>
                                <Nav.Link 
                                onClick={() => {handleNavClick("trending")}}
                                >
                                        Trending
                                </Nav.Link>
                            </NavItem>
                            <NavItem>
                                <Nav.Link onClick={() => {handleNavClick("upcoming")}}>Upcoming</Nav.Link>
                            </NavItem> 
                            </Nav>
                        </div>
                        </Container>
                    </Navbar>
                    {/* <Button 
                    style={{
                        position:"absolute",
                        bottom:"20px",
                        zIndex:10
                    }}><RiHomeHeartFill  style={{fontSize:"25px"}}/></Button> */}
        </div>
    )
}

export default NavigationBar