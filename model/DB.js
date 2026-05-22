import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.log("DB error:", err.message);
    } else {
        console.log("Connected to SQLite");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname varchar(100) not null,
        lastname varchar(255) not null,
        email varchar(255) not null,
        phoneno varchar(30),
        country varchar(20),
        password varchar(255) not null,
        wallet_addr varchar(255),
        private_key varchar(255),
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

export default db;