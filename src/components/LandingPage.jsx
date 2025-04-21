
import "../style/landingPage.css"
import NavigationBar from "./NavigationBar";
import Intro from "./Intro";
import Trending from "./Trending";
import Superhero from "./Superhero";
import Upcoming from "./Upcoming";

const LandingPage = () => {

    return (
        <div>
            <div className="intro">
            <Intro />
            </div>
            <div className="trending">
            <Trending />
            </div>
            {/* <div className='superhero' >
            <Superhero />
            </div> */}
            <div className="upcoming">
            <Upcoming />
            </div>
        </div>
    )
}

export default LandingPage