import db from '../model/DB.js'; 
import Web3 from 'web3'; 
const web3 = new Web3(process.env.RPC_URL); 

async function balance(req, res) {
    if(!req.session.user) {
        return res.json({ error: "User not logged in" });
    }
    const user_email = req.session.user.email;
    let wallet;
    
    db.get('SELECT wallet_addr FROM users WHERE email = ?', [user_email], async (err, row) => {
        if (err) {
            return res.json({ error: err }); 
        }
        if (row) {
            wallet = row.wallet_addr;
            const balance = await web3.eth.getBalance(wallet);
            res.json({ balance: balance.toString() });
        }
    });
}

export { balance };