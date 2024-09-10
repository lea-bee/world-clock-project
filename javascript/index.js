function updateTimes() {
  //chicago
  let chicagoElement = document.querySelector("#chicago");
  if (chicagoElement) {
    let chicagoDateElement = chicagoElement.querySelector(".date");
    let chicagoTimeElement = chicagoElement.querySelector(".time");
    let chicagoTime = moment().tz("America/Chicago");

    chicagoDateElement.innerHTML = chicagoTime.format("MMMM Do YYYY");
    chicagoTimeElement.innerHTML = chicagoTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }

  //sydney
  let sydneyElement = document.querySelector("#sydney");
  if (sydneyElement) {
    let sydneyDateElement = sydneyElement.querySelector(".date");
    let sydneyTimeElement = sydneyElement.querySelector(".time");
    let sydneyTime = moment().tz("Australia/Sydney");

    sydneyDateElement.innerHTML = sydneyTime.format("MMMM Do YYYY");
    sydneyTimeElement.innerHTML = sydneyTime.format(
      "h:mm:ss [<small>]A[</small>]"
    );
  }
}

updateTimes();
setInterval(updateTimes, 1000);

function updateCity(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone === "current") {
    cityTimeZone = moment.tz.guess();
  }
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `
  <div class="city">
    <div>
      <h2>${cityName}</h2>
      <div class="date">${cityTime.format("MMMM	Do YYYY")}</div>
    </div>
    <div class="time"><span>${cityTime.format(
      "h:mm:ss"
    )} <small>${cityTime.format("A")}</small></span></div>
  </div>
  <div class="zone"></div>
  <a href = "/"><strong>All cities</strong></a>
  `;
}

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);

function timeDifference(event) {
  const localTime = moment();
  const foreignTimezone = event.target.value;
  const foreignTime = moment().tz(foreignTimezone);
  let timeZoneInfoElement = document.querySelector(".zone");

  const differenceInHours =
    foreignTime.utcOffset() / 60 - localTime.utcOffset() / 60;

  let timeZoneInfo = `<span><strong>${differenceInHours}</strong> hours difference</span>`;
  timeZoneInfoElement.innerHTML = timeZoneInfo;
}
let citiesElement = document.querySelector("#city");
citiesElement.addEventListener("change", timeDifference);
