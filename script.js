// ============================================================
// 1. KONFIGURASI - GANTI INI DENGAN URL WEB APP GAS BARU ANDA
// ============================================================
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwQFfhpIGDJwAwcVJmKgJ8ADPbzyWVQVtBXNzaA_ZfuCLWHCn8Jf-S3duQhQkSkIq3Q/exec";

const loginForm = document.getElementById("loginForm");
const alertMsg = document.getElementById("alertMsg");
const submitBtn = document.querySelector(".btn-submit");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

// --- Fitur Show/Hide Password (Tetap Sama) ---
if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    togglePassword.classList.toggle("fa-eye"); // Ganti ikon mata terbuka
    togglePassword.classList.toggle("fa-eye-slash"); // Ganti ikon mata tertutup
  });
}

// --- Penanganan Submit Form ke Google Sheets (Pembaruan Tuntas) ---
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = document.getElementById("username").value.trim();
  const pass = passwordInput.value.trim();

  // Reset pesan status
  alertMsg.className = "alert-msg";
  alertMsg.style.display = "block";
  alertMsg.style.color = "#0077c8"; // Warna biru loading
  alertMsg.textContent = "Memeriksa data...";
  submitBtn.disabled = true;
  submitBtn.textContent = "Memproses...";

  // Menyusun URL Panggilan Fetch GET dengan parameter encodeURIComponent
  const urlParams = "?username=" + encodeURIComponent(user) + "&password=" + encodeURIComponent(pass);
  const finalUrl = SCRIPT_URL + urlParams;

  // Melakukan panggilan Fetch (GET) ke Google Apps Script
  fetch(finalUrl)
    .then((response) => response.json()) // Membaca respons sebagai JSON, bukan Text
    .then((result) => {
      console.log("Respons dari GAS:", result); // Debugging di Console (F12)

      if (result.status === "success") {
        // Login Berhasil
        alertMsg.className = "alert-msg success";
        alertMsg.textContent = `Selamat datang, ${result.data.nama || result.data.username}!`;

        // SIMPAN DATA SISWA (Nama & Nilai) ke memori lokal browser
        localStorage.setItem("loggedInUser", JSON.stringify(result.data));

        setTimeout(() => {
          // Arahkan ke halaman menu utama (Pastikan file menu.html ada)
          window.location.href = "menu.html";
        }, 1500);
      } else {
        // Login Gagal (dikirim oleh GAS)
        alertMsg.className = "alert-msg error";
        alertMsg.textContent = result.message;
      }
    })
    .catch((error) => {
      // Terjadi kesalahan koneksi teknis
      alertMsg.className = "alert-msg error";
      alertMsg.textContent = "Terjadi kesalahan koneksi. Silakan coba lagi.";
      console.error("Login error:", error);
    })
    .finally(() => {
      // Kembalikan status tombol
      submitBtn.disabled = false;
      submitBtn.textContent = "Masuk & Belajar AI";
    });
});
