document.addEventListener('DOMContentLoaded', () => {
    // Funzione per cancellare un cookie specifico
    function deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }

    // Listener per il pulsante di ripulitura dei cookie
    document.getElementById('clearCookies').addEventListener('click', () => {
        deleteCookie('hasSubmitted');
        alert('Tutti i cookie delle risposte sono stati ripuliti.');
    });

    // Listener per il pulsante di ripulitura del grafico
    document.getElementById('clearChart').addEventListener('click', () => {
        localStorage.removeItem('answers');
        alert('Il grafico è stato ripulito.');
    });
});
