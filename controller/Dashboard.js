// import { balance } from "../model/balance_db.js"

async function Dashboard(req, res) {

    // const walletBalance = await balance("uemm") || 0;
    if(req.session.user){
        const user = req.session.user.username;
        res.render("dashboard", {username: user, wallet_address: "wallet"});
    }else{
        return res.redirect("/")
    }

}

export default Dashboard;