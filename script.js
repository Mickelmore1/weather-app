const search = document.getElementById("search");
const address = document.getElementById("location");
const temperature = document.getElementById("temperature");
const conditions = document.getElementById("current-condition");
const highTemp = document.getElementById("high");
const lowTemp = document.getElementById("low");

search.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    weather(search.value);
    search.value = "";
  }
});

async function weather(query) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?unitGroup=uk&key=SLQ4AYDX9QUCP7SBDSFMGA47Q&contentType=json`,
      {
        method: "GET",
        headers: {},
      }
    );
    const data = await response.json();
    ui.updateDisplay(data);
    ui.addressLineBreak();
    ui.updateHour(data);
  } catch (err) {
    console.log(err);
    address.innerText = "ERROR, TRY AGAIN";
  }
}

function uiControls() {
  return {
    updateDisplay(data) {
      address.innerText = data.resolvedAddress;
      temperature.innerText = data.currentConditions.temp + "°";
      conditions.innerText = data.currentConditions.conditions;
      highTemp.innerText = "H: " + data.days[0].tempmax + "°";
      lowTemp.innerText = "L: " + data.days[0].tempmin + "°";
    },
    addressLineBreak() {
      const string = address.innerText;
      address.innerText = string.replaceAll(", ", "\n");
    },
    formatHourDisplay(data) {
      const time = data.currentConditions.datetime;
      const hour = Number(time.slice(0, 2));
      return hour;
    },
    updateHour(data) {
      const hours = document.querySelectorAll(".hour");
      console.log(hours);
      for (i = 0; i < 24; i++) {
        hours[i].children[1].src = "img/" + data.days[0].hours[i].icon + ".png";
        hours[i].children[2].innerText = data.days[0].hours[i].temp + "°";
      }
    },
  };
}

const ui = uiControls();
