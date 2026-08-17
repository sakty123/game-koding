// Autentikasi Pengguna
const userDataRaw = localStorage.getItem("loggedInUser");
if (!userDataRaw) {
  window.location.href = "index.html";
}

const userData = JSON.parse(userDataRaw);
document.getElementById("studentName").textContent = userData.nama || userData.username || "Siswa";

// Kunci Jawaban Kuis LK 3.1 Modul 3
const correctAnswersMateri2 = {
  q1: "A", // Sistem meniru kecerdasan manusia
  q2: "B", // Cerdas belajar & putuskan sendiri, noncerdas ikuti perintah
  q3: "D", // Google Assistant
  q4: "D", // Membuat karya seni, teks, musik baru
  q5: "B", // Face ID di ponsel
  q6: "B", // Belajar dari data dan membuat keputusan sendiri
  q7: "D", // Mobil otonom
  q8: "A", // Mesin cerdas
  q9: "D", // Machine Learning
  q10: "A", // Belajar dari kreativitas manusia
};

// Penanganan Submit Kuis & Simpan ke nilai_materi_2
const quizFormMateri2 = document.getElementById("quizFormMateri2");
const quizResultMateri2 = document.getElementById("quizResultMateri2");

quizFormMateri2.addEventListener("submit", (e) => {
  e.preventDefault();

  let score = 0;
  for (let i = 1; i <= 10; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`)?.value;
    if (selected === correctAnswersMateri2[`q${i}`]) {
      score += 10;
    }
  }

  // Simpan nilai ke header 'nilai_materi_2'
  userData.nilai_materi_2 = score;
  localStorage.setItem("loggedInUser", JSON.stringify(userData));

  // Tampilkan Umpan Balik
  quizResultMateri2.style.display = "block";
  if (score >= 80) {
    quizResultMateri2.style.background = "#e8f5e9";
    quizResultMateri2.style.color = "#2e7d32";
    quizResultMateri2.innerHTML = `<i class="fa-solid fa-trophy"></i> Hebat! Skor Materi 2: <strong>${score}/100</strong>.<br>Nilai Anda berhasil disimpan ke profil rapor.`;
  } else {
    quizResultMateri2.style.background = "#fff3e0";
    quizResultMateri2.style.color = "#e65100";
    quizResultMateri2.innerHTML = `<i class="fa-solid fa-rotate-right"></i> Skor Anda: <strong>${score}/100</strong>.<br>Pelajari kembali karakteristik & cara kerja KA di atas, lalu ulangi kuis!`;
  }

  quizResultMateri2.scrollIntoView({ behavior: "smooth" });
});
