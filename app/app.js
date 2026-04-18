import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDlfKkPzmzSUvVdfqI0Q2_FOmY-MVCwonc",
    authDomain: "nullmyaifuture.firebaseapp.com",
    projectId: "nullmyaifuture",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const cropField = document.getElementById('crop');
const enterButton = document.getElementById('enterButton');
const refreshButton = document.getElementById('refreshButton');
const chatContainer = document.getElementById('topLayout');
const startButton = document.getElementById('startButton');
const welcomePage = document.getElementById('welcomePage');
const chatPage = document.getElementById('chatPage');

signInAnonymously(auth)
    .then(() => console.log("Login Success"))
    .catch((error) => alert("Login failed: " + error.message));


async function handleEnter() {
    const cropInput = cropField.value;
    if (!cropInput) {
        alert("Empty Fields!");
        return;
    }

    cropField.disabled = true;
    enterButton.disabled = true;
    refreshButton.disabled = false;
    chatContainer.innerHTML = '';
    addChatBubble("user", cropInput);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getAddress(lat, lon, cropInput);
            },
            () => alert("Unable to get location."),
            { enableHighAccuracy: true }
        );
    }
}

async function getAddress(lat, lon, crop) {
    const apiKey = "AIzaSyBiMk2k0UNBpN5XfWykJB4kR-Z5jA-WvwU";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const result = data.results[0];

        const farmLocation = {
            address: result.formatted_address,
            lat: lat,
            lon: lon
        };

        console.log("Address Complete");
        callAgent(crop, farmLocation);
    } catch (e) {
        console.error("Geocoding failed", e);
    }
}

async function callAgent(crop, location) {
    try {
        const response = await fetch("https://analyzefarmagent-309499836612.us-central1.run.app", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                address: location.address,
                crop: crop
            })
        });

        if (response.ok) {
            const json = await response.json();
            const formatBullets = (arr) => arr.map(item => `• ${item}`).join('\n');

            const responseText = `
------------ Details ------------
Crop: ${crop}
Location: ${location.address}
Lat: ${location.lat} | Lon: ${location.lon}

------------ Analysis ------------
Suitability: ${json.suitability}
Reasoning: \n${json.suitability_reason}

------------ Planning ------------
Irrigation: \n${formatBullets(json.irrigationPlan)}

Fertilizer: \n${formatBullets(json.fertilizerPlan)}

Precaution: \n${formatBullets(json.precautionPlan)}
            `;

            addChatBubble("system", responseText);
        } else {
            alert("Server Error: " + response.status);
        }
    } catch (e) {
        alert("Connection Failed: " + e.message);
    }
}

function addChatBubble(sender, message) {
    const bubble = document.createElement('div');

    bubble.style.padding = "12px";
    bubble.style.margin = "8px";
    bubble.style.borderRadius = "15px";
    bubble.style.maxWidth = "80%";
    bubble.style.fontSize = "16px";
    bubble.style.whiteSpace = "pre-wrap";
    bubble.innerText = message;

    if (sender == "user") {
        bubble.style.alignSelf = "flex-end";
        bubble.style.backgroundColor = "#725FA1";
        bubble.style.color = "#FFFFFF";
        bubble.style.marginLeft = "auto";
    } else {
        bubble.style.alignSelf = "flex-start";
        bubble.style.backgroundColor = "#f8f9fa";
        bubble.style.border = "1px solid #ccc";
        bubble.style.marginRight = "auto";
    }
    chatContainer.appendChild(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function handleRefresh() {
    cropField.disabled = false;
    enterButton.disabled = false;
    refreshButton.disabled = false;
    cropField.value = "";

    chatContainer.innerHTML = '';

    const welcomeTextHtml = `<h1 id="welcometext">What crops would you like to plant?</h1>`;
    chatContainer.insertAdjacentHTML('beforeend', welcomeTextHtml);

}

startButton.addEventListener('click', () => {
    welcomePage.style.display = 'none';
    chatPage.style.display = 'flex';
});

refreshButton.addEventListener('click', handleRefresh);
enterButton.addEventListener('click', handleEnter);



