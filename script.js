// Sayt açılan kimi tədbirləri yüklə
document.addEventListener("DOMContentLoaded", loadEvents);

// Tədbirləri serverdən oxuma funksiyası
async function loadEvents() {
  try {
    const response = await fetch("/api/events");
    const data = await response.json();

    const list = document.getElementById("event-list");
    list.innerHTML = "";

    if (data.events.length === 0) {
      list.innerHTML = "<p>Hələ tədbir yoxdur.</p>";
      return;
    }

    data.events.forEach(event => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h2>${event.title}</h2>
        <p><b>Tarix:</b> ${event.date}</p>
        <p>${event.description}</p>
      `;
      list.appendChild(div);
    });
  } catch (err) {
    console.error("Tədbirlər yüklənmədi:", err);
  }
}

// Yeni tədbir əlavə etmə funksiyası
async function addEvent() {
  const title = document.getElementById("title").value.trim();
  const date = document.getElementById("date").value.trim();
  const description = document.getElementById("desc").value.trim();

  if (!title || !date || !description) {
    alert("Bütün xanaları doldur!");
    return;
  }

  const newEvent = { title, date, description };

  try {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent)
    });

    const result = await res.json();
    alert(result.message);

    // Formu təmizlə
    document.getElementById("title").value = "";
    document.getElementById("date").value = "";
    document.getElementById("desc").value = "";

    // Yenidən tədbirləri yüklə
    loadEvents();
  } catch (err) {
    console.error("Tədbir əlavə edilərkən səhv baş verdi:", err);
  }
}
