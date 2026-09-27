const GROUP_URL =
  "https://chat.whatsapp.com/Fbk0gIDWokm39O0m1JB28a?s=cl&p=a&mlu=4&iam=2";


/* ================= ELEMENTS ================= */

const form =
  document.getElementById("attendanceForm");

const nameInput =
  document.getElementById("name");

const inputWrap =
  document.querySelector(".input-wrap");

const statusCards =
  document.querySelectorAll(".status-card");

const selectedStatusBox =
  document.getElementById("selectedStatus");

const selectedText =
  document.getElementById("selectedText");

const selectedEmoji =
  document.getElementById("selectedEmoji");

const submitBtn =
  document.getElementById("submitBtn");

const modal =
  document.getElementById("modal");

const closeModal =
  document.getElementById("closeModal");

const messagePreview =
  document.getElementById("messagePreview");

const successName =
  document.getElementById("successName");

const copyBtn =
  document.getElementById("copyBtn");

const openWhatsapp =
  document.getElementById("openWhatsapp");

const toast =
  document.getElementById("toast");

const toastText =
  document.getElementById("toastText");

const toastIcon =
  document.getElementById("toastIcon");

const confetti =
  document.getElementById("confetti");


/* ================= STATE ================= */

let selectedStatus = "";

let generatedMessage = "";

let toastTimer = null;


/* ================= STATUS DATA ================= */

const statusData = {

  Hadir: {
    emoji: "😎",
    color: "#65d873"
  },

  Izin: {
    emoji: "🙋",
    color: "#ffd64d"
  },

  Sakit: {
    emoji: "🤒",
    color: "#65b7ff"
  },

  Alpha: {
    emoji: "😴",
    color: "#a889ff"
  }

};


/* ================= NAME INPUT ================= */

nameInput.addEventListener(
  "input",
  () => {

    const value =
      nameInput.value.trim();

    inputWrap.classList.toggle(
      "valid",
      value.length >= 2
    );

  }
);


/* ================= SELECT STATUS ================= */

statusCards.forEach(card => {

  card.addEventListener(
    "click",
    () => {

      statusCards.forEach(item => {
        item.classList.remove("selected");
      });

      card.classList.add("selected");

      selectedStatus =
        card.dataset.status;

      const data =
        statusData[selectedStatus];

      selectedEmoji.textContent =
        data.emoji;

      selectedText.textContent =
        `Status kamu: ${selectedStatus}`;

      selectedStatusBox.classList.add(
        "active"
      );

      /* smooth pop */

      selectedStatusBox.animate(
        [
          {
            transform: "scale(.94)"
          },
          {
            transform: "scale(1.03)"
          },
          {
            transform: "scale(1)"
          }
        ],
        {
          duration: 350,
          easing:
            "cubic-bezier(.16,1,.3,1)"
        }
      );

    }
  );

});


/* ================= DATE ================= */

function getDate() {

  const now =
    new Date();

  return now.toLocaleDateString(
    "id-ID",
    {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    }
  );

}


/* ================= TIME ================= */

function getTime() {

  const now =
    new Date();

  return now.toLocaleTimeString(
    "id-ID",
    {
      hour: "2-digit",
      minute: "2-digit"
    }
  );

}


/* ================= MESSAGE ================= */

function createMessage(
  name,
  status
) {

  return (
`*ABSENSI KELAS KITA* 📚

👤 *Nama:* ${name}
📌 *Status:* ${status}
📅 *Tanggal:* ${getDate()}
⏰ *Waktu:* ${getTime()}

_Dikirim melalui KELAS KITA_`
  );

}


/* ================= WHATSAPP URL ================= */

function getWhatsAppUrl(message) {

  return (
    "https://wa.me/?text=" +
    encodeURIComponent(message)
  );

}


/* ================= COPY ================= */

async function copyMessage() {

  if (!generatedMessage) {
    return false;
  }

  try {

    await navigator.clipboard.writeText(
      generatedMessage
    );

    return true;

  } catch {

    const textarea =
      document.createElement("textarea");

    textarea.value =
      generatedMessage;

    textarea.style.position =
      "fixed";

    textarea.style.opacity =
      "0";

    document.body.appendChild(
      textarea
    );

    textarea.select();

    const success =
      document.execCommand("copy");

    textarea.remove();

    return success;

  }

}


/* ================= TOAST ================= */

function showToast(
  message,
  icon = "✓"
) {

  clearTimeout(toastTimer);

  toastText.textContent =
    message;

  toastIcon.textContent =
    icon;

  toast.classList.add("show");

  toastTimer =
    setTimeout(() => {

      toast.classList.remove(
        "show"
      );

    }, 2500);

}


/* ================= CONFETTI ================= */

