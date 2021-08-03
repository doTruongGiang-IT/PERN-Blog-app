const router = require("express").Router();
const pool = require("../database.js");

router.get("/", async (req, res) => {
    const user = req.query.user;
    const cat = req.query.cat;
    let posts = null;

    try {
        if(user) {
            let postID = await pool.query(`SELECT id FROM users WHERE lower(username)=lower('${user}')`);
            postID = postID.rows[0].id.toString();
            posts = await pool.query(`SELECT * FROM posts WHERE user_id=${postID}`);
        };
        if(cat) {
            let postID = await pool.query(`SELECT id FROM category WHERE lower(name)=lower('${cat}')`);
            postID = postID.rows[0].id.toString();
            posts = await pool.query(`SELECT * FROM posts WHERE category_id=${postID}`);
        };
        if(!user && !cat) {
            posts = await pool.query("SELECT * FROM posts");
        };
        if(!posts) res.status(400).json("Can't get post list");
        res.status(200).json(posts.rows);
    } catch (error) {
        res.status(500).json(error);
        console.error("Get posts error: " + error.message);
    };
});

router.get("/:id", async (req, res) => {
    try {
        const post = await pool.query(`SELECT * FROM posts WHERE id=${req.params.id}`);
        if(!post) res.status(400).json("Can't get post");
        res.status(200).json(post.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error("Get post error: " + error.message);
    };
});

router.post("/", async (req, res) => {
    try {
        let today = new Date();
        const dd = String(today.getDate());
        const mm = String(today.getMonth() + 1); //January is 0!
        const yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        const {title, description, photo, user_id, category_id} = await req.body;
        const newPost = await pool.query("INSERT INTO posts(title, description, photo, user_id, category_id, created_on) VALUES($1,$2,$3,$4,$5,$6) RETURNING *", 
        [title, description, photo, user_id, category_id, today]);
        res.status(200).json(newPost.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error("Create post error: " + error.message);
    }
});

router.put("/:id", async (req, res) => {
    if(req.body.id === Number(req.params.id)) {
        try {
            let today = new Date();
            const dd = String(today.getDate());
            const mm = String(today.getMonth() + 1); //January is 0!
            const yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;

            const post = await req.body;
            const updatePost = await pool.query(`UPDATE posts SET id=${post.id} 
                                                                ${post.title ? `, title='${post.title}'` : ''}
                                                                ${post.description ? `, description='${post.description}'` : ' '}
                                                                ${post.photo ? `, photo='${post.photo}'` : ' '} 
                                                                ${post.user_id ? `, user_id=${post.user_id}` : ' '} 
                                                                ${post.category_id ? `, category_id=${post.category_id}` : ' '} 
                                                                , created_on='${today}'
                                                                WHERE id=${post.id}`);
            res.status(200).json(updatePost);
        } catch (error) {
            res.status(500).json(error);
            console.error("Edit post error: " + error.message);
        };
    }else {
        res.status(401).json("You can only edit your post");
    };
});

router.delete("/:id", async (req, res) => {
    try {
        const deletePost = await pool.query(`DELETE FROM posts WHERE id=${req.params.id}`);
        if(!deletePost) res.status(400).json("Wrong credentials");
        res.status(200).json("Post has been deleted");
    } catch (error) {
        res.status(500).json(error);
        console.error("Delete post error: " + error.message);
    }
});


module.exports = router;