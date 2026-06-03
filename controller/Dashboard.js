import db from '../model/DB.js';

async function Dashboard(req, res) {

    if(req.session.user){
        const user = req.session.user.username;
        db.get(`SELECT wallet_address, balance FROM users WHERE username = ?`, [user], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send("Internal Server Error");
            }
            // res.render("dashboard", {username: user, wallet_address: row.wallet_address, balance: row.balance});
        });
    }else{
        return res.redirect("/")
    }

}

export default Dashboard;