function createConfetti() {

  confetti.innerHTML = "";

  const symbols = [
    "●",
    "◆",
    "■",
    "✦",
    "★"
  ];

  for (
    let i = 0;
    i < 65;
    i++
  ) {

    const piece =
      document.createElement("span");

    piece.className =
      "confetti";

    piece.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];

    piece.style.left =
      Math.random() * 100 + "%";

    piece.style.fontSize =
      8 +
      Math.random() * 12 +
      "px";

    piece.style.setProperty(
      "--duration",
      1.8 +
      Math.random() * 1.8 +
      "s"
    );

    piece.style.animationDelay =
      Math.random() * .35 +
      "s";

    piece.style.color = [
      "#63d86f",
      "#ffd95a",
      "#66b6ff",
      "#a986ff",
      "#ff9f43"
    ][
      Math.floor(
        Math.random() * 5
      )
    ];

    confetti.appendChild(
      piece
    );

  }

}


/* ================= MODAL ================= */

function showModal(
  name
) {

  successName.textContent =
    name;

  messagePreview.textContent =
    generatedMessage;

  modal.classList.add("show");

  createConfetti();

}


function hideModal() {

  modal.classList.remove(
    "show"
  );

}


/* ================= SHAKE ================= */

function shake(element) {

  element.classList.remove(
    "shake"
  );

  void element.offsetWidth;

  element.classList.add(
    "shake"
  );

}


/* ================= SUBMIT ================= */

form.addEventListener(
  "submit",
  async event => {

    event.preventDefault();


    const name =
      nameInput.value
        .trim()
        .replace(/\s+/g, " ");


    /* NAME VALIDATION */

    if (name.length < 2) {

      shake(inputWrap);

      nameInput.focus();

      showToast(
        "Isi nama kamu dulu ya!",
        "👀"
      );

      return;

    }


    /* STATUS VALIDATION */

    if (!selectedStatus) {

      shake(selectedStatusBox);

      showToast(
        "Pilih status kamu dulu!",
        "☝️"
      );

      return;

    }


    /* CREATE MESSAGE */

    generatedMessage =
      createMessage(
        name,
        selectedStatus
      );


    /* BUTTON ANIMATION */

    submitBtn.classList.add(
      "loading"
    );

    submitBtn.disabled = true;

    const originalHTML =
      submitBtn.innerHTML;

    submitBtn.innerHTML = `
      <span class="btn-icon">✨</span>
      <span class="btn-text">MENYIAPKAN...</span>
    `;


    /* SMALL DELAY FOR ANIMATION */

    await new Promise(
      resolve =>
        setTimeout(
          resolve,
          500
        )
    );


    /* SAVE LAST ATTENDANCE */

    localStorage.setItem(
      "kelasKitaLastAttendance",
      JSON.stringify({
        name,
        status: selectedStatus,
        date: getDate(),
        time: getTime()
      })
    );


    /* COPY AS BACKUP */

    await copyMessage();


    /* SHOW SUCCESS */

    showModal(name);

    showToast(
      "Absensi berhasil dibuat! 🎉",
      "✓"
    );


    /* RESET FORM IMMEDIATELY */

    form.reset();

    nameInput.value = "";

    inputWrap.classList.remove(
      "valid"
    );


    statusCards.forEach(card => {
      card.classList.remove(
        "selected"
      );
    });


    selectedStatus = "";

    selectedEmoji.textContent =
      "👀";

    selectedText.textContent =
      "Belum memilih status";

    selectedStatusBox.classList.remove(
      "active"
    );


    /* RESTORE BUTTON */

    submitBtn.innerHTML =
      originalHTML;

    submitBtn.classList.remove(
      "loading"
    );

    submitBtn.disabled = false;

  }
);


/* ================= OPEN WHATSAPP ================= */

openWhatsapp.addEventListener(
  "click",
  () => {

    if (!generatedMessage) {
      return;
    }

    const whatsappURL =
      getWhatsAppUrl(
        generatedMessage
      );

    /*
      WhatsApp akan membuka chat
      dengan pesan sudah terisi.

      Untuk GROUP:
      browser/WhatsApp tidak mengizinkan
      website biasa memaksa pesan langsung
      terkirim ke grup.
    */

    window.location.href =
      whatsappURL;

  }
);


/* ================= COPY BUTTON ================= */

copyBtn.addEventListener(
  "click",
  async () => {

    const success =
      await copyMessage();

    if (success) {

      showToast(
        "Pesan berhasil disalin! 📋"
      );

      copyBtn.textContent =
        "✓ Tersalin";

      setTimeout(() => {

        copyBtn.textContent =
          "📋 Copy";

      }, 1600);

    } else {

      showToast(
        "Gagal menyalin pesan",
        "!"
      );

    }

  }
);


/* ================= CLOSE MODAL ================= */

closeModal.addEventListener(
  "click",
  hideModal
);


modal.addEventListener(
  "click",
  event => {

    if (
      event.target === modal
    ) {
      hideModal();
    }

  }
);


/* ================= ESCAPE ================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {
      hideModal();
    }

  }
);


/* ================= RESTORE LAST DATA ================= */

const lastAttendance =
  localStorage.getItem(
    "kelasKitaLastAttendance"
  );

if (lastAttendance) {

  try {

    const data =
      JSON.parse(
        lastAttendance
      );

    /*
      Hanya untuk internal state.
      Form tetap kosong supaya user
      bisa langsung absen lagi.
    */

    console.log(
      "KELAS KITA:",
      data
    );

  } catch {

    localStorage.removeItem(
      "kelasKitaLastAttendance"
    );

  }

}
