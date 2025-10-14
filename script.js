document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'unload.php'; // Pfad zu deinem PHP-Skript

    const citiesOrder = [
        "brienz", "interlaken", "thun", "bern",
        "hagneck", "biel", "olten", "brugg"
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

            console.log("Letzte Messwerte pro Stadt:", latestPerCity);

            let sortedCityNames = [];
            let sortedFlowValues = [];

            for (const stadt of citiesOrder) {
                if (latestPerCity[stadt]) {
                    sortedCityNames.push(stadt);
                    sortedFlowValues.push(parseFloat(latestPerCity[stadt].flow));
                }
            }

            console.log("Sortierte Stadtnamen:", sortedCityNames);
            console.log("Sortierte Strömungswerte:", sortedFlowValues);

            let xAchse = sortedCityNames;
            let yAchse = sortedFlowValues;

            // Funktion, um Messwerte in Prozent zu transformieren
            // (hier Beispielmapping: 125 → 0.25, 200 → 0.5, 245 → 0.75)
            function mapFlowToPercent(flow) {
                if (flow <= 0) return 0;
                if (flow <= 125) return 0.25;
                if (flow >= 245) return 0.75;

                // Linear zwischen 125 (0.25) und 245 (0.75)
                return 0.25 + ((flow - 125) / (245 - 125)) * (0.75 - 0.25);
            }

            // Messwerte umrechnen
            let yAchseProzent = yAchse.map(mapFlowToPercent);

            let MyChart = document.getElementById('diagramm').getContext('2d');
                new Chart(MyChart, {
                    type: "line",
                    data: {
                    labels: xAchse, 
                    datasets: [
                        {
                            data: yAchseProzent,
                            label: "Strömung"
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            min: 0,    // Unterer Punkt der Achse
                            max: 1,    // Oberer Punkt der Achse
                            ticks: {
                                callback: function(value, index, values) {
                                    // Hier kannst du die Labels genau definieren
                                    if (value === 0) return "0 m³/s";
                                    if (value === 0.25) return "125 m³/s";
                                    if (value === 0.5) return "200 m³/s";
                                    if (value === 0.75) return "245 m³/s";
                                    // return "";
                                },
                                stepSize: 0.25
                            }
                        },
                            x: {
                                ticks: {
                                    autoSkip: false
                                }
                            }
                        },
                         plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        // Tooltip zeigt den echten Messwert an
                                        return `${yAchse[context.dataIndex]} m³/s`;
                                    }
                                }
                            }
                        }
                    }
            });
        })
})

