-- phpMyAdmin SQL Dump
-- version 4.9.6
-- https://www.phpmyadmin.net/
--
-- Host: 979g66.myd.infomaniak.com
-- Generation Time: Oct 13, 2025 at 10:48 AM
-- Server version: 10.11.14-MariaDB-deb11-log
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `979g66_IM_Aare`
--

-- --------------------------------------------------------

--
-- Table structure for table `Aare_Jenny_Sara`
--

CREATE TABLE `Aare_Jenny_Sara` (
  `id` int(11) NOT NULL,
  `location_id` varchar(30) NOT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `flow` decimal(10,0) NOT NULL,
  `flow_text` text NOT NULL,
  `tt_Luft` decimal(10,0) NOT NULL,
  `Temp_H20` decimal(10,0) NOT NULL,
  `temp_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Aare_Jenny_Sara`
--
ALTER TABLE `Aare_Jenny_Sara`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Aare_Jenny_Sara`
--
ALTER TABLE `Aare_Jenny_Sara`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
