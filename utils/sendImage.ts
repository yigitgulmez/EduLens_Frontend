export const sendImage = async (base64Image: string) => {
  try {
    const res = await fetch("https://dpdfk76v-8001.euw.devtunnels.ms/ws/rollcall", {
      method: "GET",
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
