import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.log("DB error:", err.message);
        return;
    }

    db.serialize(async () => {
        const database = new Data(db);

        try {
            await database.fake_data(db);
            console.log("Connected to database, all is working");
        } catch (err) {
            console.error(err.message);
        }
    });
});

class Data{
    constructor(db){
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstname varchar(100) not null,
                lastname varchar(255) not null,
                email varchar(255) not null unique,
                phoneno varchar(30),
                country varchar(20),
                password varchar(255) not null, 
                wallet_address varchar(255),
                private_key varchar(255),
                wallet_balance DECIMAL(10,2) DEFAULT 1020.25,
                active_days INTEGER DEFAULT 0,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `);
        db.run(`
            CREATE TABLE IF NOT EXISTS growth(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                valuedate varchar(20) not null, 
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )      
        `)
    }
    async fake_data(db) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT OR IGNORE INTO users (firstname, lastname, email, phoneno, country, password, wallet_address, private_key, wallet_balance, active_days)
                VALUES
                ('John', 'Doe', 'john.doe@example.com', '+2348011111111', 'Nigeria', '1', '0xA1B2C3D4', 'privkey_1', 1500.50, 5),

                ('Mary', 'Johnson', 'mary.johnson@example.com', '+2348022222222', 'Nigeria', '2', '0xB2C3D4E5', 'privkey_2', 2200.00, 12),

                ('Ahmed', 'Khan', 'ahmed.khan@example.com', '+2348033333333', 'Ghana', '3', '0xC3D4E5F6', 'privkey_3', 980.75, 3),

                ('Grace', 'Adams', 'grace.adams@example.com', '+2348044444444', 'Kenya', '4', '0xD4E5F6G7', 'privkey_4', 3050.10, 20),

                ('Daniel', 'Okafor', 'daniel.okafor@example.com', '+2348055555555', 'Nigeria', '5', '0xE5F6G7H8', 'privkey_5', 500.00, 1); `,
                (err) => {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });
    }
}

export default db;