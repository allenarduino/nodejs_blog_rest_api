const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const db = require("../database");
const path = require("path");
const auth = require("../middlewares/auth");

//Store uploaded image in a folder
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function(req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

//Create Post
const upload = multer({
  storage: storage
});
const type = upload.single("post_media");
router.post("/create_post", type, auth, function(req, res) {
  console.log(req.file);
  const target_path = req.file.path;
  const post_title = req.body.post_title;
  const post_body = req.body.post_body;
  const user_id = req.user_id;
  const category_id = req.body.category_id;

  const inputData = [post_title, target_path, post_body, user_id, category_id];
  const sql = `INSERT INTO
  posts(post_title,post_media,post_body,author_id) 
  VALUES (?,?,?,?)`;

  db.query(sql, inputData, function(err, data) {
    console.log(inputData);
    res.status(200).json({
      message: "Post Created"
    });
  });
});

// For displaying posts on homepage
router.get("/posts", (req, res) => {
  const sql = `
    SELECT 
    posts.post_id,posts.post_title,
    posts.post_media,posts.post_body,
    posts.author_id,
    posts.created_at,
    (SELECT COUNT(*) FROM post_comments WHERE post_comments.post_id=posts.post_id)
    as totalcomments,users.user_img,users.full_name,users.user_id FROM
    posts,users WHERE users.user_id=posts.author_id ORDER BY posts.created_at DESC
    `;
  db.query(sql, function(err, data) {
    res.status(200).json({
      posts: data
    });
  });
});

// For displaying posts with a specific id
router.get("/posts/:post_id", (req, res) => {
  post_id = req.params.post_id;
  const sql = `
    SELECT 
    posts.post_id,posts.post_title,
    posts.post_media,posts.post_body,
    posts.author_id,
    posts.created_at,
    (SELECT COUNT(*) FROM post_comments WHERE post_comments.post_id=posts.post_id)
    as totalcomments,users.user_img,users.full_name,users.user_id FROM
    posts,users WHERE users.user_id=posts.author_id AND posts.post_id=${post_id} ORDER BY posts.created_at DESC
    `;
  db.query(sql, function(err, data) {
    res.status(200).json({
      posts: data
    });
  });
});

//For user to delete a post
router.delete("/delete_post", (req, res) => {
  const post_id = req.body.post_id;
  console.log(post_id);
  const sql = `DELETE FROM posts WHERE posts.post_id=?`;
  db.query(sql, [post_id], function() {
    res.status(200).json({
      mesaage: "Post Deleted"
    });
  });
});

//For creating comment under a post
router.post("/create_comment/:post_id", auth, (req, res) => {
  const comment_text = req.body.comment_text;
  const user_id = req.user_id;
  const post_id = req.params.post_id;
  const inputData = [comment_text, post_id, user_id];

  const sql = `INSERT INTO post_comments(text,post_id,user_id) 
  VALUES (?,?,?)`;
  db.query(sql, inputData, function(err) {
    console.log(comment_text);
    console.log(err);
    res.status(200).json({
      mesaage: "Comment Created"
    });
  });
});

//For fetching comments under a post
router.get("/fetch_comments/:post_id", (req, res) => {
  const post_id = req.params.post_id;
  const sql = `SELECT* FROM post_comments,users WHERE post_comments.post_id=?
  AND users.user_id=post_comments.user_id ORDER BY post_comments.created_at DESC`;
  db.query(sql, [post_id], function(err, data) {
    res.status(200).json({
      comments: data
    });
  });
});

//For user to delete a comment
router.delete("/delete_comment", (req, res) => {
  const comment_id = req.body.comment_id;
  console.log(comment_id);
  const sql = `DELETE FROM post_comments WHERE comment_id=${comment_id}`;

  db.query(sql, function(err, data) {
    console.log(err);
    res.status(200).json({
      mesaage: "Comment Deleted"
    });
  });
});

module.exports = router;
