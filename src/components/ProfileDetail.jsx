import { Container, Navbar } from "react-bootstrap"
import { useAuth } from "../context/useAuth"
import { Outlet, useParams, Link } from "react-router-dom"

const ProfileDetail = () => {
  const { user } = useAuth()
  const { username } = useParams()

  if (!user || user.username !== username) return <p>Anda belum Login</p>

  return (
    <Container style={{ paddingTop: "100px" }} className="text-white">
      <h2>Pengaturan Akun</h2>
      <div
        className="profile-account-container d-flex align-items-center text-white px-3"
        style={{ borderRadius: "10px" }}
      >
        <img
          src={
            user.avatar?.tmdb?.avatar_path
              ? `https://image.tmdb.org/t/p/w45${user.avatar.tmdb.avatar_path}`
              : user.avatar?.gravatar?.hash
              ? `https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}?s=45&d=identicon`
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.username
                )}&size=45`
          }
          alt="avatar"
          className="rounded-circle"
          style={{ width: "100px" }}
        />
        <h2 className="mx-3">{user.username}</h2>
      </div>
      <hr />
      <Navbar className="mt-3" variant="dark">
        <Link
          to={`/profile/${username}/rating`}
          className="me-3"
          style={{ color: "pink", textDecoration: "none" }}
        >
          Rating Saya
        </Link>
        <Link
          to={`/profile/${username}/watchlist`}
          className="me-3"
          style={{ color: "pink", textDecoration: "none" }}
        >
          Watchlist Saya
        </Link>
      </Navbar>
<div style={{
  paddingTop: "1rem",
  paddingBottom: "1rem"
}}>
  <div style={{
    height: "1px",
    backgroundColor: "white"
  }} />
</div>
      <Outlet />
    </Container>
  )
}

export default ProfileDetail
