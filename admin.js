document.addEventListener('DOMContentLoaded', () => {
    // Listener per il pulsante di ripulitura dei cookie
    document.getElementById('clearCookies').addEventListener('click', async () => {
        const userId = 'user123'; // Sostituisci con un identificatore univoco per l'utente
        await fetch(`http://localhost:3000/user/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hasSubmitted: false })
        });
        alert('I cookie locali delle risposte sono stati ripuliti.');
    });

    // Listener per il pulsante di ripulitura del grafico
    document.getElementById('clearChart').addEventListener('click', async () => {
        await fetch(`http://localhost:3000/answers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answer: 'RESET' })
        });
        alert('Il grafico è stato ripulito.');
    });
});
