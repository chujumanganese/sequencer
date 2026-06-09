import db from '../model/DB.js';

async function Dashboard(req, res) {

    if(req.session.user){
        const user = req.session.user.username;

        db.get(`SELECT * FROM users WHERE firstname = ?`, [user], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send("Internal Server Error");
            }
            res.render("dashboard", {
                layout: 'dash',
                username: user,
                wallet_address: row.wallet_address, 
                balance: row.wallet_balance, 
                active_days: row.active_days
            });
        });
    }else{
        return res.redirect("/")
    }

}

export default Dashboard;