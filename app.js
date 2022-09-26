const input = document.getElementById("input");
const button = document.getElementById("btn");
const result = document.getElementById("result-div");
const message = document.getElementById("message");
const body = document.querySelector("body");
let cityList = [];

// const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value},tr&appid=05c2eab785b195a0d8ecc20b303f2cc0&units=metric`;

button.addEventListener("click", () => {
  if (!input.value.trim()) {
    message.innerHTML = "You have to enter a city";
    input.value = "";
  } else if (cityList.includes(input.value)) {
    message.innerHTML = "You already entered this city";
    input.value = "";
  } else {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value},tr&appid=05c2eab785b195a0d8ecc20b303f2cc0&units=metric`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("You have to enter a valid city in Turkiye");
        }
        return res.json();
      })
      .then((data) => updateDom(data))
      .catch((err) => {
        message.innerHTML = err;
      });
  }
});

result.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-x")) {
    console.log(e.target.parentElement.parentElement);
    e.target.parentElement.parentElement.remove();
    cityList = cityList.filter(
      (el) =>
        el !=
        e.target.parentElement.nextElementSibling.textContent.toLocaleLowerCase(
          "tr"
        )
    );
  }
});

const updateDom = (data) => {
  const {
    main: { temp },
    weather,
  } = data;
  result.innerHTML += `
    <div class="weather-div">
        <button id="cross" class="btn-cross"><i class="fa-solid fa-x"></i></button>
        <p class="city">${input.value.toLocaleUpperCase("tr")}</p>
        <p class="weather-degree"><span class="span">${Math.round(
          temp
        )}</span>°C</p>
        <img src="./img/${weather[0].description}.png" alt="">
        <p class="description">${weather[0].description.toLocaleUpperCase(
          "tr"
        )}</p>
    </div>
  `;

  if (weather[0].description == "clear sky") {
    body.className = "sunny";
  } else if (
    weather[0].description == "few clouds" ||
    weather[0].description == "scattered clouds" ||
    weather[0].description == "broken clouds" ||
    weather[0].description == "mist"
  ) {
    body.className = "cloudy";
  } else if (
    weather[0].description == "shower rain" ||
    weather[0].description == "rain" ||
    weather[0].description == "thunderstorm"
  ) {
    body.className = "rainy";
  } else if (weather[0].description == "snow") {
    body.className = "snowy";
  }

  cityList.push(input.value);
  input.value = "";
};

input.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    button.click();
  }
});
