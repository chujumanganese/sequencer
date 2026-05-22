import db from "./DB.js";

async function balance(email = "p") {
    db.get(
        "SELECT wallet_addr FROM wallets WHERE email = ?", [email],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    error: "Wallet not found"
                });
            }

            res.json(row);

        }
    );
}

export default balance;