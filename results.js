document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('resultsChart').getContext('2d');

    const answers = JSON.parse(localStorage.getItem('answers')) || {};
    const labels = Object.keys(answers);
    const data = Object.values(answers);

    if (labels.length === 0) {
        document.getElementById('resultsChart').style.display = 'none';
        const message = document.createElement('p');
        message.textContent = 'Non ci sono dati disponibili per il grafico.';
        document.querySelector('.container').appendChild(message);
    } else {
        new Chart(ctx, {
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
    }
});
