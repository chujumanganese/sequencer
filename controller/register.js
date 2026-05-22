import Web3 from 'web3';
import db from '../model/DB.js';

const web3 = new Web3(process.env.RPC_URL);

export default function register(req, res){
    try {
        let errors = {};
        const { firstname, 
            lastname, 
            email, 
            phonenumber, 
            country, 
            password1, 
            password2 } = req.body;

        if(!firstname?.trim() || !lastname?.trim() || !email?.trim() || !phonenumber?.trim() || !country?.trim()){
            errors.message = "Fill in the fields";
        }

        if(password1 !== password2){
            errors.message = "Passwords do not match";
        }

        // If errors exist
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                success: false,
                errors: errors.message
            });
        }else{

            db.get( "SELECT * FROM users WHERE email = ?", [email],
            (err, user) => {
                // database error
                if (err) {
                    return res.status(500).render("index", { errors: "Registration error" });
                }
                // user already exists
                if (user) {
                    if (user.email === email) {
                        return res.status(500).render("index", { errors: "Email already exists" });
                    }
                    if (user.password === password2) {
                        return res.status(500).render("index", { errors: "user registration failed please try again" });
                    }
                }
            });

            const {wallet, pkey} = createWallet();

            db.run(
                "INSERT INTO users (firstname, lastname, email, phoneno, country, password, wallet_addr, private_key) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
                [firstname, lastname, email, phonenumber, country, password2, wallet, pkey],
                function (err) {
                    if (err) {return res.status(400).json({ success: false, errors: "Registration failed"}) };

                    req.session.user = {
                        id: 1,
                        email: email,
                        username: firstname,
                        wallet: wallet
                    };

                    res.redirect("/dashboard");
                }
            );
        }
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            errors: "Server error"
        });
    }
}


function createWallet(){
    // code to create wallet
    const wallet = web3.eth.accounts.create();
   return { wallet: wallet.address, pkey: wallet.privateKey };
}