let weather = {
      "apikey": "16a3b9a325482e0861d26d159319a588",
      fetchWeather: function(city) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apikey}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.displayWeather(data);
        })
        .catch(err => console.log(err));
      },
      displayWeather: function(data) {
         const { name } = data;
         const { icon, description } = data.weather[0];
         const { temp, humidity } = data.main;
         const { speed } = data.wind;
         console.log(name, icon, description, temp, humidity, speed);
         document.querySelector('.city').innerText = "Weather in " + name;
         document.querySelector('.icon').setAttribute('src', `https://openweathermap.org/img/wn/${icon}.png`);
         document.querySelector(".description").innerText = description;
         document.querySelector(".temp").innerText = temp + "°C";
         document.querySelector(".humidity").innerText ="Humidity: " + humidity + "%";
         document.querySelector(".wind").innerText ="Wind speed: " + speed + " km/h";
         document.querySelector(".weather").classList.remove("fetching");
         document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
         }
};

document.querySelector('.search button').addEventListener('click', () => {
   const city = document.querySelector('.search input').value;
   weather.fetchWeather(city);
   });

document.querySelector('.search input').addEventListener('keypress', (e) => {
   if(e.keyCode == 13) {
      const city = document.querySelector('.search input').value;
      weather.fetchWeather(city);
   }
});

document.querySelector('.temp').addEventListener('click', toggleFahrenheit);

function toggleFahrenheit() {
   if(document.querySelector('.temp').innerText.includes("°C")) {
      document.querySelector('.temp').innerText = document.querySelector('.temp').innerText.replace("°C", "°F");
      const temp = document.querySelector('.temp');
      const tempValue = temp.innerText;
      const tempValueNum = parseInt(tempValue.slice(0, -1));
      const tempValueFahrenheit = Math.round(tempValueNum * 9/5 + 32);
      temp.innerText = tempValueFahrenheit + "°F";
   } else {
      document.querySelector('.temp').innerText = document.querySelector('.temp').innerText.replace("°F", "°C");
      const temp = document.querySelector('.temp');
      const tempValue = temp.innerText;
      const tempValueNum = parseInt(tempValue.slice(0, -1));
      const tempValueCelsius = Math.round((tempValueNum - 32) * 5/9);
      temp.innerText = tempValueCelsius + "°C";
   }
}


weather.fetchWeather("Delhi");