const maxAttendees = 50;
let attendeeCount = 0;
let teamCounts = {
  water: 0,
  zero: 0,
  power: 0,
};

const attendeeCountElement = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const form = document.getElementById("checkInForm");
const attendeeNameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const waterCountElement = document.getElementById("waterCount");
const zeroCountElement = document.getElementById("zeroCount");
const powerCountElement = document.getElementById("powerCount");

function getTeamName(team) {
  if (team === "water") {
    return "Team Water Wise";
  }

  if (team === "zero") {
    return "Team Net Zero";
  }

  return "Team Renewables";
}

function updateProgress() {
  const percent = (attendeeCount / maxAttendees) * 100;
  attendeeCountElement.textContent = attendeeCount;
  progressBar.style.width = percent + "%";
}

function updateTeamDisplay() {
  waterCountElement.textContent = teamCounts.water;
  zeroCountElement.textContent = teamCounts.zero;
  powerCountElement.textContent = teamCounts.power;
}

function updateGreeting(name, team) {
  const teamName = getTeamName(team);
  greeting.textContent =
    "Welcome " + name + "! You are checked in for " + teamName + ".";
}

function showCapacityMessage() {
  greeting.textContent =
    "The summit is now full. Thank you for helping us reach our sustainability goal!";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const attendeeName = attendeeNameInput.value.trim();
  const team = teamSelect.value;

  if (attendeeName === "") {
    greeting.textContent = "Please enter an attendee name before checking in.";
    return;
  }

  if (team === "") {
    greeting.textContent = "Please select a team before checking in.";
    return;
  }

  if (attendeeCount >= maxAttendees) {
    showCapacityMessage();
    return;
  }

  attendeeCount = attendeeCount + 1;
  teamCounts[team] = teamCounts[team] + 1;

  updateGreeting(attendeeName, team);
  updateProgress();
  updateTeamDisplay();

  form.reset();
  attendeeNameInput.focus();
});

updateProgress();
updateTeamDisplay();
greeting.textContent =
  "Welcome to the Sustainability Summit! Please check in below.";
