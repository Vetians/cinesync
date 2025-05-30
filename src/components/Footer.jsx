import { Container, Image } from "react-bootstrap"
import logo from "../assets/CV.png"


const Footer = () => {
    return (
        <Container fluid>
            <div className="d-flex justify-content-around footer-wrap">
            <div className="brandOverview">
                <div style={{
                    display:"flex",
                    flexDirection:"column",
                }}>
                <Image src = {logo} className="logoFooter"></Image>
                <h2 className="nama-logo text-white">Cinesync</h2>
                </div>
            </div>
            <div className="linkFooter d-flex">
                <div className="menu-footer1">
                <ul style={{
                    listStyle:"none",
                }}>
                    <li><div className="py-2"><a href="" style={{color:"pink", textDecoration:"none"}}>About Us</a></div></li>
                    <li><div className="py-2"><a href="" style={{color:"pink", textDecoration:"none"}}>Instagram</a></div></li>
                    <li><div className="py-2"><a href="" style={{color:"pink", textDecoration:"none"}}>Telegram</a></div></li>
                    <li><div className="py-2"><a href="" style={{color:"pink", textDecoration:"none"}}>Discord</a></div></li>
                    <li><div className="py-2"><a href="" style={{color:"pink", textDecoration:"none"}}>FAQ</a></div></li>
                </ul>
                </div>
            </div>
            </div>
            <div className="copyright-footer">
                Copyright &copy; 2025 MDB-UKRIDA. All rights reserved.
            </div>
        </Container>
    )
}

export default Footer




