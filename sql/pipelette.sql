DROP DATABASE IF EXISTS pipelette;
CREATE DATABASE pipelette;
USE pipelette;

CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(256) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `playlist` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_playlist_owner` FOREIGN KEY (`user_id`) REFERENCES user(id)
);

CREATE TABLE `capsule` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `audio_path` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `audio_title` VARCHAR(100) NOT NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT fk_capsule_Owner FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE playlistCapsule (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    playlist_id INT NOT NULL,
    capsule_id INT NOT NULL,
    CONSTRAINT fk_playlist_id FOREIGN KEY (playlist_id) REFERENCES playlist(id),
    CONSTRAINT fk_capsule_id FOREIGN KEY (capsule_id) REFERENCES capsule(id)
)