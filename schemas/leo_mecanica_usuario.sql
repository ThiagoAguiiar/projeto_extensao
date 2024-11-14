-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: leo_mecanica
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `dataCriacao` datetime DEFAULT NULL,
  `ultimoLogin` datetime DEFAULT NULL,
  `telefone` varchar(255) NOT NULL,
  `ativo` tinyint DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (13,'Thiago Marcelino Aguiar','thiago.m.aguiiar@outlook.com','$2b$10$5ZimJITJvknOeMBwyqIfeel0H6/L4Qcq2ZB8Pz.uxe6b8oMOxqQj2',NULL,'2024-11-09 12:35:33','2024-11-14 08:22:24','(19) 99172-3702',1),(15,'Frank Souza','franksouza@gmail.com','$2b$10$eojZE.tzPSMsSDZqWhElL.2PSrP08e4kDk8fjzYrDmWwXXcMhhkz6',NULL,'2024-11-09 12:36:12',NULL,'(88) 88888-8888',1),(16,'Felipe Adriano','felipeadriano2004@gmail.com','$2b$10$7/JZcK8T4ke6eHW3ZBnNvuozIOIQnXQgSZnr/r1orq.lbje7VEyMK',NULL,'2024-11-09 13:24:36','2024-11-14 08:23:25','(00) 00000-0000',1),(18,'Eduarda Machado','eduarda@gmail.com','$2b$10$E1Rkn3KV/SMA0Znd18KCCeu48tlpljVQJ0LrO7wZ2FRW7QXUeoi9i',NULL,'2024-11-13 16:54:09',NULL,'(55) 00000-0000',0);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-14  8:40:25
