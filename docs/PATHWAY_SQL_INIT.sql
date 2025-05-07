-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: bogus_data
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `CLIENT_VIEW`
--

DROP TABLE IF EXISTS `CLIENT_VIEW`;
/*!50001 DROP VIEW IF EXISTS `CLIENT_VIEW`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `CLIENT_VIEW` AS SELECT 
 1 AS `ID`,
 1 AS `Completion Status`,
 1 AS `Training Title`,
 1 AS `Completion Date`,
 1 AS `Relative Date`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `DASHBOARD_VIEW`
--

DROP TABLE IF EXISTS `DASHBOARD_VIEW`;
/*!50001 DROP VIEW IF EXISTS `DASHBOARD_VIEW`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `DASHBOARD_VIEW` AS SELECT 
 1 AS `Full Name`,
 1 AS `Not Started`,
 1 AS `Completed`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `EMPLOYEE_DATA`
--

DROP TABLE IF EXISTS `EMPLOYEE_DATA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EMPLOYEE_DATA` (
  `EMPLOYEE_ID` int NOT NULL AUTO_INCREMENT,
  `FIRST_NAME` text,
  `LAST_NAME` text,
  `DESIGNATION` enum('NEW','CURRENT','HR') NOT NULL DEFAULT 'NEW' COMMENT 'E M P L O Y E E = 8 char N E W = 3 char C U R R E N T = 7 char',
  `EMAIL` varchar(45) DEFAULT NULL,
  `PHONE` varchar(10) DEFAULT NULL,
  `USERNAME` varchar(45) NOT NULL,
  `PASS` varchar(256) NOT NULL,
  PRIMARY KEY (`EMPLOYEE_ID`),
  KEY `fk_designation` (`DESIGNATION`),
  KEY `fk_USERNAME_idx` (`USERNAME`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `FILTER_RESULTS`
--

DROP TABLE IF EXISTS `FILTER_RESULTS`;
/*!50001 DROP VIEW IF EXISTS `FILTER_RESULTS`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `FILTER_RESULTS` AS SELECT 
 1 AS `First Name`,
 1 AS `Last Name`,
 1 AS `Training Title`,
 1 AS `Category`,
 1 AS `Completion Status`,
 1 AS `Completion Date`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `ID_NAMES`
--

DROP TABLE IF EXISTS `ID_NAMES`;
/*!50001 DROP VIEW IF EXISTS `ID_NAMES`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `ID_NAMES` AS SELECT 
 1 AS `TRAINING_ID`,
 1 AS `EMPLOYEE_ID`,
 1 AS `USERNAME`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `NICERLOOKINGTABLE`
--

DROP TABLE IF EXISTS `NICERLOOKINGTABLE`;
/*!50001 DROP VIEW IF EXISTS `NICERLOOKINGTABLE`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `NICERLOOKINGTABLE` AS SELECT 
 1 AS `ID`,
 1 AS `Employee ID`,
 1 AS `First Name`,
 1 AS `Last Name`,
 1 AS `Username`,
 1 AS `Completion Status`,
 1 AS `Training Title`,
 1 AS `Category`,
 1 AS `Completion Date`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `TRAINING_PROGRAM`
--

DROP TABLE IF EXISTS `TRAINING_PROGRAM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TRAINING_PROGRAM` (
  `TRAINING_ID` int NOT NULL AUTO_INCREMENT COMMENT 'Unique id for that particular video or quiz or whatever',
  `TITLE` varchar(128) NOT NULL COMMENT 'Title of video',
  `CATEGORY` enum('General','Cohort Training','Skills Workshop') NOT NULL DEFAULT 'General' COMMENT 'Reasonably self explanatory',
  PRIMARY KEY (`TRAINING_ID`),
  UNIQUE KEY `TRAINING_ID_UNIQUE` (`TRAINING_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TRAINING_STATUS`
--

DROP TABLE IF EXISTS `TRAINING_STATUS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TRAINING_STATUS` (
  `STATUS_ID` int NOT NULL AUTO_INCREMENT,
  `TRAINING_ID` int NOT NULL,
  `COMPLETION_STATUS` int DEFAULT NULL COMMENT '0 -> Not completed, 1 -> Complete',
  `EMPLOYEE_ID` int NOT NULL,
  `COMPLETION_DATE` date DEFAULT NULL,
  PRIMARY KEY (`STATUS_ID`),
  UNIQUE KEY `EMPLOYEE_ID` (`EMPLOYEE_ID`,`TRAINING_ID`),
  KEY `TRAINING_ID_idx` (`TRAINING_ID`),
  CONSTRAINT `EMPLOYEE_ID` FOREIGN KEY (`EMPLOYEE_ID`) REFERENCES `EMPLOYEE_DATA` (`EMPLOYEE_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `TRAINING_ID` FOREIGN KEY (`TRAINING_ID`) REFERENCES `TRAINING_PROGRAM` (`TRAINING_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=498 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `USERPASS`
--

DROP TABLE IF EXISTS `USERPASS`;
/*!50001 DROP VIEW IF EXISTS `USERPASS`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `USERPASS` AS SELECT 
 1 AS `USERNAME`,
 1 AS `PASS`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `no_passes_for_you`
--

DROP TABLE IF EXISTS `no_passes_for_you`;
/*!50001 DROP VIEW IF EXISTS `no_passes_for_you`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `no_passes_for_you` AS SELECT 
 1 AS `EMPLOYEE_ID`,
 1 AS `FIRST_NAME`,
 1 AS `LAST_NAME`,
 1 AS `DESIGNATION`,
 1 AS `EMAIL`,
 1 AS `PHONE`,
 1 AS `USERNAME`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `CLIENT_VIEW`
--

/*!50001 DROP VIEW IF EXISTS `CLIENT_VIEW`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`dinnerbird`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `CLIENT_VIEW` AS select `TRAINING_STATUS`.`TRAINING_ID` AS `ID`,((case `TRAINING_STATUS`.`COMPLETION_STATUS` when 0 then 'Not Started' when 1 then 'Complete' when 2 then 'Incomplete' else 'Unknown' end) collate utf8mb4_0900_ai_ci) AS `Completion Status`,`TRAINING_PROGRAM`.`TITLE` AS `Training Title`,date_format(`TRAINING_STATUS`.`COMPLETION_DATE`,'%M %d, %Y') AS `Completion Date`,(case when ((to_days(curdate()) - to_days(`TRAINING_STATUS`.`COMPLETION_DATE`)) = 0) then 'Today' when ((to_days(curdate()) - to_days(`TRAINING_STATUS`.`COMPLETION_DATE`)) = 1) then 'Yesterday' when ((to_days(curdate()) - to_days(`TRAINING_STATUS`.`COMPLETION_DATE`)) < 7) then concat((to_days(curdate()) - to_days(`TRAINING_STATUS`.`COMPLETION_DATE`)),' days ago') when ((to_days(curdate()) - to_days(`TRAINING_STATUS`.`COMPLETION_DATE`)) < 30) then concat(floor(((to_days(curdate()) - to_days(`TRAINING_STATUS`.`COMPLETION_DATE`)) / 7)),' weeks ago') when ((to_days(curdate()) - to_days(`TRAINING_STATUS`.`COMPLETION_DATE`)) < 365) then concat(floor(((to_days(curdate()) - to_days(`TRAINING_STATUS`.`COMPLETION_DATE`)) / 30)),' months ago') else concat(floor(((to_days(curdate()) - to_days(`TRAINING_STATUS`.`COMPLETION_DATE`)) / 365)),' years ago') end) AS `Relative Date` from ((`EMPLOYEE_DATA` join `TRAINING_STATUS` on((`EMPLOYEE_DATA`.`EMPLOYEE_ID` = `TRAINING_STATUS`.`EMPLOYEE_ID`))) join `TRAINING_PROGRAM` on((`TRAINING_STATUS`.`TRAINING_ID` = `TRAINING_PROGRAM`.`TRAINING_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `DASHBOARD_VIEW`
--

/*!50001 DROP VIEW IF EXISTS `DASHBOARD_VIEW`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`dinnerbird`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `DASHBOARD_VIEW` AS select concat(`NICERLOOKINGTABLE`.`First Name`,' ',`NICERLOOKINGTABLE`.`Last Name`) AS `Full Name`,concat(count((case when (`NICERLOOKINGTABLE`.`Completion Status` = 'Not Started') then 1 end)),' items') AS `Not Started`,concat(count((case when (`NICERLOOKINGTABLE`.`Completion Status` = 'Complete') then 1 end)),' items') AS `Completed` from `NICERLOOKINGTABLE` group by `NICERLOOKINGTABLE`.`First Name`,`NICERLOOKINGTABLE`.`Last Name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `FILTER_RESULTS`
--

/*!50001 DROP VIEW IF EXISTS `FILTER_RESULTS`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`dinnerbird`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `FILTER_RESULTS` AS select `NICERLOOKINGTABLE`.`First Name` AS `First Name`,`NICERLOOKINGTABLE`.`Last Name` AS `Last Name`,`NICERLOOKINGTABLE`.`Training Title` AS `Training Title`,`NICERLOOKINGTABLE`.`Category` AS `Category`,`NICERLOOKINGTABLE`.`Completion Status` AS `Completion Status`,`NICERLOOKINGTABLE`.`Completion Date` AS `Completion Date` from `NICERLOOKINGTABLE` order by `NICERLOOKINGTABLE`.`Last Name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `ID_NAMES`
--

/*!50001 DROP VIEW IF EXISTS `ID_NAMES`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`dinnerbird`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ID_NAMES` AS select `NICERLOOKINGTABLE`.`ID` AS `TRAINING_ID`,`NICERLOOKINGTABLE`.`Employee ID` AS `EMPLOYEE_ID`,`NICERLOOKINGTABLE`.`Username` AS `USERNAME` from `NICERLOOKINGTABLE` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `NICERLOOKINGTABLE`
--

/*!50001 DROP VIEW IF EXISTS `NICERLOOKINGTABLE`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`dinnerbird`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `NICERLOOKINGTABLE` AS select `TRAINING_STATUS`.`TRAINING_ID` AS `ID`,`EMPLOYEE_DATA`.`EMPLOYEE_ID` AS `Employee ID`,`EMPLOYEE_DATA`.`FIRST_NAME` AS `First Name`,`EMPLOYEE_DATA`.`LAST_NAME` AS `Last Name`,`EMPLOYEE_DATA`.`USERNAME` AS `Username`,((case `TRAINING_STATUS`.`COMPLETION_STATUS` when 0 then 'Incomplete' when 1 then 'Complete' else 'Unknown' end) collate utf8mb4_0900_ai_ci) AS `Completion Status`,`TRAINING_PROGRAM`.`TITLE` AS `Training Title`,`TRAINING_PROGRAM`.`CATEGORY` AS `Category`,date_format(`TRAINING_STATUS`.`COMPLETION_DATE`,'%M %d, %Y') AS `Completion Date` from ((`EMPLOYEE_DATA` join `TRAINING_STATUS` on((`EMPLOYEE_DATA`.`EMPLOYEE_ID` = `TRAINING_STATUS`.`EMPLOYEE_ID`))) join `TRAINING_PROGRAM` on((`TRAINING_STATUS`.`TRAINING_ID` = `TRAINING_PROGRAM`.`TRAINING_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `USERPASS`
--

/*!50001 DROP VIEW IF EXISTS `USERPASS`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`dinnerbird`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `USERPASS` AS select `EMPLOYEE_DATA`.`USERNAME` AS `USERNAME`,`EMPLOYEE_DATA`.`PASS` AS `PASS` from `EMPLOYEE_DATA` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `no_passes_for_you`
--

/*!50001 DROP VIEW IF EXISTS `no_passes_for_you`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`dinnerbird`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `no_passes_for_you` AS select `EMPLOYEE_DATA`.`EMPLOYEE_ID` AS `EMPLOYEE_ID`,`EMPLOYEE_DATA`.`FIRST_NAME` AS `FIRST_NAME`,`EMPLOYEE_DATA`.`LAST_NAME` AS `LAST_NAME`,`EMPLOYEE_DATA`.`DESIGNATION` AS `DESIGNATION`,`EMPLOYEE_DATA`.`EMAIL` AS `EMAIL`,concat('(',substr(`EMPLOYEE_DATA`.`PHONE`,1,3),') ',substr(`EMPLOYEE_DATA`.`PHONE`,4,3),'-',substr(`EMPLOYEE_DATA`.`PHONE`,7,4)) AS `PHONE`,`EMPLOYEE_DATA`.`USERNAME` AS `USERNAME` from `EMPLOYEE_DATA` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-07 16:54:50
