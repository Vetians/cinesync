import { useState, useEffect } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import { useAuth } from "../context/useAuth";
// Impor deleteMovieRating
import { deleteMovieRating } from "../api/tmdb"; // Pastikan path ini benar jika berbeda

// Tambahkan initialRating dan onRated sebagai prop
const AddRating = ({ movieId, initialRating = 0, onRated }) => {
  const { sessionId } = useAuth();
  const [rating, setRating] = useState(initialRating); // Inisialisasi dengan initialRating
  const [message, setMessage] = useState(""); // Untuk pesan sukses/error
  const [isError, setIsError] = useState(false); // Untuk status error

  // Update rating state jika initialRating berubah dari parent (misal setelah login/logout)
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);


  const handleRate = async () => {
    if (!sessionId) {
      setMessage("Kamu harus login dulu untuk memberikan rating.");
      setIsError(true);
      return;
    }

    if (rating < 0.5 || rating > 10) {
      setMessage("Rating harus antara 0.5 dan 10.");
      setIsError(true);
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/movie/${movieId}/rating`,
        { value: rating },
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_KEY,
            session_id: sessionId,
          },
        }
      );
      setMessage("Berhasil memberi rating!");
      setIsError(false);
      onRated?.(rating); // Callback ke parent dengan rating baru
    } catch (err) {
      setMessage("Gagal mengirim rating.");
      setIsError(true);
      console.error(err);
    }
  };

  const handleDeleteRating = async () => {
    if (!sessionId) {
      setMessage("Kamu harus login dulu untuk menghapus rating.");
      setIsError(true);
      return;
    }

    try {
      await deleteMovieRating(movieId, sessionId); // Panggil fungsi delete
      setMessage("Rating berhasil dihapus.");
      setRating(0); // Reset rating ke 0
      setIsError(false);
      onRated?.(0); // Callback ke parent bahwa rating dihapus (0)
    } catch (err) {
      setMessage("Gagal menghapus rating.");
      setIsError(true);
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <h5 className="text-white">Beri Rating:</h5>
      <StarRating count={rating} onChange={setRating} />
      <div className="d-flex align-items-center gap-2 mt-2">
        <button onClick={handleRate} className="btn btn-outline-warning">
          {initialRating > 0 ? "Ubah Rating" : "Kirim Rating"} {/* Teks tombol dinamis */}
        </button>
        {rating > 0 && sessionId && ( // Tampilkan tombol delete jika ada rating dan sudah login
          <button onClick={handleDeleteRating} className="btn btn-outline-danger">
            Hapus Rating
          </button>
        )}
      </div>
      {message && (
        <p className={`mt-2 ${isError ? "text-danger" : "text-success"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AddRating;