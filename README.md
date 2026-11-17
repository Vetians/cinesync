# Cinesync 🎬

Aplikasi web katalog film yang dibangun dengan **React + Vite** dan data dari **The Movie Database (TMDb) API**. Pengguna bisa menjelajahi film populer, mencari judul, melihat detail film (trailer, pemain, ulasan), serta login dengan akun TMDb untuk menyimpan **watchlist** dan memberi **rating** pribadi.

> Nama proyek di `package.json`: `mdb-ukrida` · Repo: [Vetians/cinesync](https://github.com/Vetians/cinesync) · Demo: [cinesync-ruddy.vercel.app](https://cinesync-ruddy.vercel.app)

---

## ✨ Fitur

| Fitur | Keterangan |
| --- | --- |
| **Landing page dinamis** | Hero *coverflow slider* berisi film populer, judul & overview ikut berubah mengikuti slide aktif. |
| **Trending** | Slider film trending harian (`/trending/movie/day`). |
| **Now Playing** | Film yang sedang tayang di bioskop. |
| **Top Rated** | Film dengan rating tertinggi sepanjang masa. |
| **Upcoming** | Film yang akan datang. |
| **Pencarian** | Cari film berdasarkan judul (minimal 4 karakter) dengan pagination. |
| **Genre** | Daftar genre + halaman film per genre (2 halaman API digabung per halaman UI). |
| **Detail film** | Poster, backdrop, tagline, overview, tanggal rilis, durasi, status, genre, bahasa, budget, revenue, rumah produksi, trailer YouTube, 14 pemeran utama, dan ulasan pengguna (dengan *read more*). |
| **Login TMDb** | Autentikasi resmi TMDb via *request token* → halaman otorisasi TMDb → callback. Sesi disimpan di `localStorage`. |
| **Watchlist** | Tambah/hapus film dari watchlist, plus halaman daftar watchlist di profil. |
| **Rating** | Beri/ubah/hapus rating bintang (skala 0.5-10) dan lihat daftar film yang sudah dinilai. |
| **Profil** | Halaman akun dengan avatar TMDb/Gravatar/UI-Avatars dan tab Rating & Watchlist. |
| **UI/UX** | Navbar auto-hide saat scroll, navbar bawah khusus mobile, tombol *back to top*, scroll reset antar halaman, desain responsif berbasis Bootstrap. |

---

## 🧰 Teknologi

- **React 19** + **Vite 6** (`@vitejs/plugin-react`)
- **React Router DOM 7**: routing SPA
- **React Bootstrap 5.3** + **Bootstrap 5**: komponen & grid
- **Swiper 11**: slider/coverflow (Trending, Now Playing, Top Rated, Upcoming, Intro)
- **Axios**: HTTP client ke TMDb
- **react-icons** + **lucide-react**: ikon
- **ESLint 9** (flat config) + `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- **pnpm** sebagai package manager (`pnpm-lock.yaml`)

---

## 🚀 Menjalankan Proyek

### Prasyarat

- Node.js 18+ (disarankan 20+)
- pnpm (atau npm/yarn)

### Langkah

```bash
# 1. Clone repositori
git clone https://github.com/Vetians/cinesync.git
cd cinesync

# 2. Install dependency
pnpm install

# 3. Siapkan environment variable (lihat bagian di bawah)
#    Buat file .env.local di root project

# 4. Jalankan dev server
pnpm dev
```

Dev server berjalan di `http://localhost:5173`.

### 🔑 Environment Variable

Buat file `.env.local` di root project:

```env
VITE_TMDB_KEY=your_tmdb_api_key
VITE_BASE_URL=https://api.themoviedb.org/3
VITE_IMG_URL=https://image.tmdb.org/t/p/w780
```

| Variabel | Fungsi |
| --- | --- |
| `VITE_TMDB_KEY` | API Key TMDb (v3). Dapatkan gratis di [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api). |
| `VITE_BASE_URL` | Base URL REST API TMDb. |
| `VITE_IMG_URL` | Base URL gambar poster/backdrop (ukuran `w780`). |

> ⚠️ **Keamanan:** file `.env` saat ini ikut ter-commit di repo. Sebaiknya rotasi API key di dashboard TMDb, hapus `.env` dari Git (`git rm --cached .env`), tambahkan `.env`/`.env.local` ke `.gitignore`, lalu gunakan `.env.local` untuk pengembangan.

---

## 📜 Scripts

| Perintah | Fungsi |
| --- | --- |
| `pnpm dev` | Jalankan Vite dev server (HMR). |
| `pnpm build` | Build produksi ke folder `dist/`. |
| `pnpm preview` | Preview hasil build secara lokal. |
| `pnpm lint` | Jalankan ESLint untuk seluruh project. |

---

## 🗺️ Routing

| Path | Komponen | Keterangan |
| --- | --- | --- |
| `/` | `LandingPage` | Intro + Trending + Now Playing + Top Rated + Upcoming. |
| `/search` | `SearchPage` | Hasil pencarian dengan pagination. |
| `/movie/:id` | `MovieDetail` | Detail film lengkap. |
| `/genres` | `GenreList` | Grid semua genre. |
| `/genre/:genreId` | `GenrePage` | Film berdasarkan genre + pagination. |
| `/callback` | `CallbackPage` | Menangani `request_token` dari TMDb setelah login. |
| `/profile/:username` | `ProfileDetail` | Halaman akun (butuh login). |
| `/profile/:username/rating` | `ProfileRated` | Film yang sudah diberi rating. |
| `/profile/:username/watchlist` | `ProfileWatchlist` | Daftar watchlist pengguna. |

---

## 📁 Struktur Project

```
MDB-UKRIDA/
├── index.html                 # Entry HTML (root #root)
├── package.json               # Dependency & scripts
├── vite.config.js             # Konfigurasi Vite
├── vercel.json                # Rewrite SPA (semua route → /index.html)
├── eslint.config.js           # ESLint flat config
├── public/
│   └── vite.svg
└── src/
    ├── main.jsx               # Bootstrap React, import Bootstrap CSS/JS
    ├── App.jsx                # Router, AuthProvider, layout & semua route
    ├── App.css                # Font Poppins
    ├── index.css              # (kosong)
    ├── api/
    │   └── tmdb.js            # Semua helper TMDb: auth, akun, watchlist, rating
    ├── context/
    │   ├── AuthContextStore.js# createContext untuk sesi & user
    │   ├── AuthProvider.jsx   # Simpan session_id + user di localStorage
    │   └── useAuth.js         # Hook useContext(AuthContext)
    ├── components/
    │   ├── NavigationBar.jsx     # Navbar, search bar, dropdown login/avatar
    │   ├── LandingPage.jsx       # Komposisi section di halaman utama
    │   ├── Intro.jsx             # Hero coverflow film populer
    │   ├── Trending.jsx          # Slider film trending harian
    │   ├── NowPlaying.jsx        # Slider film sedang tayang
    │   ├── TopRated.jsx          # Slider film rating tertinggi
    │   ├── Upcoming.jsx          # Slider film akan datang
    │   ├── SearchPage.jsx        # Halaman hasil pencarian
    │   ├── MovieDetail.jsx       # Halaman detail film
    │   ├── AddRating.jsx         # Form beri/hapus rating
    │   ├── StarRating.jsx        # Komponen bintang (mendukung 0.5)
    │   ├── ReviewItem.jsx        # Satu item ulasan + read more
    │   ├── GenreList.jsx         # Grid genre
    │   ├── GenrePage.jsx         # Film per genre
    │   ├── PaginationComponent.jsx # Pagination dengan ellipsis
    │   ├── CallbackPage.jsx      # Handler login callback TMDb
    │   ├── ProfileDetail.jsx     # Wrapper profil + tab (Outlet)
    │   ├── ProfileRated.jsx      # Daftar film yang dinilai
    │   ├── ProfileWatchlist.jsx  # Daftar watchlist
    │   ├── ScrollToTop.jsx       # Reset scroll saat path berubah
    │   ├── ButtonTop.jsx         # Tombol kembali ke atas (auto-hide)
    │   └── Footer.jsx            # Footer & copyright
    ├── assets/                # Logo, fallback poster, gambar footer
    └── style/
        ├── landingPage.css    # Styling landing, card, swiper, navbar, footer
        └── movieDetail.css    # Styling halaman detail film
```

---

## 🔐 Alur Autentikasi TMDb

1. Pengguna klik **Login/Register** di navbar → `GET /authentication/token/new` untuk mendapatkan `request_token`.
2. Browser diarahkan ke `https://www.themoviedb.org/authenticate/{request_token}?redirect_to={origin}/callback`.
3. Setelah menyetujui, TMDb kembali ke `/callback` dengan `?request_token=...`.
4. `CallbackPage` memanggil `POST /authentication/session/new` → mendapat `session_id`.
5. `GET /account` mengambil data user (username, avatar, id).
6. `login(sessionId, user)` menyimpan keduanya di `localStorage` melalui `AuthProvider`.
7. Logout menghapus data dari `localStorage` dan kembali ke `/`.

Semua request yang butuh sesi (watchlist, rating, account states) mengirim `session_id` sebagai query parameter.

---

## 🌐 Endpoint TMDb yang Digunakan

`/movie/popular`, `/trending/movie/day`, `/movie/now_playing`, `/movie/top_rated`, `/movie/upcoming`, `/search/movie`, `/genre/movie/list`, `/discover/movie`, `/movie/{id}`, `/movie/{id}/credits`, `/movie/{id}/videos`, `/movie/{id}/reviews`, `/movie/{id}/rating` (POST/DELETE), `/movie/{id}/account_states`, `/account`, `/account/{id}/rated/movies`, `/account/{id}/watchlist` (GET/POST), `/authentication/token/new`, `/authentication/session/new`.

---

## ☁️ Deployment

Proyek siap dideploy ke **Vercel**. File `vercel.json` sudah mengatur rewrite agar semua route diarahkan ke `/index.html`, sehingga React Router tidak menghasilkan 404 saat refresh.

- Build command: `pnpm build`
- Output directory: `dist`
- Environment variables: daftarkan `VITE_TMDB_KEY`, `VITE_BASE_URL`, `VITE_IMG_URL` di dashboard Vercel (jangan andalkan file `.env`).

Pastikan juga URL callback TMDb mengarah ke domain produksi (`https://<domain>/callback`). Saat ini redirect dibangun dinamis dari `window.location.origin`.

---

## 📝 Catatan & Rencana Perbaikan

- `ProfileRated.jsx` masih memakai URL literal `/account/{account_id}/rated/movies` (placeholder belum diganti). Sebaiknya gunakan helper `getRatedMovies()` yang sudah ada di `src/api/tmdb.js`.
- `redirectToTMDbLogin()` di `src/api/tmdb.js` masih hardcode ke `https://cinesync-ruddy.vercel.app/callback`; `NavigationBar` memakai pendekatannya sendiri (`window.location.origin`). Sebaiknya disatukan.
- `MovieDetail.jsx` belum memanggil `getMovieAccountStates()`, sehingga status watchlist dan rating yang sudah tersimpan tidak dimuat ulang saat halaman di-refresh.
- Beberapa import tidak terpakai (`FaPlay`, `Link`, `Pagination`, `ScrollToTop`) sehingga `pnpm lint` memunculkan warning/error `no-unused-vars`.
- `GenrePage` menggabungkan dua halaman API sekaligus; `totalPages` dihitung dengan `Math.floor(total_pages / 2)`, sehingga bisa kurang akurat untuk jumlah halaman ganjil.
- Belum ada state loading/error yang konsisten di semua halaman (saat ini hanya `MovieDetail`, `ProfileRated`, dan `ProfileWatchlist`).

---

## 👤 Kredit

- Data film, gambar, dan autentikasi: [The Movie Database (TMDb)](https://www.themoviedb.org/). Proyek ini tidak disponsori atau disertifikasi oleh TMDb.
- Dibuat untuk keperluan pembelajaran, **MDB-UKRIDA**.
