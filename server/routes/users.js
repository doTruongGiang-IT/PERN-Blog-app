const router = require("express").Router();
const pool = require("../database.js");
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
    if(req.body.id === Number(req.params.id)) {
        try {
            const user = await req.body;
            let updateUser = null;

            if(user.password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPass = await bcrypt.hash(user.password, salt);
                updateUser = await pool.query(`UPDATE users SET${user.username ? ` username='${user.username}', ` : ' '}${user.email ? `email='${user.email}', ` : ' '}password='${hashedPass}' ${user.profile ? `, profile='${user.profile}'` : ''} WHERE id=${req.params.id} RETURNING *;`);
            }else {
                updateUser = await pool.query(`UPDATE users SET id=${user.id}${user.username ? `, username='${user.username}'` : ' '}${user.email ? `, email='${user.email}'` : ' '}${user.profile ? `, profile='${user.profile}'` : ''} WHERE id=${req.params.id} RETURNING *;`);
            };
            // const hashedPass = "";
            // const salt = await bcrypt.genSalt(10);
            // if(user.password) hashedPass = await bcrypt.hash(user.password, salt);
            // const updateUser = null;
            
            // switch(user) {
            //     case user.username === "":
            //         updateUser = await pool.query(`UPDATE users(email, password, profile) SET($2,$3,$4) WHERE id=${user.id};`, [user.email, hashedPass, user.profile]);
            //         if(!updateUser) res.status(400).json("Wrong credentials: username");
            //         break;
            //     case user.email === "":
            //         hashedPass = await bcrypt.hash(user.password, salt);
            //         updateUser = await pool.query(`UPDATE users(username, password, profile) SET($1,$3,$4) WHERE id=${user.id};`, [user.username, hashedPass, user.profile]);
            //         if(!updateUser) res.status(400).json("Wrong credentials: email");                   
            //         break;
            //     case user.password === "":
            //         updateUser = await pool.query(`UPDATE users(username, email, profile) SET($1,$2,$4) WHERE id=${user.id};`, [user.username, user.email, user.profile]);
            //         if(!updateUser) res.status(400).json("Wrong credentials: password");
            //         break;
            //     case user.profile === "":
            //         hashedPass = await bcrypt.hash(user.password, salt);
            //         updateUser = await pool.query(`UPDATE users(username, email, password) SET($1,$2,$3) WHERE id=${user.id};`, [user.username, user.email, hashedPass]);
            //         if(!updateUser) res.status(400).json("Wrong credentials: profile");
            //         break;
            //     default:
            //         break;    
            // };
            if(!updateUser) res.status(400).json("Wrong credentials");
            res.status(200).json(updateUser.rows[0]);
        } catch (error) {
            res.status(500).json(error);
            console.error("Update user error: " + error.message);
        };
    }else {
        res.status(401).json("You can only update your account");
    };
});

router.delete("/:id", async (req, res) => {
    try {
        const deleteUser = await pool.query(`DELETE FROM users WHERE id=${req.params.id}`);
        if(!deleteUser) res.status(400).json("Wrong credentials");
        res.status(200).json("User has been deleted");
    } catch (error) {
        res.status(500).json(error);
        console.error("Delete user error: " + error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await pool.query(`SELECT * FROM users WHERE id=${req.params.id}`);
        if(!user) res.status(400).json("Wrong credentials");
        res.status(200).json(user.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error("Get user error: " + error.message);
    };
})

module.exports = router;