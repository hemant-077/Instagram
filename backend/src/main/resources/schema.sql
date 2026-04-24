CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  avatar VARCHAR(255),
  full_name VARCHAR(255),
  last_login VARCHAR(255),
  phone_number VARCHAR(255),
  website VARCHAR(255),
  bio VARCHAR(255),
  PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS posts (
  post_id INT NOT NULL AUTO_INCREMENT,
  post_identifier VARCHAR(255),
  image_url VARCHAR(255),
  user_id INT,
  post_date VARCHAR(255),
  post_location VARCHAR(255),
  post_caption VARCHAR(255),
  post_alt VARCHAR(255),
  post_comments INT DEFAULT 0,
  post_likes INT DEFAULT 0,
  allow_comment TINYINT(1) DEFAULT 1,
  allow_like TINYINT(1) DEFAULT 1,
  PRIMARY KEY (post_id)
);

CREATE TABLE IF NOT EXISTS comments (
  comment_id INT NOT NULL AUTO_INCREMENT,
  post_id INT,
  commenter_id INT,
  comment_content VARCHAR(255),
  comment_timestamp VARCHAR(255),
  commenter_name VARCHAR(255),
  commenter_avatar VARCHAR(255),
  PRIMARY KEY (comment_id)
);

CREATE TABLE IF NOT EXISTS likes (
  like_id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  user_name VARCHAR(255),
  user_avatar VARCHAR(255),
  post_id INT,
  like_timestamp VARCHAR(255),
  PRIMARY KEY (like_id)
);

CREATE TABLE IF NOT EXISTS follows (
  follow_id INT NOT NULL AUTO_INCREMENT,
  follower_id INT,
  followee_id INT,
  follow_timestamp VARCHAR(255),
  PRIMARY KEY (follow_id)
);

CREATE TABLE IF NOT EXISTS saves (
  save_id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  post_id INT,
  save_timestamp VARCHAR(255),
  PRIMARY KEY (save_id)
);

CREATE TABLE IF NOT EXISTS favorites (
  favorite_id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  post_id INT,
  friend_id INT,
  PRIMARY KEY (favorite_id)
);

CREATE TABLE IF NOT EXISTS sessions (
  session_id VARCHAR(255) NOT NULL,
  userA_id INT,
  userB_id INT,
  userA_name VARCHAR(255),
  userB_name VARCHAR(255),
  userA_avatar VARCHAR(255),
  userB_avatar VARCHAR(255),
  session_timestamp VARCHAR(255),
  PRIMARY KEY (session_id)
);

CREATE TABLE IF NOT EXISTS chats (
  chat_id INT NOT NULL AUTO_INCREMENT,
  session_id VARCHAR(255),
  user_id INT,
  chat_content VARCHAR(255),
  chat_timestamp VARCHAR(255),
  PRIMARY KEY (chat_id)
);

CREATE TABLE IF NOT EXISTS tags (
  tag_id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  post_id INT,
  tag_timestamp VARCHAR(255),
  PRIMARY KEY (tag_id)
);
