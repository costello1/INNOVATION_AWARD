document.getElementById('clearCookies').addEventListener('click', () => {
    // Funzione per cancellare un cookie specifico
    function deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }

    // Cancellare il cookie 'hasSubmitted'
    deleteCookie('hasSubmitted');
    
    // Mostra un messaggio di conferma
    alert('Tutti i cookie delle risposte sono stati ripuliti.');
});
