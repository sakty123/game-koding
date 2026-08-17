// ============================================================
// 1. AUTENTIKASI PENGGUNA
// ============================================================
function checkAuth() {
  const userData = localStorage.getItem("loggedInUser");
  if (!userData) {
    window.location.href = "index.html";
  }
}

// ============================================================
// 2. HELPER BUKA/KUNCI MODUL
// ============================================================
function setModuleStatus(moduleNum, isUnlocked, scoreVal) {
  const card = document.getElementById(`cardMateri${moduleNum}`);
  const btn = document.getElementById(`btnMateri${moduleNum}`);
  const nav = document.getElementById(`navMateri${moduleNum}`);
  const scoreSpan = document.getElementById(`score${moduleNum}`);

  const hasScore = scoreVal !== undefined && scoreVal !== null && scoreVal !== "";

  if (isUnlocked) {
    // --- Buka Kunci Kartu Bawah ---
    if (card) card.classList.remove("locked");
    if (btn) {
      btn.setAttribute("href", `materi${moduleNum}.html`);
      btn.textContent = hasScore ? "Pelajari Ulang" : "Mulai Belajar";
    }
    if (scoreSpan) {
      scoreSpan.textContent = hasScore ? `${scoreVal}/100` : "Belum Dinilai";
    }

    // --- Buka Kunci Navigasi Dropdown Atas ---
    if (nav) {
      nav.classList.remove("nav-locked");
      nav.setAttribute("href", `materi${moduleNum}.html`);
    }
  } else {
    // --- Kunci Kartu Bawah ---
    if (card) card.classList.add("locked");
    if (btn) {
      btn.setAttribute("href", "javascript:void(0)");
      btn.textContent = "Materi Terkunci";
    }
    if (scoreSpan) {
      scoreSpan.textContent = "Terkunci";
    }

    // --- Kunci Navigasi Dropdown Atas ---
    if (nav) {
      nav.classList.add("nav-locked");
      nav.setAttribute("href", "javascript:void(0)");
    }
  }
}

// ============================================================
// 3. PENGISIAN DATA & LOGIKA PROGRES BERJENJANG
// ============================================================
function populatePageData() {
  const userDataRaw = localStorage.getItem("loggedInUser");
  if (!userDataRaw) return;

  const userData = JSON.parse(userDataRaw);

  // Tampilkan Nama Siswa
  const studentNameSpan = document.getElementById("studentName");
  if (studentNameSpan) {
    studentNameSpan.textContent = userData.nama || userData.username || "Siswa";
  }

  // Cek Status Pengerjaan Tiap Materi
  const n1 = userData.nilai_materi_1;
  const n2 = userData.nilai_materi_2;
  const n3 = userData.nilai_materi_3;
  const n4 = userData.nilai_materi_4;

  const isM1Done = n1 !== undefined && n1 !== null && n1 !== "";
  const isM2Done = n2 !== undefined && n2 !== null && n2 !== "";
  const isM3Done = n3 !== undefined && n3 !== null && n3 !== "";

  // Materi 1: Selalu Terbuka
  setModuleStatus(1, true, n1);

  // Materi 2: Terbuka jika Materi 1 Selesai
  setModuleStatus(2, isM1Done, n2);

  // Materi 3: Terbuka jika Materi 2 Selesai
  setModuleStatus(3, isM2Done, n3);

  // Materi 4: Terbuka jika Materi 3 Selesai
  setModuleStatus(4, isM3Done, n4);
}

// ============================================================
// 4. PENANGANAN KLIK PADA MENU TERKUNCI
// ============================================================
function initLockedWarning() {
  document.addEventListener("click", (e) => {
    const lockedTarget = e.target.closest(".nav-locked");
    if (lockedTarget) {
      e.preventDefault();
      alert("⚠️ Modul ini masih terkunci! Selesaikan kuis pada materi sebelumnya untuk membuka modul ini.");
    }
  });
}

// ============================================================
// 5. LOGOUT
// ============================================================
function performLogout(e) {
  if (e) e.preventDefault();
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// ============================================================
// 6. INISIALISASI
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  populatePageData();
  initLockedWarning();

  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", performLogout);
  }
});
