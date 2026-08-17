// Autentikasi Pengguna
const userDataRaw = localStorage.getItem("loggedInUser");
if (!userDataRaw) {
  window.location.href = "index.html";
}

const userData = JSON.parse(userDataRaw);
document.getElementById("studentName").textContent = userData.nama || userData.username || "Siswa";

// Lab 1: Jam Modulo 10
let clockVal = 0;
const clockDisplay = document.getElementById("clockNumber");
const clockLog = document.getElementById("clockLog");
const btnClockStep = document.getElementById("btnClockStep");
const btnClockReset = document.getElementById("btnClockReset");

btnClockStep.addEventListener("click", () => {
  clockVal = (clockVal + 1) % 10;
  clockDisplay.textContent = clockVal;
  clockLog.textContent = `Posisi jarum: ${clockVal} (${clockVal === 0 ? "Kembali ke 0" : "Maju 1 langkah"})`;
});

btnClockReset.addEventListener("click", () => {
  clockVal = 0;
  clockDisplay.textContent = clockVal;
  clockLog.textContent = "Posisi jarum: 0 (Reset)";
});

// Lab 2: Simulasi IPO Blender
const btnBlend = document.getElementById("btnBlend");
const blendStatus = document.getElementById("blendStatus");

btnBlend.addEventListener("click", () => {
  const selectedFruit = document.querySelector('input[name="fruitChoice"]:checked').value;
  blendStatus.style.color = "#e65100";
  blendStatus.textContent = `Memproses: Memblender bahan [${selectedFruit}]...`;

  setTimeout(() => {
    blendStatus.style.color = "#2e7d32";
    blendStatus.textContent = `Luaran (Output): Jus Segar [${selectedFruit}] Siap Diminum! 🥤`;
  }, 1200);
});

// Kunci Jawaban Kuis LK 2.3 Modul 2
const correctAnswers = {
  q1: "C", // Masalah dengan teknik berpikir seperti komputer
  q2: "B", // Pemecahan masalah melalui pemodelan dan simulasi
  q3: "C", // Critical Thinking, Creativity, Communication, Collaboration
  q4: "B", // Digunakan dalam kehidupan sehari-hari
  q5: "A", // Decomposition, Pattern Recognition, Abstraction, Algorithmic Thinking
  q6: "C", // Menghafal soal tanpa memahami konsep
  q7: "C", // Input - Proses - Output
  q8: "B", // Belajar tanpa perangkat digital
  q9: "B", // Mengambil informasi penting & mengabaikan yang tidak relevan
  q10: "C", // Jika hujan bawa payung, jika tidak maka tidak bawa
};

// Pengiriman Kuis & Penyimpanan Nilai
const quizForm = document.getElementById("quizForm");
const quizResult = document.getElementById("quizResult");

quizForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let score = 0;
  for (let i = 1; i <= 10; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`)?.value;
    if (selected === correctAnswers[`q${i}`]) {
      score += 10;
    }
  }

  // Simpan nilai materi 1 ke localStorage
  userData.nilai_materi_1 = score;
  localStorage.setItem("loggedInUser", JSON.stringify(userData));

  // Tampilkan umpan balik
  quizResult.style.display = "block";
  if (score >= 80) {
    quizResult.style.background = "#e8f5e9";
    quizResult.style.color = "#2e7d32";
    quizResult.innerHTML = `<i class="fa-solid fa-trophy"></i> Luar Biasa! Skor Anda: <strong>${score}/100</strong>.<br>Nilai telah berhasil disimpan ke rapor profil Anda.`;
  } else {
    quizResult.style.background = "#fff3e0";
    quizResult.style.color = "#e65100";
    quizResult.innerHTML = `<i class="fa-solid fa-rotate-right"></i> Skor Anda: <strong>${score}/100</strong>.<br>Pelajari kembali konsep di atas dan coba lagi untuk mendapatkan nilai sempurna!`;
  }

  quizResult.scrollIntoView({ behavior: "smooth" });
});
