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
    `UserId` INT NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `FK_PlaylistOwner` FOREIGN KEY (`UserId`) REFERENCES user(id)
);

CREATE TABLE `capsule` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `audio_path` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `audio_title` VARCHAR(100) NOT NULL,
    `UserId` INT NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT FK_CapsuleOwner FOREIGN KEY (UserId) REFERENCES user(id)
);

CREATE TABLE playlistCapsule (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    PlaylistId INT NOT NULL,
    CapsuleId INT NOT NULL,
    CONSTRAINT FK_PlaylistId FOREIGN KEY (PlaylistId) REFERENCES playlist(id),
    CONSTRAINT FK_CapsuleId FOREIGN KEY (CapsuleId) REFERENCES capsule(id)
)