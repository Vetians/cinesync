
import "../style/landingPage.css"
import NavigationBar from "./NavigationBar";
import Intro from "./Intro";
import Trending from "./Trending";
import Superhero from "./Superhero";

const LandingPage = () => {

    return (
        <div>
            <div className="myBG">
            <Intro />
            </div>
            <div className="trending">
            <Trending />
            </div>
            <div className='superhero' >
            <Superhero />
            </div>
        </div>
    )
}

export default LandingPage