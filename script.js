async function getWeather() {
  const city = document.getElementById('cityDropdown').value;
  const apiKey = '1fa53a176092d622b2d91b170f92f1fa';
  if (!city) return;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await res.json();

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    );
    const forecastData = await forecastRes.json();
    const tomorrow = forecastData.list[8];

    // Add day or night emoji based on time
    const currentTime = new Date().getHours();
    const isDayTime = currentTime >= 6 && currentTime < 18;
    const timeEmoji = isDayTime ? '🌞' : '🌙';

    // Output the data in a table format with emojis
    document.getElementById('weatherInfo').innerHTML = `
      <table class="weather-table">
        <thead>
          <tr>
            <th colspan="2">Weather Information for ${data.name} ${timeEmoji}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>🌡 Current Temperature</strong></td>
            <td>${data.main.temp}°C</td>
          </tr>
          <tr>
            <td><strong>💨 Weather Condition</strong></td>
            <td>${data.weather[0].description}</td>
          </tr>
          <tr>
            <td><strong>🌡 Next Day Temperature</strong></td>
            <td>${tomorrow.main.temp}°C</td>
          </tr>
          <tr>
            <td><strong>💨 Next Day Weather Condition</strong></td>
            <td>${tomorrow.weather[0].description}</td>
          </tr>
          <tr>
            <td><strong>🕒 Forecast Time</strong></td>
            <td>${tomorrow.dt_txt}</td>
          </tr>
        </tbody>
      </table>
    `;
  } catch (error) {
    console.error(error);
    alert('Could not retrieve weather data.');
  }
}
const todayTemp = Math.floor(Math.random() * 6) + 30; // e.g., 30–35°C
const predictedTemp = todayTemp + 1; // simple logic: tomorrow = today + 1

const ctx = document.getElementById('liveChart').getContext('2d');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Today', 'Tomorrow'],
    datasets: [{
      label: 'Temperature (°C)',
      data: [todayTemp, predictedTemp],
      backgroundColor: ['skyblue', 'lightgreen'],
      borderColor: ['blue', 'green'],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Today's Temp: ${todayTemp}°C | Predicted: ${predictedTemp}°C`
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Temperature (°C)'
        }
      }
    }
  }
});

