// Autentikasi Pengguna
const userDataRaw = localStorage.getItem("loggedInUser");
if (!userDataRaw) {
  window.location.href = "index.html";
}

const userData = JSON.parse(userDataRaw);
document.getElementById("studentName").textContent = userData.nama || userData.username || "Siswa";

// Uji Sikap Dilema Interaktif
function checkDilemma(choice) {
  const fb = document.getElementById("dilemmaFeedback");
  fb.style.display = "block";

  if (choice === 2) {
    fb.style.background = "#e8f5e9";
    fb.style.color = "#2e7d32";
    fb.innerHTML = "✅ <strong>Pilihan Tepat!</strong> Menggunakan AI sebagai pemantik inspirasi lalu mengolahnya dengan kata-kata sendiri menjunjung tinggi prinsip kejujuran, integritas akademik, dan kreativitas mandiri.";
  } else {
    fb.style.background = "#ffebee";
    fb.style.color = "#c62828";
    fb.innerHTML = "❌ <strong>Kurang Tepat.</strong> Mengakui karya AI murni sebagai buatan sendiri melanggar prinsip transparansi dan kejujuran akademik. Jadikan AI sebagai asisten inspirasi, bukan pengganti pikiranmu.";
  }
}

// Kunci Jawaban Kuis Materi 3 (5 Soal @ 20 Poin = 100 Poin)
const correctAnswersMateri3 = {
  q1: "A", // Mengetahui dasar pengambilan keputusan
  q2: "B", // Kroscek & cari sudut pandang lain
  q3: "B", // Keputusan tidak adil karena data bias
  q4: "A", // Data tersimpan & berisiko disalahgunakan
  q5: "B", // Robot pintar pemilah sampah
};

// Penanganan Submit Kuis & Simpan ke nilai_materi_3
const quizFormMateri3 = document.getElementById("quizFormMateri3");
const quizResultMateri3 = document.getElementById("quizResultMateri3");

quizFormMateri3.addEventListener("submit", (e) => {
  e.preventDefault();

  let score = 0;
  for (let i = 1; i <= 5; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`)?.value;
    if (selected === correctAnswersMateri3[`q${i}`]) {
      score += 20;
    }
  }

  // Simpan nilai ke header 'nilai_materi_3'
  userData.nilai_materi_3 = score;
  localStorage.setItem("loggedInUser", JSON.stringify(userData));

  // Tampilkan Umpan Balik
  quizResultMateri3.style.display = "block";
  if (score >= 80) {
    quizResultMateri3.style.background = "#e8f5e9";
    quizResultMateri3.style.color = "#2e7d32";
    quizResultMateri3.innerHTML = `<i class="fa-solid fa-trophy"></i> Luar Biasa! Skor Materi 3: <strong>${score}/100</strong>.<br>Nilai Anda berhasil disimpan ke profil rapor.`;
  } else {
    quizResultMateri3.style.background = "#fff3e0";
    quizResultMateri3.style.color = "#e65100";
    quizResultMateri3.innerHTML = `<i class="fa-solid fa-rotate-right"></i> Skor Anda: <strong>${score}/100</strong>.<br>Pelajari kembali prinsip 4 pilar etika di atas, lalu ulangi kuis!`;
  }

  quizResultMateri3.scrollIntoView({ behavior: "smooth" });
});
