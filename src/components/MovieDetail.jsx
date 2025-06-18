import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Container, Image, Button, Row, Col } from "react-bootstrap"
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import "../style/movieDetail.css"
import fallback from "../assets/fallback-image.png"
import AddRating from "./AddRating"
import { useAuth } from "/src/context/useAuth.js"; // Path relatif yang benar
import { toggleWatchlist, getUserAccount } from "/src/api/tmdb.js"; // Path relatif yang benar
import ReviewItem from './ReviewItem'; // Pastikan ini diimpor

// PERBAIKAN DI SINI: Gunakan URL HTTPS standar YouTube embed
const YOUTUBE_EMBED_BASE_URL = "https://www.youtube.com/embed/"; 

const MovieDetail = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [credits, setCredits] = useState([])
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [watchlistMessage, setWatchlistMessage] = useState("");
    const { sessionId } = useAuth();
    const [accountId, setAccountId] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [userRating, setUserRating] = useState(0);

    useEffect(() => {
        const fetchDetails = async () => {
            let accountDetails = null;

            try {
                if (sessionId) {
                    accountDetails = await getUserAccount(sessionId);
                    setAccountId(accountDetails.id);
                }

                const movieRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {
                        api_key: import.meta.env.VITE_TMDB_KEY,
                    }
                })
                setMovie(movieRes.data)

                const creditRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
                    params: {
                        api_key: import.meta.env.VITE_TMDB_KEY,
                    }
                })
                setCredits(creditRes.data.cast)

                // Fetch videos/trailers
                const videoRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
                    params: {
                        api_key: import.meta.env.VITE_TMDB_KEY,
                    }
                });
                const trailers = videoRes.data.results.filter(
                    (video) => video.site === "YouTube" && video.type === "Trailer"
                );
                if (trailers.length > 0) {
                    const officialTrailer = trailers.find(t => t.official) || trailers[0];
                    setTrailerKey(officialTrailer.key);
                }

                // Fetch reviews
                const reviewRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews`, {
                    params: {
                        api_key: import.meta.env.VITE_TMDB_KEY,
                    }
                });
                setReviews(reviewRes.data.results);


                if (sessionId && accountDetails?.id) {
                    // checkIfInWatchlist tidak lagi digunakan langsung di sini
                    // Status watchlist sudah diambil dari getMovieAccountStates
                    // const inWatchlist = await checkIfInWatchlist(parseInt(id), sessionId);
                    // setIsInWatchlist(inWatchlist);
                }

            } catch(error){
                console.error("Gagal fetch data, cek watchlist, atau ulasan:", error)
            }
        }
        fetchDetails()
    },[id, sessionId])

    const handleToggleWatchlist = async () => {
        if (!sessionId || !accountId) {
            setWatchlistMessage("Anda harus login untuk menambahkan ke watchlist.");
            return;
        }

        try {
            const success = await toggleWatchlist(parseInt(id), 'movie', !isInWatchlist, sessionId);
            if (success) {
                setIsInWatchlist(!isInWatchlist);
                setWatchlistMessage(isInWatchlist ? "Terhapus dari watchlist" : "Berhasil ditambahkan ke watchlist");
            } else {
                setWatchlistMessage("Gagal mengubah status watchlist.");
            }
        } catch (error) {
            console.error("Error toggling watchlist:", error);
            setWatchlistMessage("Terjadi kesalahan saat mengubah watchlist.");
        }
    };

    const handleRatingChange = (newRating) => {
        setUserRating(newRating);
    };

    const formatCurrency = (amount) => {
        if (!amount || amount === 0) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatRuntime = (minutes) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };


    if(!movie) return <div className="text-white text-center py-5">Loading...</div>

    return(
        <div className="container-detail text-white" style={{ position:"relative", overflowX: "hidden" }}>
                <div
                    className="detail-backdrop"
                    style={{
                        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%), url(${
                            movie.backdrop_path
                            ? `${import.meta.env.VITE_IMG_URL}/${movie.backdrop_path}`
                            : movie.poster_path
                                ? `${import.meta.env.VITE_IMG_URL}/${movie.poster_path}`
                                : fallback
                        })`,
                        backgroundSize:"cover",
                        backgroundPosition: "center",
                        position:"absolute",
                        top:"0",
                        left:"0",
                        width:"100%",
                        minHeight:"100%",
                        height: "auto",
                        filter:"brightness(0.5)",
                        zIndex:1,
                    }}
                ></div>

                <Container className="detail-wrapper py-5 px-3" style={{ zIndex:3, position:"relative", maxWidth: "1200px" }}>
                    <div className="text-center mb-5">
                        <h1 className="display-4 fw-bold">{movie.title}</h1>
                        {movie.tagline && <h4 className="text-white-50 fst-italic">{movie.tagline}</h4>}
                        {movie.vote_average > 0 && (
                            <p className="mt-3 fs-5">
                                <FaStar color="gold" className="me-2" />
                                {movie.vote_average.toFixed(1)} / 10
                                <span className="text-muted ms-2">({movie.vote_count} votes)</span>
                            </p>
                        )}
                    </div>

                    <Row className="mb-5 align-items-stretch">
                        <Col md={4} className="text-center mb-4 mb-md-0 d-flex justify-content-center align-items-start">
                            <Image
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : fallback}
                                alt={movie.title}
                                fluid
                                rounded
                                className="shadow-lg"
                                style={{ maxWidth: "300px", height: "auto" }}
                            />
                        </Col>

                        <Col md={8}>
                            <div className="p-4 rounded-3 mb-4 movie-info-card">
                                <h5>Overview:</h5>
                                <p className="lead">{movie.overview || "Tidak ada overview tersedia."}</p>
                            </div>

                            <div className="d-flex flex-wrap align-items-center gap-3 p-4 rounded-3 mb-4 movie-info-card">
                                <Button
                                    variant={isInWatchlist ? "danger" : "outline-light"}
                                    onClick={handleToggleWatchlist}
                                    className="d-flex align-items-center gap-2 px-3 py-2 fw-bold"
                                >
                                    {isInWatchlist ? <FaHeart /> : <FaRegHeart />}
                                    {isInWatchlist ? "Di Watchlist" : "Tambah Watchlist"}
                                </Button>
                                {watchlistMessage && <span className={`ms-2 small ${watchlistMessage.includes('berhasil') || watchlistMessage.includes('Terhapus') ? 'text-success' : 'text-warning'}`}>{watchlistMessage}</span>}
                                <div className="ms-md-auto">
                                    <AddRating movieId={movie.id} initialRating={userRating} onRated={handleRatingChange} />
                                </div>
                            </div>

                            <div className="p-4 rounded-3 mb-4 movie-info-card">
                                <Row>
                                    <Col md={6} className="mb-3 mb-md-0">
                                        <p className="mb-2"><strong>Tanggal Rilis:</strong> {movie.release_date || "N/A"}</p>
                                        <p className="mb-2"><strong>Runtime:</strong> {formatRuntime(movie.runtime)}</p>
                                        <p className="mb-2"><strong>Status:</strong> {movie.status || "N/A"}</p>
                                    </Col>
                                    <Col md={6}>
                                        <p className="mb-2">
                                            <strong>Genres: </strong>
                                            {movie.genres && movie.genres.map((genre, index) => (
                                                <span key = {genre.id}>
                                                    {genre.name}{index < movie.genres.length - 1 ? ', ': ''}
                                                </span>
                                            )) || "N/A"}
                                        </p>
                                        <p className="mb-2">
                                            <strong>Bahasa Asli:</strong> {movie.original_language?.toUpperCase() || "N/A"}
                                            {movie.spoken_languages && movie.spoken_languages.length > 0 &&
                                                ` (${movie.spoken_languages.map(lang => lang.name).join(', ')})`
                                            }
                                        </p>
                                        <p className="mb-2"><strong>Budget:</strong> {movie.budget > 0 ? formatCurrency(movie.budget) : "N/A"}</p>
                                        <p className="mb-2"><strong>Revenue:</strong> {movie.revenue > 0 ? formatCurrency(movie.revenue) : "N/A"}</p>
                                    </Col>
                                </Row>

                                {movie.production_companies && movie.production_companies.length > 0 && (
                                    <div className="mt-3 pt-3 border-top border-secondary">
                                        <strong>Produksi: </strong>
                                        {movie.production_companies.map((company, index) => (
                                            <span key={company.id}>{company.name}{index < movie.production_companies.length - 1 ? ', ' : ''}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>

                    {trailerKey && (
                        <div className="mt-5 p-4 rounded-3 movie-info-card text-center">
                            <h5 className="mb-4">Trailer:</h5>
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe
                                    className="embed-responsive-item"
                                    width="100%"
                                    height="500px"
                                    // PERBAIKAN DI SINI: Gunakan YOUTUBE_EMBED_BASE_URL
                                    src={`${YOUTUBE_EMBED_BASE_URL}${trailerKey}?autoplay=0&controls=1&modestbranding=1&rel=0`}
                                    title="Movie Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}


                    <div className="mt-5 p-4 rounded-3 movie-info-card">
                        <h5 className="mb-4">Pemeran Utama:</h5>
                        <Row xs={3} sm={4} md={5} lg={6} xl={7} className="g-3 justify-content-center">
                            {credits.slice(0, 14).map(actor => (
                                <Col key={actor.id} className="text-center">
                                    <Image
                                    src={
                                        actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                        : fallback
                                    }
                                    alt={actor.name}
                                    roundedCircle
                                    className="border border-secondary"
                                    style={{
                                        width:"80px",
                                        height:"80px",
                                        objectFit:"cover",
                                    }}
                                    ></Image>
                                    <p className="mt-2 mb-0" style={{fontSize:"0.9rem", wordWrap: "break-word"}}>
                                        <strong>{actor.name}</strong><br />
                                        {actor.character && actor.character.trim() !== '' && (
                                            <small className="text-white-50">({actor.character})</small>
                                        )}
                                    </p>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {reviews.length > 0 && (
                        <div className="mt-5 p-4 rounded-3 movie-info-card">
                            <h5 className="mb-4">Ulasan Pengguna ({reviews.length}):</h5>
                            {reviews.map(review => (
                                <ReviewItem key={review.id} review={review} />
                            ))}
                        </div>
                    )}
                </Container>
        </div>
    )
}

export default MovieDetail;