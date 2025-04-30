window.onload = async function () {
    const city = localStorage.getItem('selectedCity');
    const apiKey = '1fa53a176092d622b2d91b170f92f1fa';
    if (!city) {
      document.getElementById('weatherInfo').innerHTML = 'City not provided!';
      return;
    }
  
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
  
      const currentTime = new Date().getHours();
      const isDayTime = currentTime >= 6 && currentTime < 18;
      const timeEmoji = isDayTime ? '🌞' : '🌙';
  
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
  
      const ctx = document.getElementById('tempChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Current Temp', 'Next Day Temp'],
          datasets: [{
            label: 'Temperature (°C)',
            data: [data.main.temp, tomorrow.main.temp],
            backgroundColor: ['#ffcc70', '#70d6ff'],
            borderColor: ['#ffaa00', '#0077cc'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Temperature Comparison for ${data.name}`,
              font: { size: 18 }
            },
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 5
              }
            }
          }
        }
      });
    } catch (error) {
      console.error(error);
      alert('Could not fetch weather data.');
    }
  };
  
