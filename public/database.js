const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

let db;
const request = indexedDB.open("budget, 1");

// db version control and update
request.onupgradeneeded = ({ target }) => {
    let db = target.result;
    db.createdObjectStore('pending', { autoIncrement: true });
};

// db submission success logic
request.onsuccess = ({ target }) => {
    db = target.result;

    if (navigator.onLine) {
        checkDatabase();
    }    
};

// error user return message
request.onerror = function (event) {
    console.log("Hmmm something went wrong! " + event.target.errorCode);
};