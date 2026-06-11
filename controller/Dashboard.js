import db from '../model/DB.js';

async function Dashboard(req, res) {
    // increase active days

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
                bonus: row.wallet_balance > 1 ? false : true,
                wallet_address: row.wallet_address, 
                balance: row.wallet_balance,
                dailyRate: 0.50,
                todayProfit: 5.15,
                active_days: row.active_days,
                totalEarned: 2,
                growthDate: 'Jun 10',
                growthRate: 0.50,
                growthAmount: 5.33
            });
        });
    }else{
        return res.redirect("/")
    }

}

export default Dashboard;