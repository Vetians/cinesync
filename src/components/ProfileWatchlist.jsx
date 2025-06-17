import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { getWatchlistMovies } from "../api/tmdb";
import { Card, Container, Row, Col } from "react-bootstrap"; // Tambah Row, Col
import { Link } from "react-router-dom";
import logo_play from "../assets/logo_play.png";
import fallback from "../assets/fallback-image.png";

const ProfileWatchlist = () => {
  const { sessionId } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true); // Tambah state loading
  const [error, setError] = useState(null); // Tambah state error

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      if (!sessionId) {
        setError("Session ID tidak tersedia. Silakan login.");
        setLoading(false);
        return;
      }
      try {
        const data = await getWatchlistMovies(sessionId);
        setWatchlist(data);
        setLoading(false); // Set loading ke false setelah data diambil
      } catch (error) {
        console.error("Failed to fetch watchlist movies:", error);
        setError("Gagal mengambil daftar film watchlist."); // Set error message
        setLoading(false);
      }
    };

    if (sessionId) fetchWatchlistMovies();
  }, [sessionId]);

  if (loading) {
    return <div className="text-white text-center mt-5">Memuat film watchlist...</div>;
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  if (watchlist.length === 0) {
    return <div className="text-white text-center mt-5">Anda belum menambahkan film ke watchlist.</div>;
  }

  return (
    <div className="searchPagess d-flex pt-5"> {/* Menambahkan pt-5 untuk padding atas */}
      <Container>
        <br />
        <h1 className="text-white">Watchlist Film Kamu</h1>
        <br />
        {/* Menggunakan Row dan Col untuk layout grid yang responsif */}
        <Row className="justify-content-center align-items-stretch">
          {watchlist.map((movie) => (
            <Col key={movie.id} className="mb-4">
              {/* Memastikan div kartu film mengisi 100% tinggi Col */}
              <div
                className="movieWrapper-searchpage text-white"
                style={{
                  display: "flex",
                  width: "100%",
                  borderBottom: "1px solid #555f",
                  padding: "15px",
                  height: "100%", // Penting: Mengisi 100% tinggi Col
                  alignItems: "stretch", // Penting: Pastikan item kiri dan kanan meregang
                  backgroundColor: "#2e3a4e", // Tambahkan background agar konsisten dengan ProfileRated
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Tambah shadow
                  borderRadius: "8px", // Tambah border radius
                }}
              >
                {/* Bagian Kiri: Gambar dengan Efek Hover Ikon Play */}
                {/* Mengatur lebar poster menjadi 150px pada Card container */}
                <Card className="hover-card" style={{ flexShrink: 0, marginRight: "15px", width: "150px" }}>
                  <Link to={`/movie/${movie.id}`} className="card-link">
                    <div className="card-image-wrapper">
                      <Card.Img
                        src={
                          movie.poster_path
                            ? `${import.meta.env.VITE_IMG_URL}/${movie.poster_path}` // Gunakan VITE_IMG_URL
                            : fallback
                        }
                        className="card-image" // Penting: Gunakan kelas ini untuk CSS
                        // Hapus style inline width di sini
                      />
                      <div className="play-icon">
                        <img
                          src={logo_play}
                          alt="play-logo"
                          className="play-logo"
                        />
                      </div>
                    </div>
                  </Link>
                </Card>

                {/* Bagian Kanan: Detail Teks */}
                <div
                  className="bg-dark" // Kelas bg-dark dipertahankan
                  style={{
                    flex: "1", // Setara dengan flexGrow: 1
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="p-2 m-1 text-white">
                    <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                      {movie.title}
                    </div>
                    {/* Hapus kelas "overview" dan terapkan gaya inline */}
                    <p className="text-left text-white-50 small" style={{ // Mengubah div ke p, tambah kelas
                        flexGrow: 1, // Penting: Mengisi sisa ruang vertikal
                        overflowY: "auto", // Tambahkan scroll jika teks terlalu panjang
                        marginBottom: "0", // Hilangkan margin bawah default p
                    }}>
                      {movie.overview || "Tidak ada overview tersedia."}
                    </p>
                    <div className="text-left">Tanggal rilis: {movie.release_date || "N/A"}</div> {/* Tambah N/A */}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProfileWatchlist;