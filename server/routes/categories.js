const router = require("express").Router();
const pool = require("../database.js");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
    try {
        const category = await pool.query("SELECT * FROM category");
        if(!category) res.status(400).json("Can't get category list");
        res.status(200).json(category.rows);
    } catch (error) {
        res.status(500).json(error);
        console.error("Get category error: " + error.message);
    };
});

router.get("/:id", async (req, res) => {
    try {
        const post = await pool.query(`SELECT * FROM category WHERE id=${req.params.id}`);
        if(!post) res.status(400).json("Can't get category");
        res.status(200).json(post.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error("Get category error: " + error.message);
    };
});

router.post("/", async (req, res) => {
    try {
        const {name} = await req.body;
        const newCategory = await pool.query("INSERT INTO category(name) VALUES($1) RETURNING *", [name]);
        res.status(200).json(newCategory.rows[0]);
    } catch (error) {
        res.status(500).json(error);
        console.error("Create category error: " + error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleteCategory = await pool.query(`DELETE FROM category WHERE id=${req.params.id}`);
        if(!deleteCategory) res.status(400).json("Wrong credentials");
        res.status(200).json("Category has been deleted");
    } catch (error) {
        res.status(500).json(error);
        console.error("Delete category error: " + error.message);
    }
});


module.exports = router;