document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://api-7524dbiyoq-uc.a.run.app'; // Usa l'URL della tua funzione Firebase

    // Listener per il pulsante di ripulitura dei cookie
    document.getElementById('clearCookies').addEventListener('click', async () => {
        const userId = getCookie('userId');
        if (userId) {
            const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ hasSubmitted: false })
            });
            if (response.ok) {
                alert('I cookie locali delle risposte sono stati ripuliti.');
            } else {
                alert('Errore durante la pulizia dei cookie.');
            }
        } else {
            alert('Nessun utente trovato nei cookie.');
        }
    });

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

// Funzione per ottenere il valore di un cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Funzione per impostare un cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}
