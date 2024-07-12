document.getElementById("searchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value;
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c99b257654msha5da4497e4531dap17feb3jsn4d01058b1959",
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    displayWeatherInfo(result);
  } catch (error) {
    console.error(error);
  }
});

function displayWeatherInfo(data) {
  document.getElementById("locationName").textContent = data.location.name;
  document.getElementById("locationRegion").textContent = data.location.region;
  document.getElementById("locationCountry").textContent =
    data.location.country;
  document.getElementById("locationLat").textContent = data.location.lat;
  document.getElementById("locationLon").textContent = data.location.lon;
  document.getElementById("locationTz").textContent = data.location.tz_id;
  document.getElementById("locationLocaltime").textContent =
    data.location.localtime;

  document.getElementById("currentLastUpdated").textContent =
    data.current.last_updated;
  document.getElementById("currentTempC").textContent = data.current.temp_c;
  document.getElementById("currentTempF").textContent = data.current.temp_f;
  document.getElementById("currentCondition").textContent =
    data.current.condition.text;
  document.getElementById("currentConditionIcon").src =
    data.current.condition.icon;
  document.getElementById("currentWindMph").textContent = data.current.wind_mph;
  document.getElementById("currentWindKph").textContent = data.current.wind_kph;
  document.getElementById("currentWindDir").textContent = data.current.wind_dir;
  document.getElementById("currentPressureMb").textContent =
    data.current.pressure_mb;
  document.getElementById("currentPrecipMm").textContent =
    data.current.precip_mm;
  document.getElementById("currentHumidity").textContent =
    data.current.humidity;
  document.getElementById("currentCloud").textContent = data.current.cloud;
  document.getElementById("currentFeelsLikeC").textContent =
    data.current.feelslike_c;
  document.getElementById("currentFeelsLikeF").textContent =
    data.current.feelslike_f;
  document.getElementById("currentVisKm").textContent = data.current.vis_km;
  document.getElementById("currentUv").textContent = data.current.uv;
}

// 3 api for planning vaccation
async function planVacation() {
  const destinationInput = document.getElementById("cityInput").value.trim();
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

// Function to fetch Airbnb listings based on city name and display them in a carousel
async function searchListings() {
  const city = document.getElementById("cityInput").value.trim();
  const limit = 7; // Limit results to 7 listings for 7 slides

  // Check if city name is provided
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://airbnb13.p.rapidapi.com/search-geo?location=${encodeURIComponent(
    city
  )}&limit=${limit}&checkin=2025-01-12&checkout=2025-01-13&adults=1&children=0&infants=0&pets=0&page=1&currency=USD`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c99b257654msha5da4497e4531dap17feb3jsn4d01058b1959",
      "x-rapidapi-host": "airbnb13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json(); // Parse response as JSON

    // Clear previous listings and indicators in carousel
    const carouselInner = document.getElementById("carousel-inner");
    const carouselIndicators = document.getElementById("carousel-indicators");
    carouselInner.innerHTML = "";
    carouselIndicators.innerHTML = "";

    // Process each listing and create carousel items
    data.results.forEach((listing, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      if (index === 0) {
        carouselItem.classList.add("active");
      }

      const img = document.createElement("img");
      img.src = listing.images[0];
      img.classList.add("d-block", "w-100");
      img.alt = `Slide ${index + 1}`;
      carouselItem.appendChild(img);

      const carouselCaption = document.createElement("div");
      carouselCaption.classList.add("carousel-caption", "d-none", "d-md-block");
      carouselItem.appendChild(carouselCaption);

      const title = document.createElement("h5");
      title.textContent = listing.name;
      carouselCaption.appendChild(title);

      const cityPara = document.createElement("p");
      cityPara.textContent = `City: ${listing.city}`;
      carouselCaption.appendChild(cityPara);

      const typePara = document.createElement("p");
      typePara.textContent = `Type: ${listing.type}`;
      carouselCaption.appendChild(typePara);

      const ratingPara = document.createElement("p");
      ratingPara.textContent = `Rating: ${listing.rating}`;
      carouselCaption.appendChild(ratingPara);

      const pricePara = document.createElement("p");
      pricePara.textContent = `Price: ${listing.price.currency} ${listing.price.total}`;
      carouselCaption.appendChild(pricePara);

      const link = document.createElement("a");
      link.href = listing.url;
      link.target = "_blank";
      link.textContent = "View on Airbnb";
      link.classList.add("btn", "btn-primary");
      carouselCaption.appendChild(link);

      carouselInner.appendChild(carouselItem);

      // Create carousel indicators
      const indicatorButton = document.createElement("button");
      indicatorButton.setAttribute("type", "button");
      indicatorButton.setAttribute(
        "data-bs-target",
        "#carouselExampleCaptions"
      );
      indicatorButton.setAttribute("data-bs-slide-to", index.toString());
      if (index === 0) {
        indicatorButton.classList.add("active");
        indicatorButton.setAttribute("aria-current", "true");
      }
      indicatorButton.setAttribute("aria-label", `Slide ${index + 1}`);
      carouselIndicators.appendChild(indicatorButton);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//Notes
function saveNote(titleId, noteId) {
  const title = document.getElementById(titleId).value;
  const note = document.getElementById(noteId).value;
  const blob = new Blob([`Title: ${title}\n\nNote: ${note}`], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, `${title}.txt`);
}

//currency converter

const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const toggleThemeBtn = document.getElementById("toggle-theme");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input").value;
  if (amount === "" || amount < 1) {
    amount = 1;
    document.querySelector(".amount input").value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalAmount = amount * rate;
  msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${
    toCurr.value
  }`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

