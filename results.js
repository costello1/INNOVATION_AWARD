document.addEventListener('DOMContentLoaded', async () => {
    const leaderboard = document.getElementById('leaderboard').querySelector('tbody');
    const toggleAnswersButton = document.getElementById('toggleAnswers');
    let showAnswers = false;

    // Funzione per ottenere i dati delle risposte dal backend
    const fetchData = async () => {
        const response = await fetch('https://api-7524dbiyoq-uc.a.run.app/answers');
        const answers = await response.json();
        return answers;
    };

    const updateLeaderboard = async () => {
        const answers = await fetchData();
        const sortedAnswers = Object.entries(answers).sort((a, b) => b[1] - a[1]);

        const currentRows = Array.from(leaderboard.querySelectorAll('tr'));
        const newRows = sortedAnswers.map(([answer, count], index) => {
            const row = document.createElement('tr');
            const rankCell = document.createElement('td');
            const answerCell = document.createElement('td');
            const countCell = document.createElement('td');

            rankCell.textContent = index + 1;
            answerCell.textContent = answer;
            countCell.textContent = count;

            rankCell.classList.add('rank');
            answerCell.classList.add('answer');
            countCell.classList.add('count');

            if (showAnswers) {
                answerCell.style.filter = 'none'; // Mostra la risposta
            }

            row.appendChild(rankCell);
            row.appendChild(answerCell);
            row.appendChild(countCell);

            return row;
        });

        // Aggiungi animazione di cambiamento del rank
        newRows.forEach((newRow, newIndex) => {
            const answerText = newRow.querySelector('.answer').textContent;
            const currentRow = currentRows.find(row => row.querySelector('.answer').textContent === answerText);
            if (currentRow) {
                const currentIndex = currentRows.indexOf(currentRow);
                if (currentIndex !== newIndex) {
                    currentRow.style.transform = `translateY(${(newIndex - currentIndex) * 100}%)`;
                    setTimeout(() => {
                        currentRow.style.transform = 'translateY(0)';
                        currentRow.querySelector('.rank').textContent = newIndex + 1;
                        leaderboard.insertBefore(currentRow, leaderboard.children[newIndex]);
                    }, 500);
                }
            } else {
                newRow.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    newRow.style.transform = 'translateY(0)';
                    leaderboard.appendChild(newRow);
                }, 10);
            }
        });

        currentRows.forEach((row) => {
            const answerText = row.querySelector('.answer').textContent;
            if (!sortedAnswers.some(([answer]) => answer === answerText)) {
                row.style.transform = 'translateY(100%)';
                setTimeout(() => {
                    row.remove();
                }, 500);
            }
        });
    };

    updateLeaderboard(); // Aggiorna la leaderboard all'avvio

    // Funzione per aggiornare la leaderboard periodicamente
    setInterval(updateLeaderboard, 3000); // Aggiorna ogni 3 secondi

    // Listener per il pulsante delle risposte
    toggleAnswersButton.addEventListener('click', () => {
        showAnswers = !showAnswers;
        const answers = document.querySelectorAll('.answer');
        answers.forEach(answer => {
            answer.style.filter = showAnswers ? 'none' : 'blur(5px)';
        });
        toggleAnswersButton.textContent = showAnswers ? 'Nascondi Risposte' : 'Risposte';
    });
});
