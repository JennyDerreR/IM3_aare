docoument.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'etl-boilerplate/unload.php'; // Pfad zu Ihrem PHP-Skript

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Zum Debuggen: Überprüfen Sie die empfangenen Daten
        })
        const ctx = document.getElementById("Diagramm").getContext("2d");  // Holt das Canvas-Element für das Diagramm
        const datasets = Object.keys(data).map((city) => ({
        label: city,
        data: data[city].map((item) => item.temperature_celsius),
        fill: false,
        borderColor: getRandomColor(), // Generiert eine zufällige Farbe für jede Stadtlinie im Diagramm
        tension: 0.1, // Gibt der Linie im Diagramm eine leichte Kurve
      }));

      /* Uncomment to create the chart: nicht so ein Chartdesign, das wir brauchen
      new Chart(ctx, {
        type: "line",
        data: {
          labels: data["Bern"].map((item) => new Date(item.created_at).toLocaleDateString()), // Nimmt an, dass alle Städte Daten für dieselben Daten haben
          datasets: datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: false, // Startet die y-Achse nicht bei 0, um einen besseren Überblick über die Schwankungen zu geben
            },
          },
        },
      });
      */
    })
    .catch((error) => console.error("Fetch-Fehler:", error)); // Gibt Fehler im Konsolenlog aus, falls die Daten nicht abgerufen werden können

  function getCityColor(city) {
    const cityColors = {
      Bern: "#ffcf33ff",
      Zürich: "#33a3ffff",
      Chur: "#2edc07ff",
      // Fügen Sie hier weitere Städte und ihre Farben hinzu
    };
    return cityColors[city] || getRandomColor(); // Gibt die vordefinierte Farbe zurück oder eine zufällige Farbe
  }

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color; // Erzeugt eine zufällige Farbe
  }
;