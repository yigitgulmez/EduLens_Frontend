export const sendImage = async (base64Image: string) => {
  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64Image }),
    });

    if (!res.ok) {
      throw new Error("API yanıtı başarısız");
    }
  } catch (err) {
    console.error("Görsel gönderilirken hata oluştu:", err);
  }
};
