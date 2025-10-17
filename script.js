document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'unload.php'; // Pfad zu deinem PHP-Skript

    const chartTextColor = getComputedStyle (document.documentElement)
        .getPropertyValue('--primary-color')
        .trim();
    
    const chartFontFamily = getComputedStyle (document.documentElement)
        .getPropertyValue('--font-secondary')
        .trim();

    const chartFontSize = getComputedStyle (document.querySelector('p'))
        .getPropertyValue('font-size')
        .trim();

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

            // Städtenamen für die Anzeige formatieren (erster Buchstabe groß)
            sortedCityNames = sortedCityNames.map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());

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

            //Boot Img
            let bootImg = new Image ();
            
            if (window.innerWidth >= 1024) {
                bootImg.src = 'pics/Boot02_22px.png'; // Desktop
            }
            else {
                bootImg.src = 'pics/Boot02_13px.png'; // Mobile
            }

            bootImg.onload = () => {
                 // Boot Grösse aus css auslesen
                 const boatSize = parseInt(
                     getComputedStyle(document.documentElement)
                         .getPropertyValue('--boat-size')
                         .trim(),
                    
                );
                console.log("Boot Grösse:", boatSize);
            

            let MyChart = document.getElementById('diagramm').getContext('2d');
                new Chart(MyChart, {
                    type: "line",
                    data: {
                    labels: xAchse, 
                    datasets: [
                        {   
                            data: yAchseProzent,
                            label: "Strömung",
                            showLine: false,
                            pointStyle: bootImg,
                            pointRadius: boatSize,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            grid: { display: false },
                            beginAtZero: true,
                            min: 0,
                            max: 1,
                            ticks: {
                                font: {
                                    family: chartFontFamily,
                                    size: parseInt(chartFontSize)
                                },
                                color: chartTextColor,
                                callback: function (value) {
                                    if (value === 0) return "0 m³/s";
                                    if (value === 0.25) return "125 m³/s";
                                    if (value === 0.5) return "200 m³/s";
                                    if (value === 0.75) return "245 m³/s";
                                },
                                stepSize: 0.25
                            }
                        }, 
                        x: {
                            grid: { display: false },
                            offset: true,
                            ticks: {
                                autoSkip: false,
                                font: {
                                    family: chartFontFamily,
                                    size: parseInt(chartFontSize)
                                },
                                color: chartTextColor
                            }
                        }
                        },
                        plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return `${yAchse[context.dataIndex]} m³/s`;
                                }
                            }
                        },
                        legend: {
                            display: false // optional: Legende ausblenden
                        }
                    }
                }
            });
        }
    });
});

//Popup Script

document.addEventListener('DOMContentLoaded', () => {
    //warten, bis Chart existiert
    const waitForChart = setInterval(() => {
        const chartElement = document.getElementById('diagramm');
        const chartInstance = Chart.getChart(chartElement);

        if (chartInstance) {
            clearInterval(waitForChart);
            console.log("Chart ist bereit, Popup-Script wird initialisiert.");

            chartElement.addEventListener('click', (event) => {
                const points = chartInstance.getElementsAtEventForMode(
                    event, 
                    'nearest', //Nächster Punkt
                    { intersect: true }, // Nur wenn direkt auf Punkt geklickt
                    false
                );
                
                if (points.length) {
                    const firstPoint = points[0];
                    const datasetIndex = firstPoint.datasetIndex;
                    const dataIndex = firstPoint.index;

                    const label = chartInstance.data.labels[dataIndex];
                    const value = chartInstance.data.datasets[datasetIndex].data[dataIndex];

                    console.log('Klick auf Stadt: ${label} {Strömung: $value})');

                    // Beispiel: Popup einblenden
                    const overlay = document.getElementById('popup-overlay');
                    const popupCity = document.getElementById('popup-city');
                    const popupFlow = document.getElementById('popup-flow');

                    if (overlay && popupCity && popupFlow) {
                        popupCity.textContent = label;
                        popupFlow.textContent = (value).toFixed(0); 
                        overlay.classList.remove('hidden');
                    }
                }   
            });

            const closeBtn = document.getElementById('popup-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    document.getElementById('popup-overlay')?.classList.add('hidden');
                });
            }
        }
    }, 300); // Überprüfe alle 100ms
});