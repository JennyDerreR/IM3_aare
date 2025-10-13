document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'etl-boilerplate/unload.php'; // Pfad zu Ihrem PHP-Skript

    // Reihenfolge der Städte definieren für die X-Achse
    const citiesOrder = ["Brienz", "Interlaken", "Thun", "Bern", "Hagneck", "Biel", "Olten", "Brugg"];

// Daten von der API laden
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      // Ordne Flows pro Stadt zu
      const cityDataMap = {};
      data.forEach(item => {
        cityDataMap[item.location_id] = item.flow;
      });

      // Erstelle Datenpunkte (x = Stadt, y = Flow)
      const scatterData = citiesOrder.map(city => ({
        x: city,
        y: cityDataMap[city] || 0
      }));

      // Boot-Icon laden (PNG)
      const boatImg = new Image();
      boatImg.src = 'pics/Boot.png'; // Pfad zum Boot anpassen!

      // Bootgröße aus CSS-Variable lesen (definiert in :root)
      const boatSize = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--boat-size')
      ) || 20;

      //Chart-Canvas holen
      const ctx = document.getElementById('diagramm').getContext('2d');

      //Scatter-Chart erstellen
      new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Strömung',
            data: scatterData,
            pointStyle: boatImg,
            pointRadius: boatSize,
          }]
        },
        options: {
          responsive: true,
          plugins: {
             legend: { display: false },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.raw.x}: ${context.raw.y} m³/s`;
                }
              }
            }
          },
          scales: {
            x: {
              type: 'category',
              labels: citiesOrder,
              grid: { display: false },
              ticks: { display: false },
              title: { display: false }
            },
            y: {
              min: 10, // Startpunkt etwas unter dem kleinsten Wert
              max: 400, // Endpunkt etwas über dem höchsten Wert
              ticks: {
                display: true,
                stepSize: 50, // Abstand zwischen Labels (visuell gleichmäßig)
                callback: function(value) {
                  // Nur diese drei Labels anzeigen
                  if (value === 125 || value === 200 || value === 245) {
                    return `${value} m³/s`;
                  }
                  return '';
                }
              },
              grid: { display: false },
              title: { display: false }
            }
          }
        },
      plugins: [{
        // Plugin für Stadtnamen unter den Booten
        id: 'cityLabels',
        afterDatasetsDraw(chart) {
          const { ctx } = chart;
          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillStyle =
            getComputedStyle(document.documentElement)
              .getPropertyValue('--primary-color') || '#000' ;
              ctx.font = 
              getComputedStyle(document.body).getPropertyValue('--font-secondary') || '16px sans-serif';

              const meta = chart.getDatasetMeta(0);
              meta.data.forEach((point, i) => {
                const city = citiesOrder[i];
                ctx.fillText(city, point.x, point.y + boatSize + 10);
              });
              ctx.restore();
        }
      }]
      });
    }
    )
    .catch(err => console.error('Fehler beim Laden der Daten:', err));
});