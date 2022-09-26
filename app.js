const input = document.getElementById("input");
const button = document.getElementById("btn");
const result = document.getElementById("result-div");
const message = document.getElementById("message");
let cityList = [];

// const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value},tr&appid=05c2eab785b195a0d8ecc20b303f2cc0&units=metric`;

button.addEventListener("click", () => {
  if (!input.value.trim()) {
    message.innerHTML = "You have to enter a city";
    input.value = "";
  } else {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value},tr&appid=05c2eab785b195a0d8ecc20b303f2cc0&units=metric`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        } else if (cityList.includes(input.value)) {
          throw new Error("You already entered this city");
        }
        return res.json();
      })
      .then((data) => updateDom(data))
      .catch((err) => {
        message.innerHTML = err;
      });
  }
});

const updateDom = (data) => {
  const {
    main: { temp },
    weather,
  } = data;
  result.innerHTML += `
    <div class="weather-div">
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
  cityList.push(input.value);
  input.value = "";
  console.log(temp, weather[0].description);
};

input.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    button.click();
  }
});

// fetch(weatherUrl)
//   .then((res) => {
//     if(!res.ok){
//         throw new Error("Something went wrong")
//     }else if{cityList.includes(input.value)}{
//         throw new Error("You already entered this city")
//     }return res.json()
//   })
//   .then((data) => updateDom(data)).catch((err)=> {
//     message.innerHTML = err

//   });
