import { useState } from "react";
import styles from "../styles/Home.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!url.trim()) return alert("Masukkan link TikTok terlebih dahulu.");
    setLoading(true);
    setVideo(null);

    try {
      const res = await fetch(`/api/tiktok?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (data.error) {
        alert("Gagal mengambil video.");
      } else {
        setVideo(data);
      }
    } catch (err) {
      alert("Terjadi kesalahan server.");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.card}
      >
        <h1 className={styles.title}>🎬 TikTok Downloader</h1>
        <p className={styles.desc}>Tempel link TikTok untuk unduh tanpa watermark</p>

        <input
          type="text"
          placeholder="https://www.tiktok.com/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.input}
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          disabled={loading}
          className={styles.button}
        >
          {loading ? "⏳ Memproses..." : "⬇️ Download Video"}
        </motion.button>

        <AnimatePresence>
          {video && (
            <motion.div
              className={styles.result}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <img src={video.cover} alt="Thumbnail" className={styles.image} />
              <p><strong>{video.title}</strong></p>
              <a href={video.nowatermark} download="tiktok.mp4">
                <motion.button whileTap={{ scale: 0.95 }} className={styles.downloadBtn}>
                  Simpan ke Galeri
                </motion.button>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <footer className={styles.footer}>
        <p>by <strong>Muhammad Reza</strong></p>
        <div className={styles.socials}>
          <a href="https://www.instagram.com/kiareza23?igsh=aHM4d3FmbHlnaXV6" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.facebook.com/share/1C61Tf65Xq/" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </footer>
    </div>
  );
}
