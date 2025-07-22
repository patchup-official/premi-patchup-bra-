
const form = document.getElementById("prizeForm");
const popup = document.getElementById("popup");
const premioText = document.getElementById("premio");
const closeBtn = document.querySelector(".close-popup");

const SHEETDB_API = "https://sheetdb.io/api/v1/bcqkmr35ns2mg";
const premiDisponibili = [
  "BUONO SCONTO 10€",
  "VETRINO IN OMAGGIO",
  "ACCESSORIO A SORPRESA",
  "CAVO OMAGGIO",
  "CARICATORE SCONTATO"
];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const telefono = document.getElementById("phone").value.trim();

  if (!nome || !email || !telefono) {
    alert("Compila tutti i campi!");
    return;
  }

  try {
    const res = await fetch(`${SHEETDB_API}/search_or?nome=${nome}&email=${email}&telefono=${telefono}`);
    const data = await res.json();

    if (data.length > 0) {
      alert("Hai già partecipato! Ogni persona può partecipare una sola volta.");
      return;
    }

    const premio = premiDisponibili[Math.floor(Math.random() * premiDisponibili.length)];
    premioText.innerText = premio;
    popup.classList.remove("hidden");

    await fetch(SHEETDB_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: [{
          nome: nome,
          email: email,
          telefono: telefono,
          premio: premio
        }]
      })
    });

  } catch (error) {
    alert("Errore durante la registrazione. Riprova.");
    console.error(error);
  }
});

closeBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});