const toggleTheme = () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
};

const loadTheme = () => {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  }
};

toggleThemeBtn.addEventListener("click", toggleTheme);

window.addEventListener("load", () => {
  loadTheme();
  updateExchangeRate();
});

//translator
async function translateText() {
  const inputText = document.getElementById("inputText").value;
  const fromLanguage = document.getElementById("fromLanguage").value;
  const toLanguage = document.getElementById("toLanguage").value;

  const url = `${endpointURL}?api-version=3.0&to=${toLanguage}&from=${fromLanguage}`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": "c99b257654msha5da4497e4531dap17feb3jsn4d01058b1959",
      "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
    },
    body: JSON.stringify([{ Text: inputText }]),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const translatedText = data[0].translations[0].text;
    document.getElementById(
      "outputText"
    ).innerHTML = `<strong>Translated:</strong><br>${translatedText}`;
  } catch (error) {
    console.error("Error translating text:", error);
    document.getElementById("outputText").innerText =
      "Translation failed. Please try again.";
  }
}

//Expense Tracker
function calculateExpenses() {
  const budget = parseFloat(document.getElementById("totalBudget").value);
  const transportation = parseFloat(
    document.getElementById("expenseTransportation").value
  );
  const accommodation = parseFloat(
    document.getElementById("expenseAccommodation").value
  );
  const activities = parseFloat(
    document.getElementById("expenseActivities").value
  );
  const healthSafety = parseFloat(
    document.getElementById("expenseHealthSafety").value
  );
  const miscellaneous = parseFloat(
    document.getElementById("expenseMiscellaneous").value
  );
  const documentation = parseFloat(
    document.getElementById("expenseDocumentation").value
  );
  const emergencyFund = parseFloat(
    document.getElementById("expenseEmergencyFund").value
  );
  const medicalEmergency = parseFloat(
    document.getElementById("expenseMedicalEmergency").value
  );

  const expenses = {
    Transportation: transportation,
    Accommodation: accommodation,
    "Activities and Entertainment": activities,
    "Health and Safety": healthSafety,
    Miscellaneous: miscellaneous,
    "Documentation and Fees": documentation,
    "Emergency Fund": emergencyFund,
    "Medical Emergencies": medicalEmergency,
  };

  const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);

  if (totalExpenses > budget) {
    let suggestions =
      "Your total expenses exceed your budget. Consider reducing costs in these areas:<br>";
    Object.keys(expenses).forEach((key) => {
      suggestions += `${key}: ${expenses[key]}<br>`;
    });
    document.getElementById("expenseSuggestions").innerHTML = suggestions;
  } else {
    document.getElementById("expenseSuggestions").innerHTML =
      "Your total expenses are within the budget.";
  }

  document.getElementById("expenseResults").style.display = "block";
  createChart(expenses);
}

function createChart(expenses) {
  const ctx = document.getElementById("expenseChart").getContext("2d");
  const expenseChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(expenses),
      datasets: [
        {
          data: Object.values(expenses),
          backgroundColor: [
            "rgba(44, 62, 80, 0.8)",
            "rgba(52, 73, 94, 0.8)",
            "rgba(22, 160, 133, 0.8)",
            "rgba(39, 174, 96, 0.8)",
            "rgba(41, 128, 185, 0.8)",
            "rgba(142, 68, 173, 0.8)",
            "rgba(243, 156, 18, 0.8)",
            "rgba(192, 57, 43, 0.8)",
          ],
          borderColor: [
            "rgba(44, 62, 80, 1)",
            "rgba(52, 73, 94, 1)",
            "rgba(22, 160, 133, 1)",
            "rgba(39, 174, 96, 1)",
            "rgba(41, 128, 185, 1)",
            "rgba(142, 68, 173, 1)",
            "rgba(243, 156, 18, 1)",
            "rgba(192, 57, 43, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}
