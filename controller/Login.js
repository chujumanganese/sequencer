import db from "../model/DB.js";

function Login(req, res) {
    const { email, password } = req.body;

    if (email?.trim() === "" || password?.trim() === "") {
        console.log(email, password);
        return res.json({ error: "Fill in the required fields" });
    }

    db.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, user) => {
            
            if (err) { // database error
                return res.json({ error: "Database error" });
            }

            if (!user) { // user not found
                return res.json({
                    error: "Account does not exist"
                });
            }

            // password check
            if (user.password !== password) {
                return res.json({
                    error: "Incorrect password"
                });
            }

            // session
            req.session.user = {
                id: user.id,
                email: user.email,
                username: user.firstname,
                wallet: user.wallet
            };

            res.json({ success: true });
        }
    );
}

export default Login;