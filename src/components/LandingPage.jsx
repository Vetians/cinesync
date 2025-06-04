import "../style/landingPage.css"
import Intro from "./Intro";
import Trending from "./Trending";
import Upcoming from "./Upcoming";
import NowPlaying from "./NowPlaying"
import TopRated from "./TopRated";

const LandingPage = () => {

    return (
        <div>
            <div className="intro">
            <Intro />
            </div>
            <div className="trending">
            <Trending />
            </div>
            <div className="nowplaying">
            <NowPlaying />
            </div>
            <div className="topRated">
                <TopRated />
            </div>
            <div className="upcoming">
            <Upcoming />
            </div>
        </div>
    )
}

export default LandingPage