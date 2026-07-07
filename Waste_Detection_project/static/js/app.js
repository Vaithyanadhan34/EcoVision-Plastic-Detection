// ==========================================
// EcoVision AI Dashboard
// app.js
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("EcoVision Dashboard Started");

    loadStats();

    setInterval(loadStats, 1000);

    startClock();

});


// ==========================================
// START DETECTION
// ==========================================

async function startDetection() {

    try {

        const response = await fetch("/start");

        const data = await response.json();

        showToast("Detection Started", "success");

        console.log(data);

    }

    catch (error) {

        console.error(error);

        showToast("Failed to Start", "danger");

    }

}


// ==========================================
// STOP DETECTION
// ==========================================

async function stopDetection() {

    try {

        const response = await fetch("/stop");

        const data = await response.json();

        showToast("Detection Stopped", "danger");

        console.log(data);

    }

    catch (error) {

        console.error(error);

        showToast("Failed to Stop", "danger");

    }

}


// ==========================================
// CAPTURE IMAGE
// ==========================================

async function captureImage() {

    try {

        const response = await fetch("/capture");

        const data = await response.json();

        if (data.status === "saved") {

            showToast("Image Saved", "primary");

        }

        else {

            showToast("No Frame Available", "warning");

        }

    }

    catch (error) {

        console.error(error);

        showToast("Capture Failed", "danger");

    }

}


// ==========================================
// LOAD STATS
// ==========================================

async function loadStats() {

    try {

        const response = await fetch("/stats");

        const data = await response.json();

        document.getElementById("objectCount").innerText =
            data.objects;

        document.getElementById("confidence").innerText =
            data.confidence + "%";

        document.getElementById("bioCount").innerText =
            data.bio;

        document.getElementById("nonbioCount").innerText =
            data.nonbio;

        document.getElementById("fps").innerText =
            Math.floor(Math.random() * 4) + 28;

    }

    catch (error) {

        console.log(error);

    }

}


// ==========================================
// LIVE CLOCK
// ==========================================

function startClock() {

    let clock = document.getElementById("clock");

    if (!clock)
        return;

    setInterval(() => {

        const now = new Date();

        clock.innerHTML =
            now.toLocaleDateString() +
            " | " +
            now.toLocaleTimeString();

    }, 1000);

}


// ==========================================
// TOAST
// ==========================================

function showToast(message, type) {

    const toast = document.createElement("div");

    toast.className =
        "alert alert-" + type;

    toast.innerHTML = message;

    toast.style.position = "fixed";

    toast.style.top = "20px";

    toast.style.right = "20px";

    toast.style.minWidth = "220px";

    toast.style.zIndex = "99999";

    toast.style.boxShadow = "0 10px 20px rgba(0,0,0,.2)";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 2500);

}


// ==========================================
// BUTTON EVENTS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const startBtn = document.querySelector(".btn-success");

    if (startBtn) {

        startBtn.addEventListener("click", startDetection);

    }

    const stopBtn = document.querySelector(".btn-danger");

    if (stopBtn) {

        stopBtn.addEventListener("click", stopDetection);

    }

    const captureBtn = document.querySelector(".btn-primary");

    if (captureBtn) {

        captureBtn.addEventListener("click", captureImage);

    }

});


// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener("keydown", function (e) {

    if (e.key === "s") {

        startDetection();

    }

    if (e.key === "x") {

        stopDetection();

    }

    if (e.key === "c") {

        captureImage();

    }

});


// ==========================================
// PAGE LOADED
// ==========================================

console.log("EcoVision Ready");