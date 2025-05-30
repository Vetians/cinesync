import "../style/landingPage.css"
import Intro from "./Intro";
import Trending from "./Trending";
import Upcoming from "./Upcoming";
import Footer from "./Footer"

const LandingPage = () => {

    return (
        <div>
            <div className="intro">
            <Intro />
            </div>
            <div className="trending">
            <Trending />
            </div>
            <div className="upcoming">
            <Upcoming />
            </div>
            {/* <div className="footer">
            <Footer/>
            </div> */}
        </div>
    )
}

export default LandingPage