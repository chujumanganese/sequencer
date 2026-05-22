import db from "../model/DB.js";

function Login(req, res) {
    const { email, password } = req.body;

    if (email?.trim() === "" || password?.trim() === "") {
        return res.render("index", { error: "Fill in the required fields" });
    }

    db.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, user) => {
            
            if (err) { // database error
                return res.render("index", { error: "Database error" });
            }

            if (!user) { // user not found
                return res.render("index", {
                    error: "Account does not exist"
                });
            }

            // password check
            if (user.password !== password) {
                return res.render("index", {
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

            res.redirect("/dashboard");
        }
    );
}

export default Login;