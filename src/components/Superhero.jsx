import {Card, Container, Row, Col, Image} from "react-bootstrap"
import thorImage from "../assets/bg/thor.jpg"
import hulk from "../assets/bg/Hulk.jpg"
import blackPanther from "../assets/bg/blackpanther.jpeg"
import ironMan from "../assets/bg/ironman.jpeg"
import spiderMan from "../assets/bg/spiderman.jpg"
import captainMarvel from "../assets/bg/captainmarvel.jpg"

const Superhero = () => {
    return (
        <div>
            <Container>
                <br />
                <h1 className="text-white">SUPERHERO MOVIES</h1>
                <br />
                <Row>
                    <Col md={4} className="movieWrapper" id="superhero">
                        <Card className="movieImage">
                            <Image src={thorImage} alt="Thor Movie" className="images"/>
                                <div className="bg-dark">
                                    <div className="p-2 m-1 text-white">
                                    <Card.Title className="text-center">THOR</Card.Title>
                                    <Card.Text className="text-left">
                                    This is a wider card with natural lead-into additional content.
                                    </Card.Text>
                                    <Card.Text className="text-left">Last updated 3 mins ago</Card.Text>
                                    </div>
                                </div>
                        </Card>
                    </Col>
                    <Col md={4} className="movieWrapper">
                        <Card className="movieImage">
                            <Image src={hulk} alt="hulk Movie" className="images"/>
                                <div className="bg-dark">
                                    <div className="p-2 m-1 text-white">
                                    <Card.Title className="text-center">THOR</Card.Title>
                                    <Card.Text className="text-left">
                                    This is a wider card with natural lead-into additional content.
                                    </Card.Text>
                                    <Card.Text className="text-left">Last updated 3 mins ago</Card.Text>
                                    </div>
                                </div>
                        </Card>
                    </Col>
                    <Col md={4} className="movieWrapper">
                        <Card className="movieImage">
                            <Image src={captainMarvel} alt="Captain Marvel Movie" className="images"/>
                                <div className="bg-dark">
                                    <div className="p-2 m-1 text-white">
                                    <Card.Title className="text-center">THOR</Card.Title>
                                    <Card.Text className="text-left">
                                    This is a wider card with natural lead-into additional content.
                                    </Card.Text>
                                    <Card.Text className="text-left">Last updated 3 mins ago</Card.Text>
                                    </div>
                                </div>
                        </Card>
                    </Col>
                    <Col md={4} className="movieWrapper">
                        <Card className="movieImage">
                            <Image src={ironMan} alt="Iron Man Movie" className="images"/>
                                <div className="bg-dark">
                                    <div className="p-2 m-1 text-white">
                                    <Card.Title className="text-center">THOR</Card.Title>
                                    <Card.Text className="text-left">
                                    This is a wider card with natural lead-into additional content.
                                    </Card.Text>
                                    <Card.Text className="text-left">Last updated 3 mins ago</Card.Text>
                                    </div>
                                </div>
                        </Card>
                    </Col>
                    <Col md={4} className="movieWrapper">
                        <Card className="movieImage">
                            <Image src={blackPanther} alt="Black Panther Movie" className="images"/>
                                <div className="bg-dark">
                                    <div className="p-2 m-1 text-white">
                                    <Card.Title className="text-center">THOR</Card.Title>
                                    <Card.Text className="text-left">
                                    This is a wider card with natural lead-into additional content.
                                    </Card.Text>
                                    <Card.Text className="text-left">Last updated 3 mins ago</Card.Text>
                                    </div>
                                </div>
                        </Card>
                    </Col>
                    <Col md={4} className="movieWrapper">
                        <Card className="movieImage">
                            <Image src={spiderMan} alt="SpiderMan Movie" className="images"/>
                                <div className="bg-dark">
                                    <div className="p-2 m-1 text-white">
                                    <Card.Title className="text-center">THOR</Card.Title>
                                    <Card.Text className="text-left">
                                    This is a wider card with natural lead-into additional content.
                                    </Card.Text>
                                    <Card.Text className="text-left">Last updated 3 mins ago</Card.Text>
                                    </div>
                                </div>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default Superhero