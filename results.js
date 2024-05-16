document.addEventListener('DOMContentLoaded', async () => {
    const ctx = document.getElementById('resultsChart').getContext('2d');

    // Funzione per ottenere i dati delle risposte dal backend
    const fetchData = async () => {
        const response = await fetch('https://api-7524dbiyoq-uc.a.run.app/answers');
        const answers = await response.json();
        return answers;
    };

    // Inizializza il grafico
    let chart;

    const updateChart = async () => {
        const answers = await fetchData();
        const labels = Object.keys(answers);
        const data = Object.values(answers);

        if (chart) {
            chart.destroy(); // Distruggi il grafico esistente prima di crearne uno nuovo
        }

        chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    };

    updateChart(); // Aggiorna il grafico all'avvio

    // Funzione per aggiornare il grafico periodicamente
    setInterval(updateChart, 3000); // Aggiorna ogni 5 secondi
});
