DROP DATABASE pipelette;
CREATE DATABASE pipelette;
use pipelette;

CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `mail` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(25) NULL,
    `password` VARCHAR(256) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `playlist` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `capsule` (
    `id` INT NOT NULL AUTO_INCREMENT,

    `audio_path` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `audio_title` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
);