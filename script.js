// 1 Api for weather
const url6 =
  "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Delhi";
const options6 = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "c99b257654msha5da4497e4531dap17feb3jsn4d01058b1959",
    "x-rapidapi-host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

const getweather = (city) => {
  document.getElementById("cityName").innerHTML = city;

  fetch(
    "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city,
    options6
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      document.getElementById("feels_like").innerHTML = response.feels_like;
      document.getElementById("humidity").innerHTML = response.humidity;
      document.getElementById("temp").innerHTML = response.temp;
      document.getElementById("min_temp").innerHTML = response.min_temp;
      document.getElementById("sunrise").innerHTML = response.sunrise;
      document.getElementById("max_temp").innerHTML = response.max_temp;
      document.getElementById("wind_degrees").innerHTML = response.wind_degrees;
      document.getElementById("wind_speed").innerHTML = response.wind_speed;
      document.getElementById("sunset").innerHTML = response.sunset;
    })
    .catch((err) => console.error(err));
};

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  getweather(document.getElementById("city").value);
});

// Initial call to display weather for Delhi on page load
getweather("Delhi");






// 2 api for news

const newsData = {
  articles: [
    {
      title: "NASA-Led Study Pinpoints Areas of New York City Sinking, Rising",
      url: "https://climate.nasa.gov/news/3285/",
      thumbnail:
        "https://climate.nasa.gov/internal_resources/2720/Map_of_vertical_land_motion_in_NYC.jpeg/image/large.png",
      published: "2023-09-27T18:11:45.000Z",
      source: "Nasa Climate",
    },
    {
      title:
        "Arctic Sea Ice 6th Lowest on Record; Antarctic Sees Record Low Growth",
      url: "https://climate.nasa.gov/news/3284/",
      thumbnail:
        "https://m.eyeofriyadh.com/news_images/2020/05/22c6626e162b1.jpg",
      published: "2023-09-26T17:51:44.000Z",
      source: "Nasa Climate",
    },
    {
      title: "NASA-Built Greenhouse Gas Detector Moves Closer to Launch",
      url: "https://climate.nasa.gov/news/3281/",
      thumbnail:
        "https://climate.nasa.gov/internal_resources/2712/Photo_of_engineers_doing_vibration_testing.jpeg/image/large.png",
      published: "2023-09-14T15:25:21.000Z",
      source: "Nasa Climate",
    },
    {
      title: "NASA Announces Summer 2023 Hottest on Record",
      url: "https://climate.nasa.gov/news/3282/",
      thumbnail:
        "https://nasa.gov/sites/default/files/styles/side_image/public/thumbnails/image/globaljjaanoms_gis_2023_chart_lrg.jpg?itok=H8Ez6X-s/image/large.png",
      published: "2023-09-14T16:23:25.000Z",
      source: "Nasa Climate",
    },

    // Add other articles here
  ],
  meta: {
    currentPage: 1,
    totalPages: 3,
    totalArticles: 31,
  },
};

function displayNews(newsData) {
  const newsContainer = document.getElementById("news-container");
  newsData.articles.forEach((news) => {
    const newsElement = document.createElement("div");
    newsElement.innerHTML = `
              <h2>${news.title}</h2>
              <p>Published by ${news.source} on ${new Date(
      news.published
    ).toLocaleDateString()}</p>
              <img src="${news.thumbnail}" alt="${
      news.title
    }" style="max-width: 100%;">
              <p><a href="${news.url}" target="_blank">Read more</a></p>
          `;
    newsContainer.appendChild(newsElement);
  });
}

// Call the displayNews function when the page loads
document.addEventListener("DOMContentLoaded", function () {
  displayNews(newsData);
});



// 3 api for planning vaccation
async function planVacation() {
  const destinationInput = document.getElementById("city").value.trim();
  const url2 = `https://ai-vacation-planner.p.rapidapi.com/vacationplan/${destinationInput}/4/sightseeing,shopping`;
  const options2 = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c99b257654msha5da4497e4531dap17feb3jsn4d01058b1959",
      "x-rapidapi-host": "ai-vacation-planner.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url2, options2);
    const data = await response.json();
    displayItinerary(data);
  } catch (error) {
    console.error(error);
  }
}

function displayItinerary(data) {
  const resultDiv = document.getElementById("result");
  if (data.error) {
    resultDiv.innerHTML = `<p>${data.error}</p>`;
  } else {
    const itineraryData = data.itineraryData;
    let itineraryHTML = "";
    for (const day in itineraryData) {
      itineraryHTML += `<h3>Day ${day.slice(3)}</h3>`;
      itineraryHTML += `<p>${itineraryData[day]}</p>`;
    }
    resultDiv.innerHTML = itineraryHTML;
  }
}

async function loadClimateData() {
  const url = "https://real-time-climate-index.p.rapidapi.com/api/climate-data";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c99b257654msha5da4497e4531dap17feb3jsn4d01058b1959",
      "x-rapidapi-host": "real-time-climate-index.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    displayClimateData(data);
  } catch (error) {
    console.error(error);
  }
}

function displayClimateData(data) {
  const climateDataDiv = document.getElementById("climateData");
  climateDataDiv.innerHTML = ""; // Clear previous data

  data.forEach((category) => {
    category.forEach((entry) => {
      const metadata = entry.metadata;
      const data = entry.data;

      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry");

      const nameHeading = document.createElement("h2");
      nameHeading.textContent = metadata.name;
      entryDiv.appendChild(nameHeading);

      const descriptionPara = document.createElement("p");
      descriptionPara.textContent = metadata.fullDescription;
      entryDiv.appendChild(descriptionPara);

      const currentOutputPara = document.createElement("p");
      currentOutputPara.textContent = `Current Output: ${data.outputs.current} ${data.outputs.unit}`;
      entryDiv.appendChild(currentOutputPara);

      climateDataDiv.appendChild(entryDiv);
    });
  });
}
