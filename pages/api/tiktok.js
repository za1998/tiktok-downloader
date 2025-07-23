export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "No TikTok URL provided" });
  }

  try {
    const apiUrl = `https://tikwm.com/api?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data || !data.data || !data.data.play) {
      return res.status(500).json({ error: "Failed to retrieve video" });
    }

    return res.status(200).json({
      title: data.data.title,
      cover: data.data.cover,
      nowatermark: data.data.play
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error", detail: error.message });
  }
}
