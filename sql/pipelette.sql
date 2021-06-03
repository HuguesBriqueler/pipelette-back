CREATE DATABASE IF NOT EXISTS pipelette;

USE pipelette;

CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `created_at` DATETIME NOT NULL,
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
    `audio_file` VARCHAR(255) NOT NULL,
    `audio_url` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `date_record` DATETIME NOT NULL,
    `audio_title` VARCHAR(100) NOT NULL,
    `receiver_firstname` VARCHAR(255) NOT NULL,
    `receiver_lastname` VARCHAR(255) NOT NULL,
    `receiver_mail` VARCHAR(100) NOT NULL,
    `receiver_phone` VARCHAR(25) NOT NULL,
    PRIMARY KEY (`id`)
);