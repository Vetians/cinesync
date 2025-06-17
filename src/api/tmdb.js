import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

let createSessionCallCount = 0;


export const redirectToTMDbLogin = (requestToken) => {
    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://cinesync-ruddy.vercel.app/callback`;
}

export const getRequestToken = async () => {
    const res = await fetch(`${BASE_URL}/authentication/token/new?api_key=${API_KEY}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.status_message || "Failed to get request token");
    return data.request_token;
}

export const createSession = async (requestToken) => {
    createSessionCallCount++;
    console.log(`createSession call #${createSessionCallCount} with token:`, requestToken);
    console.log("Creating session with token:", requestToken);
    const res = await fetch(`${BASE_URL}/authentication/session/new?api_key=${API_KEY}`, {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_token: requestToken }),
    });
    const data = await res.json();
    console.log("Response from createSession:", data);
    if (!res.ok) throw new Error(data.status_message || "Failed to create session");
    return data.session_id;
}


export const getUserAccount = async (sessionId) => {
    const res = await fetch(`${BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.status_message || "Failed to get user account");
    return data;
}

export const getRatedMovies = async (session_id) => {
  const account = await getUserAccount(session_id);
  const res = await axios.get(
    `${BASE_URL}/account/${account.id}/rated/movies?api_key=${API_KEY}&session_id=${session_id}`
  );
  return res.data.results;
};

export const getWatchlistMovies = async (sessionId, page = 1) => {
  const account = await getUserAccount(sessionId);
  const res = await axios.get(
    `${BASE_URL}/account/${account.id}/watchlist/movies`,
    {
      params: {
        api_key: API_KEY,
        session_id: sessionId,
        language: "en-US",
        sort_by: "created_at.desc",
        page: page,
      },
    }
  );
  return res.data.results;
};

export const toggleWatchlist = async (movieId, mediaType, addToList, sessionId) => {
    if (!sessionId) {
        throw new Error("Session ID tidak tersedia. Harap login.");
    }
    const account = await getUserAccount(sessionId);
    const accountId = account.id;

    const response = await axios.post(
        `${BASE_URL}/account/${accountId}/watchlist`,
        {
            media_type: mediaType,
            media_id: movieId,
            watchlist: addToList,
        },
        {
            params: {
                api_key: API_KEY,
                session_id: sessionId,
            },
        }
    );
    return response.data;
};

export const checkIfInWatchlist = async (movieId, sessionId) => {
    if (!sessionId) {
        return false;
    }
    try {
        const account = await getUserAccount(sessionId);
        const accountId = account.id;

        const response = await axios.get(`${BASE_URL}/account/${accountId}/watchlist/movies`, {
            params: {
                api_key: API_KEY,
                session_id: sessionId,
                language: 'en-US',
                page: 1,
            },
        });
        return response.data.results.some(item => item.id === movieId);
    } catch (error) {
        console.error("Error checking if movie is in watchlist:", error);
        return false;
    }
};

// Fungsi BARU: getMovieAccountStates - Untuk mendapatkan rating pribadi dan status watchlist/favorite pengguna
export const getMovieAccountStates = async (movieId, sessionId) => {
    if (!sessionId) {
        return null; // Tidak bisa mendapatkan status jika tidak login
    }
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/account_states`, {
            params: {
                api_key: API_KEY,
                session_id: sessionId,
            },
        });
        return response.data; // Mengembalikan { id, rated: { value: X }, watchlist: true/false, favorite: true/false }
    } catch (error) {
        console.error(`Error fetching account states for movie ${movieId}:`, error);
        return null;
    }
};

// Fungsi BARU: deleteMovieRating - Untuk menghapus rating film
export const deleteMovieRating = async (movieId, sessionId) => {
    if (!sessionId) {
        throw new Error("Anda harus login untuk menghapus rating.");
    }
    const response = await axios.delete(
        `${BASE_URL}/movie/${movieId}/rating`,
        {
            params: {
                api_key: API_KEY,
                session_id: sessionId,
            }
        }
    );
    return response.data;
};