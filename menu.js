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
// 2. FUNGSI BUKA / KUNCI MODUL (Lebih Fleksibel & Kuat)
// ============================================================
function setModuleStatus(moduleNum, isUnlocked, scoreVal) {
  // Ambil elemen kartu, navigasi atas, dan teks nilai
  const card = document.getElementById(`cardMateri${moduleNum}`);
  const nav = document.getElementById(`navMateri${moduleNum}`);
  const scoreSpan = document.getElementById(`score${moduleNum}`);

  // Cari tombol di dalam kartu secara otomatis (baik tag <a> maupun <button>)
  let btn = document.getElementById(`btnMateri${moduleNum}`);
  if (!btn && card) {
    btn = card.querySelector(".btn-module") || card.querySelector("a") || card.querySelector("button");
  }

  const hasScore = scoreVal !== undefined && scoreVal !== null && scoreVal !== "";

  if (isUnlocked) {
    // --- 1. BUKA KUNCI KARTU BAWAH ---
    if (card) {
      card.classList.remove("locked");
    }

    if (btn) {
      btn.setAttribute("href", `materi${moduleNum}.html`);
      btn.textContent = hasScore ? "Pelajari Ulang" : "Mulai Belajar";
      btn.style.pointerEvents = "auto";
      btn.style.cursor = "pointer";
    }

    if (scoreSpan) {
      scoreSpan.textContent = hasScore ? `${scoreVal}/100` : "Belum Dinilai";
    }

    // --- 2. BUKA KUNCI DROPDOWN ATAS ---
    if (nav) {
      nav.classList.remove("nav-locked");
      nav.setAttribute("href", `materi${moduleNum}.html`);
    }
  } else {
    // --- 1. KUNCI KARTU BAWAH ---
    if (card) {
      card.classList.add("locked");
    }

    if (btn) {
      btn.setAttribute("href", "javascript:void(0)");
      btn.textContent = "Materi Terkunci";
      btn.style.pointerEvents = "none";
    }

    if (scoreSpan) {
      scoreSpan.textContent = "Terkunci";
    }

    // --- 2. KUNCI DROPDOWN ATAS ---
    if (nav) {
      nav.classList.add("nav-locked");
      nav.setAttribute("href", "javascript:void(0)");
    }
  }
}

// ============================================================
// 3. PEMBACAAN PROGRESS DARI LOCALSTORAGE
// ============================================================
function populatePageData() {
  const userDataRaw = localStorage.getItem("loggedInUser");
  if (!userDataRaw) return;

  const userData = JSON.parse(userDataRaw);
  console.log("Data Siswa Saat Ini:", userData);

  // Tampilkan Nama Siswa
  const studentNameSpan = document.getElementById("studentName");
  if (studentNameSpan) {
    studentNameSpan.textContent = userData.nama || userData.username || "Siswa";
  }

  // Nilai masing-masing materi
  const n1 = userData.nilai_materi_1;
  const n2 = userData.nilai_materi_2;
  const n3 = userData.nilai_materi_3;
  const n4 = userData.nilai_materi_4;

  // Syarat Buka Kunci Berjenjang
  const isM1Done = n1 !== undefined && n1 !== null && n1 !== "";
  const isM2Done = n2 !== undefined && n2 !== null && n2 !== "";
  const isM3Done = n3 !== undefined && n3 !== null && n3 !== "";

  // Eksekusi Status Buka/Kunci
  setModuleStatus(1, true, n1); // Materi 1: Selalu Terbuka
  setModuleStatus(2, isM1Done, n2); // Materi 2: Buka jika M1 Selesai
  setModuleStatus(3, isM2Done, n3); // Materi 3: Buka jika M2 Selesai
  setModuleStatus(4, isM3Done, n4); // Materi 4: Buka jika M3 Selesai
}

// ============================================================
// 4. PERINGATAN KLIK PADA MENU TERKUNCI
// ============================================================
function initLockedWarning() {
  document.addEventListener("click", (e) => {
    const lockedNav = e.target.closest(".nav-locked");
    const lockedCard = e.target.closest(".module-card.locked");

    if (lockedNav || lockedCard) {
      e.preventDefault();
      alert("⚠️ Modul ini masih terkunci! Selesaikan kuis pada materi sebelumnya terlebih dahulu.");
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
