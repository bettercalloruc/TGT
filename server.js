// TGT Saytının server tərəfi
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Oruc üçün port 5000 olsun :)
const PORT = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// HTML, CSS, JS fayllarını public qovluğundan yükləyək
app.use(express.static("public"));

// Əlaqə formasından gələn məlumatları qəbul edirik
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Yeni mesaj gəldi:");
  console.log(`Ad: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Mesaj: ${message}`);

  // Burada gələcəkdə e-poçt göndərmə və ya bazaya yazma hissəsini əlavə edə bilərik
  res.json({ success: true, message: "Mesajınız uğurla göndərildi!" });
});

// Serveri işə salırıq
app.listen(PORT, () => {
  console.log(`✅ Server http://localhost:${PORT} ünvanında işləyir`);
});
