// ====== Welcome Message ======
document.addEventListener("DOMContentLoaded", () => {
  console.log("EduPlay website loaded!");
});

// ====== Simulated Login / Signup ======
function signupUser() {
  const username = prompt("Enter a username:");
  if (username) {
    localStorage.setItem("eduplayUser", username);
    alert(`Welcome to EduPlay, ${username}! 🎮`);
    updateUserDisplay();
  }
}

function logoutUser() {
  localStorage.removeItem("eduplayUser");
  alert("You’ve been logged out!");
  updateUserDisplay();
}

function updateUserDisplay() {
  const user = localStorage.getItem("eduplayUser");
  const userDisplay = document.getElementById("userDisplay");
  if (user) {
    userDisplay.innerHTML = `
      <p>👋 Welcome, <b>${user}</b></p>
      <button onclick="logoutUser()">Logout</button>
    `;
  } else {
    userDisplay.innerHTML = `
      <button onclick="signupUser()">Sign Up / Login</button>
    `;
  }
}

// ====== Game “Play Now” Buttons ======
function playGame(gameName) {
  const user = localStorage.getItem("eduplayUser");
  if (!user) {
    alert("Please sign up or log in to play!");
    return;
  }

  const xpEarned = Math.floor(Math.random() * 100) + 10; // random XP
  alert(`${user}, you played ${gameName} and earned ${xpEarned} XP! 🎉`);
  updateLeaderboard(user, xpEarned);
}

// ====== Leaderboard System ======
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

function updateLeaderboard(user, xpEarned) {
  const existing = leaderboard.find((p) => p.user === user);
  if (existing) {
    existing.xp += xpEarned;
  } else {
    leaderboard.push({ user, xp: xpEarned });
  }

  leaderboard.sort((a, b) => b.xp - a.xp);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  displayLeaderboard();
}

function displayLeaderboard() {
  const tableBody = document.querySelector("#leaderboard tbody");
  tableBody.innerHTML = "";

  leaderboard.forEach((player, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${player.user}</td>
      <td>${player.xp}</td>
    `;
    tableBody.appendChild(row);
  });
}

// ====== Initialize ======
updateUserDisplay();
displayLeaderboard();
