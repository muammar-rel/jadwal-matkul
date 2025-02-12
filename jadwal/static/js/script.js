document.addEventListener("DOMContentLoaded", function () {
  updateTime();
  setInterval(updateTime, 1000);
  initCountdowns();
  initCountdownsBesok();
});

// 🔹 Update waktu real-time
function updateTime() {
  let now = new Date();
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  document.getElementById("current-time").innerText =
    now.toLocaleTimeString("id-ID");
  document.getElementById("current-date").innerText = now.toLocaleDateString(
    "id-ID",
    options
  );
}

// 🔹 Inisialisasi countdown untuk jadwal hari ini
function initCountdowns() {
  document.querySelectorAll("[id^=countdown-]").forEach((el) => {
    let parent = el.closest(".schedule-item");
    let waktuText = parent
      .querySelector("p:nth-child(3)")
      .innerText.match(/\d{2}:\d{2}/g);

    if (waktuText && waktuText.length === 2) {
      startCountdown(el, waktuText[0], waktuText[1], parent);
    }
  });
}

// 🔹 Hitung mundur jadwal hari ini
function startCountdown(countdownEl, startTime, endTime, parent) {
  let now = new Date();
  let start = setTimeFromString(startTime);
  let end = setTimeFromString(endTime);

  let interval = setInterval(() => {
    now = new Date();
    let diffStart = start - now;
    let diffEnd = end - now;

    if (diffEnd <= 0) {
      countdownEl.innerText = "Selesai";
    } else if (diffStart <= 0) {
      countdownEl.innerText = "Sedang berlangsung"; // 🔹 Jika sedang berjalan
    } else {
      countdownEl.innerText = formatCountdown(diffStart);
    }
  }, 1000);
}

// 🔹 Inisialisasi countdown untuk jadwal besok
function initCountdownsBesok() {
  document.querySelectorAll("[id^=countdown-besok-]").forEach((el) => {
    let parent = el.closest(".schedule-item");
    let startTimeText = parent.querySelector(".start-time").innerText;

    if (startTimeText) {
      startCountdownBesok(el, startTimeText);
    }
  });
}

// 🔹 Hitung mundur jadwal besok
function startCountdownBesok(countdownEl, startTime) {
  let now = new Date();
  let besok = new Date();
  besok.setDate(now.getDate() + 1);
  besok = setTimeFromString(startTime, besok);

  let interval = setInterval(() => {
    now = new Date();
    let diff = besok - now;

    if (diff <= 0) {
      parent.style.display = "blok";
      countdownEl.innerText = "Sedang berlangsung"; // 🔹 Jika sudah dimulai
      clearInterval(interval);
    } else {
      countdownEl.innerText = formatCountdown(diff);
    }
  }, 1000);
}

// 🔹 Konversi string waktu ke objek Date
function setTimeFromString(timeString, baseDate = new Date()) {
  let [hour, minute] = timeString.split(":").map(Number);
  baseDate.setHours(hour, minute, 0, 0);
  return baseDate;
}

// 🔹 Format hitungan mundur menjadi jam, menit, detik
function formatCountdown(diff) {
  let hours = Math.floor(diff / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `Mulai dalam ${hours} jam ${minutes} menit ${seconds} detik`;
}

// 🔹 Modal "Hubungi PJ"
let nomorPJ = "";

function bukaModal(nomor) {
  nomorPJ = nomor;
  document.getElementById("nama").value = "";
  document.getElementById("nim").value = "";
  document.getElementById("pesan").value = "";
  document.getElementById("modalHubungiPJ").style.display = "block";
}

function tutupModal() {
  document.getElementById("modalHubungiPJ").style.display = "none";
}

function kirimPesan() {
  let nama = document.getElementById("nama").value.trim();
  let nim = document.getElementById("nim").value.trim();
  let pesan = document
    .getElementById("pesan")
    .value.trim()
    .replace(/\n/g, "%0A");

  if (nama && nim && pesan) {
    let whatsappUrl = `https://wa.me/${nomorPJ}?text=Halo, saya ${nama} (NIM: ${nim}).%0A%0A${pesan}`;
    window.open(whatsappUrl, "_blank");
    tutupModal();
  } else {
    alert("Mohon isi semua kolom.");
  }
}

// 🔹 Tutup modal jika klik di luar area modal
window.onclick = function (event) {
  let modal = document.getElementById("modalHubungiPJ");
  if (event.target == modal) {
    tutupModal();
  }
};
