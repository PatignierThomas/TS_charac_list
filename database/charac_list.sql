-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 17 juil. 2024 à 15:43
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `charac_list`
--

-- --------------------------------------------------------

--
-- Structure de la table `characters`
--

DROP TABLE IF EXISTS `characters`;
CREATE TABLE IF NOT EXISTS `characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `src` varchar(50) NOT NULL,
  `alt` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `cat` varchar(30) NOT NULL,
  `description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `characters`
--

INSERT INTO `characters` (`id`, `src`, `alt`, `title`, `cat`, `description`) VALUES
(1, 'avatar-1704983635410.webp', 'Chrom', 'Chrom', 'FE-A', 'Chrom is the main protagonist of Fire Emblem Awakening. He is prince of the Halidom of Ylisse, and the brother of Lissa and Emmeryn. He is also the father of Lucina, a direct descendant of the First Exalt and a distant descendant of Marth the Hero King. Chrom wields the legendary Falchion as his main weapon.'),
(2, 'avatar-1704983464956.webp', 'Tiki', 'Tiki', 'FE-A', 'Tiki is a playable character hailing from the Archanea Series of Fire Emblem and Fire Emblem Awakening. Having debuted early in the series in Fire Emblem: Shadow Dragon and the Blade of Light, Tiki has since become one of the series\' mascots. She has regularly appeared in multiple Fire Emblem games, crossovers, and merchandise across the series\' history.'),
(3, 'Claude.webp', 'Claude', 'Claude', 'FE-3H', 'Claude von Riegan is a playable character and one of the main protagonists in Fire Emblem: Three Houses and Fire Emblem Warriors: Three Hopes. He possesses a minor Crest of Riegan, and is the presumptive heir to the noble house of the same name. Claude is the leader of the Golden Deer house at the Officers Academy, and wields bows as his main weapon. He is 17 years old at the start of the game'),
(4, 'Shamir.webp', 'Shamir', 'Shamir', 'FE-3H', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio dignissimos rerum vero ex cumque nobis! Sapiente error quibusdam id quae tenetur iure aliquam officia fugit mollitia nihil, nostrum, veritatis possimus!'),
(5, 'Shinon.webp', 'Shinon', 'Shinon', 'FE-POR', 'Shinon is a playable character in Fire Emblem: Path of Radiance and Fire Emblem: Radiant Dawn. He is a veteran Archer of the Greil Mercenaries.'),
(6, 'Ike.webp', 'Ike', 'Ike', 'FE-POR', 'Ike is the central character of Fire Emblem: Path of Radiance and one of the main characters in Fire Emblem: Radiant Dawn. He is the son of Greil and Elena, as well as the older brother of Mist. He is also the fearless leader of the Greil Mercenaries and the first main character who is not of noble birth.'),
(7, 'Benoit.webp', 'Benoit', 'Benoit', 'FE-FCQ', 'Benoit is a playable character in Fire Emblem Fates and an ally on the Conquest and Revelation routes.'),
(8, 'avatar-1704980345448.webp', 'Robin pics', 'Robin', 'FE-A', 'Robin (Daraen in the non-English European versions) is a character in Fire Emblem Awakening and one of three main protagonists of the game, serving as the deuteragonist. As an Avatar, their name and appearance are customizable by the player. ');

-- --------------------------------------------------------

--
-- Structure de la table `old_characters`
--

DROP TABLE IF EXISTS `old_characters`;
CREATE TABLE IF NOT EXISTS `old_characters` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `src` varchar(100) NOT NULL,
  `alt` varchar(100) DEFAULT NULL,
  `image_name` varchar(50) NOT NULL,
  `categorie` varchar(50) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` char(60) NOT NULL,
  `isAdmin` tinyint NOT NULL DEFAULT '0',
  `e_mail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `isAdmin`, `e_mail`) VALUES
(8, 'toto2', '$2b$10$NeqQ28N3ORnhvefZs4jSPOwK16XHWtiMP11.i0sa0WzINdMY.yKyK', 0, 'm9iu3g1kz@mozmail.com'),
(9, 'toto', '$2b$10$E4ZkNt3J02OebsKk5LzYFOrW6MvtZcljciUnPLTiRYVrS/DZIAd/a', 1, NULL),
(10, 'toto3', '$2b$10$8UGkZrFcNxbAV4hfYuJjTux6gKOSVQ04H6/XpVYbIDmjDeQcNCZH.', 0, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
