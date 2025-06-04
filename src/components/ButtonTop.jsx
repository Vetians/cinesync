import { Button } from "react-bootstrap";
import { RiHomeHeartFill } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";

const ButtonTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const hideTimer = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    const scrolledFarEnough = window.scrollY > 400;

    if (scrolledFarEnough) {
      setIsVisible(true);

      // Reset timer jika scroll lagi
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }

      // Mulai timer untuk menyembunyikan tombol setelah 3 detik tidak scroll
      hideTimer.current = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } else {
      setIsVisible(false);
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <Button
      onClick={scrollToTop}
      className={`buttonTop ${isVisible ? "show" : "hide"}`}
      style={{
        position: "fixed",
        bottom: "12px",
        right: "12px",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        backgroundColor: "#dc3545",
        border: "none",
        display: window.scrollY > 400 ? "flex" : "none", // hanya tampil saat scroll jauh
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        cursor: "pointer",
      }}
    >
      <RiHomeHeartFill style={{ fontSize: "20px", color: "white" }} />
    </Button>
  );
};

export default ButtonTop;
