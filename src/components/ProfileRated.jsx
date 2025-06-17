import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { Container, Image, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import fallback from "../assets/fallback-image.png";
import StarRating from "./StarRating";
import logo_play from "../assets/logo_play.png";

// Asumsikan landingPage.css sudah diimpor secara global di App.jsx

const ProfileRated = () => {
  const { sessionId } = useAuth();
  const [ratedMovies, setRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRatedMovies = async () => {
      if (!sessionId) {
        setError("Session ID tidak tersedia. Silakan login.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/account/{account_id}/rated/movies`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_KEY,
              session_id: sessionId,
              sort_by: "created_at.desc",
            },
          }
        );
        setRatedMovies(response.data.results);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching rated movies:", err);
        setError("Gagal mengambil daftar film yang dinilai.");
        setLoading(false);
      }
    };

    fetchRatedMovies();
  }, [sessionId]);

  if (loading) {
    return <div className="text-white text-center mt-5">Memuat film yang dinilai...</div>;
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  if (ratedMovies.length === 0) {
    return <div className="text-white text-center mt-5">Anda belum memberikan rating pada film apapun.</div>;
  }

  return (
    <Container fluid className="text-white mt-4">
      <h2 className="mb-4 text-center">Film yang Sudah Anda Nilai</h2>
      <Row className="justify-content-center align-items-stretch">
        {ratedMovies.map((movie) => (
          <Col key={movie.id} xs={12} sm={10} md={8} lg={6} className="mb-4">
            <div
              className="d-flex p-3 rounded"
              style={{
                backgroundColor: "#2e3a4e",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                height: "100%",
                alignItems: "stretch",
              }}
            >
              {/* Bagian Kiri: Gambar dengan Efek Hover Ikon Play */}
              <Card className="hover-card" style={{ flexShrink: 0, marginRight: "15px", width: "150px" }}>
                <Link to={`/movie/${movie.id}`} className="card-link">
                  <div className="card-image-wrapper">
                    <Card.Img
                      src={
                        movie.poster_path
                          ? `${import.meta.env.VITE_IMG_URL}/${movie.poster_path}`
                          : fallback
                      }
                      alt={movie.title}
                      className="card-image"
                    />
                    <div className="play-icon">
                      <img src={logo_play} alt="play-logo" className="play-logo" />
                    </div>
                  </div>
                </Link>
              </Card>

              {/* Bagian Kanan: Overview Teks */}
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>
                  <h4 className="mb-1">{movie.title}</h4>
                  <p className="text-muted mb-2">
                    Tanggal Rilis: {movie.release_date || "N/A"}
                  </p>
                  <p className="mb-2">
                    <small>Rating Anda: </small>
                    {/* HANYA HAPUS onChange={() => {}} DARI SINI */}
                    <StarRating count={movie.rating} max={10} step={0.5} />
                    <small> ({movie.rating}/10)</small>
                  </p>
                </div>

                <p className="text-white-50 small" style={{
                    flexGrow: 1,
                    overflowY: "auto",
                    marginBottom: "0",
                }}>
                  {movie.overview || "Tidak ada overview tersedia."}
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProfileRated;