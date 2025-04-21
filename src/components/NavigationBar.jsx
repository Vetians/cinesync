import { Navbar, Container, Nav, Button, NavItem } from "react-bootstrap"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { FaSearch } from "react-icons/fa";

export const NavigationBar = ({onSearchResult, onSearchQuery}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [query, setQuery] = useState("")
    const [isScrollingDown, setIsScrollingDown] = useState(false)
    const lastScroll = useRef(0)

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
        }else{
            onSearchResult([])
        }
    }

    const searchMovie = async (q) => {
        const search = await axios.get(`${import.meta.env.VITE_BASE_URL}/search/movie`, {
            params :{
                query: q,
                api_key: import.meta.env.VITE_TMDB_KEY
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
        if(currentScroll > lastScroll.current) {
            setIsScrollingDown(true)
        }else{
            setIsScrollingDown(false)
        }
        lastScroll.current = currentScroll
    }
    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div>
        <Navbar id="navbar" expand="md" bg="dark" variant="dark" className={`fixed-top px-3 py-2 transition-all ${isScrollingDown ?  "navbar-hidden" : "navbar-visible"}`}>
            <Container>
                <div className="containerTop d-flex text-nowrap justify-content-between align-items-center w-100 mb-1">
                    <div className="brandName fw-bold fs-4 text-white me-2">Cinesync</div>
                    <div className="searchGroup d-flex justify-content-end">
                        <div variant="dark" className = "d-flex justify-content-around gap-2 d-none d-md-flex">
                            <Nav className="d-flex flex-row w-100 justify-content-around">
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
                        <div className="containerBottom d-md-none">
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
        </div>
    )
}

export default NavigationBar