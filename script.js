document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'unload.php'; // Pfad zu deinem PHP-Skript

    const citiesOrder = [
        "Brienz", "Interlaken", "Thun", "Bern",
        "Hagneck", "Biel", "Olten", "Brugg"
    ];

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            console.log("Rohdaten:", data);

            const today = new Date().toISOString().split('T')[0];

            // Nur heutige Messungen
            const todayData = data.filter(item => item.Timestamp.split(' ')[0] === today);
            console.log("Heutige Daten:", todayData);

            // Letzter Messwert pro Stadt
            const latestPerCity = {};
            todayData.forEach(item => {
                const city = item.location_id;
                if (!latestPerCity[city]) latestPerCity[city] = item;
            });

            const sortedCityData = citiesOrder
                .map(city => latestPerCity[city])
                .filter(item => item !== undefined);

            // Array für Chart
            const scatterData = sortedCityData.map(item => ({
                x: item.location_id,
                y: parseFloat(item.flow)
            }));

            // Durchschnitt berechnen (auf Basis aller historischen Werte)
            const avgFlowPerCity = {};
            data.forEach(item => {
                const city = item.location_id;
                if (!avgFlowPerCity[city]) avgFlowPerCity[city] = [];
                avgFlowPerCity[city].push(parseFloat(item.flow));
            });

            Object.keys(avgFlowPerCity).forEach(city => {
                const values = avgFlowPerCity[city];
                const avg = values.reduce((a, b) => a + b, 0) / values.length;
                avgFlowPerCity[city] = avg.toFixed(1);
            });

            // Boot-Icon
            const boatImg = new Image();
            boatImg.src = 'pics/Boot.png';

            const boatSize = parseInt(
                getComputedStyle(document.documentElement).getPropertyValue('--boat-size')
            ) || 20;

            const ctx = document.getElementById('diagramm').getContext('2d');

            const chart = new Chart(ctx, {
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
                                label: (context) => `${context.raw.x}: ${context.raw.y} m³/s`
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: 'category',
                            labels: citiesOrder,
                            grid: { display: false },
                            ticks: { display: false }
                        },
                        y: {
                            min: 10,
                            max: 400,
                            ticks: {
                                display: true,
                                stepSize: 50,
                                callback: (value) => [125, 200, 245].includes(value) ? `${value} m³/s` : ''
                            },
                            grid: { display: false }
                        }
                    },
                    onClick: (evt, elements) => {
                        if (elements.length > 0) {
                            const index = elements[0].index;
                            const cityData = sortedCityData[index];
                            showCityPopup(cityData);
                        }
                    }
                },
                plugins: [{
                    id: 'cityLabels',
                    afterDatasetsDraw(chart) {
                        const { ctx } = chart;
                        ctx.save();
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'top';
                        ctx.fillStyle =
                            getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#000';
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

            // Popup-Funktion
            function showCityPopup(cityData) {
                const overlay = document.getElementById('popup-overlay');
                overlay.classList.remove('hidden');

                // Fülle Daten
                document.getElementById('popup-city').textContent = cityData.location_id;
                document.getElementById('popup-water').textContent = cityData.Temp_H20 || '-';
                document.getElementById('popup-water-text').textContent = cityData.temp_text || '';
                document.getElementById('popup-air').textContent = cityData.tt_Luft || '-';
                document.getElementById('popup-flow').textContent = cityData.flow || '-';
                document.getElementById('popup-flow-text').textContent = cityData.flow_text || '';

                const avg = avgFlowPerCity[cityData.location_id] || '-';
                document.getElementById('popup-average').textContent = avg;

                // Schließen
                document.getElementById('popup-close').onclick = () => {
                    overlay.classList.add('hidden');
                };

                // Schließen bei Klick außerhalb
                overlay.onclick = (e) => {
                    if (e.target === overlay) overlay.classList.add('hidden');
                };
            }

            // Global speichern, falls später gebraucht
            window.allCityData = data;

        })
        .catch(err => console.error('Fehler beim Laden der Daten:', err));
});
