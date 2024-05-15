document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://api-7524dbiyoq-uc.a.run.app'; // Usa l'URL della tua funzione Firebase

    // Listener per il pulsante di ripulitura del grafico
    document.getElementById('clearChart').addEventListener('click', async () => {
        const response = await fetch(`${API_BASE_URL}/answers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answer: 'RESET' })
        });
        if (response.ok) {
            alert('Il grafico è stato ripulito.');
        } else {
            alert('Errore durante la pulizia del grafico.');
        }
    });

    // Listener per il pulsante di ripristino dello stato degli utenti
    document.getElementById('resetUsers').addEventListener('click', async () => {
        const response = await fetch(`${API_BASE_URL}/reset-users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            alert('Lo stato di tutti gli utenti è stato ripristinato.');
        } else {
            alert('Si è verificato un errore durante il ripristino dello stato degli utenti.');
        }
    });
});
