
import {Card, Container, Row, Col, Navbar, Nav, Button} from "react-bootstrap"
import NavigationBar from "./NavigationBar"


const SearchPage = ({movies, searchQuery}) =>{

    // const [movies, setMovies] =  useState ([])
    // useEffect (() => {
    //     axios.get(`${import.meta.env.VITE_BASE_URL}/discover/movie`, {
    //         params: {
    //             api_key: import.meta.env.VITE_TMDB_KEY
    //     }
    // }).then((response) => {
    //     console.log("datas => ", response.data)
    //     setMovies(response.data.results)
    // })

    // }, [])

    return (
        <div>
            <div className="myBG mt-5">
            <Container>
                <br />
                <h1 className="text-white">Hasil Pencarian untuk: "{searchQuery}" </h1>
                <br />
                <div className="overflow-auto py-3">
                    <Row className="flex-nowrap gx-3">
                        {movies.map((results, index) => {
                            return (
                                <Col style={{ flex: "0 0 auto", width: "200px" }} className="movieWrapper" id="trending" key={index}>
                                    <Card className="movieImage">
                                        <Card.Img variant="top" src={`${import.meta.env.VITE_IMG_URL}/${results.poster_path}`} alt="Test" className="images"/>
                                            <div className="bg-dark">
                                                <div className="p-2 m-1 text-white">
                                                <Card.Title style={{ fontSize: "1rem" }} className="text-center">{results.title}</Card.Title>
                                                <Card.Text className="text-left overview">
                                                {results.overview}
                                                </Card.Text>
                                                <Card.Text className="text-left">{results.release_date}</Card.Text>
                                                </div>
                                            </div>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </Container>
        </div>
        </div>
    )
}

export default SearchPage
