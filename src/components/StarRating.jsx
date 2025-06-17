import { FaStar } from "react-icons/fa";
import { useState } from "react"; // Impor useState

const StarRating = ({ count = 0, onChange = null, max = 10 }) => {
  const [hoverCount, setHoverCount] = useState(0); // State baru untuk menyimpan nilai hover

  const stars = [];
  // Gunakan hoverCount jika ada, jika tidak, gunakan count (rating yang sudah dipilih)
  const displayCount = hoverCount || count;
  const roundedDisplayCount = Math.round(displayCount * 2) / 2; // bulatkan ke 0.5 terdekat

  const handleClick = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (onChange) { // Hanya aktifkan hover jika rating bisa diubah
      setHoverCount(value);
    }
  };

  const handleMouseLeave = () => {
    if (onChange) { // Hanya aktifkan hover jika rating bisa diubah
      setHoverCount(0); // Reset hoverCount saat mouse meninggalkan area bintang
    }
  };

  for (let i = 1; i <= max; i++) {
    let icon;
    let starColor = "gray"; // Warna default
    
    // Tentukan warna bintang berdasarkan displayCount (hover atau rating yang sudah ada)
    if (roundedDisplayCount >= i) {
      starColor = "gold"; // Bintang penuh
    } else if (roundedDisplayCount + 0.5 === i) {
      starColor = "goldenrod"; // Bintang setengah (untuk kasus 0.5)
    }

    // Menggunakan FaStar dengan warna yang ditentukan
    icon = (
      <FaStar 
        key={i} 
        color={starColor} 
        onClick={() => handleClick(i)} 
        // Untuk bintang setengah, kita mungkin perlu klip CSS jika ikon FaStar tidak mendukung setengah secara default
        // Namun, jika FaStar bisa diwarnai penuh, kita hanya perlu mengatur warnanya.
        // Untuk efek setengah visual, biasanya butuh dua ikon atau gradient/clip-path CSS.
        // FaStar sendiri tidak langsung mendukung setengah, jadi logika setengah bintang ini lebih untuk visualisasinya.
      />
    );
    
    // Untuk tampilan setengah bintang yang lebih akurat, kita perlu sedikit modifikasi:
    if (roundedDisplayCount + 0.5 === i && onChange) { // Hanya tampilkan setengah jika ada onChange (interaktif)
        // Ini adalah upaya untuk visualisasi setengah bintang.
        // Beberapa library ikon mungkin memiliki ikon setengah bintang (misal FaStarHalfAlt),
        // atau kita bisa menggunakan CSS clip-path seperti yang sudah Anda lakukan sebelumnya.
        icon = (
            <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                <FaStar color="gray" /> {/* Latar belakang abu-abu */}
                <FaStar color="gold" style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '50%', // Hanya separuh bagian kiri
                    overflow: 'hidden'
                }} /> {/* Bagian depan emas */}
            </span>
        );
    }


    stars.push(
      <span
        key={i}
        style={{ cursor: onChange ? "pointer" : "default", fontSize: "1.5rem", marginRight: "2px" }}
        onMouseEnter={() => handleMouseEnter(i)} // Event untuk hover
        onMouseLeave={handleMouseLeave} // Event saat mouse keluar
      >
        {icon}
      </span>
    );
  }

  return (
    <div 
      style={{ display: "flex" }} // Pastikan div pembungkus adalah flex agar bintang sejajar
      onMouseLeave={handleMouseLeave} // Event saat mouse meninggalkan seluruh container bintang
    >
      {stars}
    </div>
  );
};

export default StarRating;