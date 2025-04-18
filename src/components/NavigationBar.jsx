import { Navbar, Container, Nav, Button, NavItem } from "react-bootstrap"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"

export const NavigationBar = ({onSearchResult, onSearchQuery}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [query, setQuery] = useState("")

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

    return (
        <div>
            
           <Navbar variant="dark" className = "bg-dark fixed-top">
                <Container>
                    <Navbar.Brand>MDB UKRIDA</Navbar.Brand>
                    <Nav className="justify-content-end">
                        <NavItem>
                            <Nav.Link onClick={() => {handleNavClick("intro")}}>Home</Nav.Link>
                        </NavItem>
                        <NavItem>
                            <Nav.Link onClick={() => {handleNavClick("trending")}}>Trending</Nav.Link>
                        </NavItem>
                        <NavItem>
                            <Nav.Link onClick={() => {handleNavClick("superhero")}}>Superhero</Nav.Link>
                        </NavItem>
                        <NavItem>
                            <input 
                            placeholder="cari nama film" 
                            className="movieSearch" 
                            onChange = {(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            />
                        </NavItem>
                        <NavItem>
                            <Button className = ""variant = "outline-light"onClick={search}>Search</Button>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar> 
        </div>
        
    )
}

export default NavigationBar