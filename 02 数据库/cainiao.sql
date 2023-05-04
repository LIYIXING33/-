/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50733
Source Host           : localhost:3306
Source Database       : cainiao

Target Server Type    : MYSQL
Target Server Version : 50733
File Encoding         : 65001

Date: 2022-10-01 15:41:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin_user`
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(25) NOT NULL,
  `name` varchar(20) NOT NULL,
  `phone` char(11) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES ('1', 'admin', 'admin', 'admin', '13512345678', '2022-09-29 15:32:18');

-- ----------------------------
-- Table structure for `customer`
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `addr` char(20) DEFAULT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES ('1', '葡萄', '13512345678', null, '2022-10-01 15:33:00');
INSERT INTO `customer` VALUES ('2', '小明', '电脑一部', null, '2022-10-01 15:36:14');
INSERT INTO `customer` VALUES ('3', '小小明', '笔记本一台', null, '2022-10-01 15:37:36');
INSERT INTO `customer` VALUES ('4', '小明', '13712345678', null, '2022-10-01 15:38:42');

-- ----------------------------
-- Table structure for `goods`
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `customer_id` int(10) unsigned DEFAULT NULL,
  `admin_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `goods_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `goods_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `admin_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', 'IPHONE手机', '1', '1');
INSERT INTO `goods` VALUES ('2', '13612345678', '2', '1');
INSERT INTO `goods` VALUES ('3', '13512345678', '2', '1');
INSERT INTO `goods` VALUES ('4', '13712345678', '3', '1');
INSERT INTO `goods` VALUES ('5', '笔记本一台', '4', '1');

-- ----------------------------
-- Table structure for `storehouse`
-- ----------------------------
DROP TABLE IF EXISTS `storehouse`;
CREATE TABLE `storehouse` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of storehouse
-- ----------------------------
INSERT INTO `storehouse` VALUES ('1', '1-1');
INSERT INTO `storehouse` VALUES ('2', '1-2');
INSERT INTO `storehouse` VALUES ('3', '1-3');
INSERT INTO `storehouse` VALUES ('4', '1-4');
INSERT INTO `storehouse` VALUES ('5', '1-5');
INSERT INTO `storehouse` VALUES ('6', '1-6');
INSERT INTO `storehouse` VALUES ('7', '1-7');
INSERT INTO `storehouse` VALUES ('8', '1-8');
INSERT INTO `storehouse` VALUES ('9', '1-9');
INSERT INTO `storehouse` VALUES ('10', '1-10');
INSERT INTO `storehouse` VALUES ('11', '2-1');
INSERT INTO `storehouse` VALUES ('12', '2-2');
INSERT INTO `storehouse` VALUES ('13', '2-3');
INSERT INTO `storehouse` VALUES ('14', '2-4');
INSERT INTO `storehouse` VALUES ('15', '2-5');
INSERT INTO `storehouse` VALUES ('16', '2-6');
INSERT INTO `storehouse` VALUES ('17', '2-7');
INSERT INTO `storehouse` VALUES ('18', '2-8');
INSERT INTO `storehouse` VALUES ('19', '2-9');
INSERT INTO `storehouse` VALUES ('20', '2-10');

-- ----------------------------
-- Table structure for `storehouse_goods`
-- ----------------------------
DROP TABLE IF EXISTS `storehouse_goods`;
CREATE TABLE `storehouse_goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品库存ID',
  `goods_id` int(10) unsigned NOT NULL COMMENT '商品ID',
  `storehouse_id` int(10) unsigned NOT NULL COMMENT '仓库ID',
  `is_out` tinyint(4) NOT NULL,
  `instock_time` datetime NOT NULL,
  `outstock_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `goods_id` (`goods_id`),
  KEY `storehouse_id` (`storehouse_id`),
  CONSTRAINT `storehouse_goods_ibfk_1` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`),
  CONSTRAINT `storehouse_goods_ibfk_2` FOREIGN KEY (`storehouse_id`) REFERENCES `storehouse` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of storehouse_goods
-- ----------------------------
INSERT INTO `storehouse_goods` VALUES ('1', '1', '1', '1', '2022-10-01 15:33:00', '2022-10-01 15:33:27');
INSERT INTO `storehouse_goods` VALUES ('2', '2', '1', '0', '2022-10-01 15:36:14', null);
INSERT INTO `storehouse_goods` VALUES ('3', '3', '2', '1', '2022-10-01 15:36:25', '2022-10-01 15:38:50');
INSERT INTO `storehouse_goods` VALUES ('4', '4', '3', '0', '2022-10-01 15:37:36', null);
INSERT INTO `storehouse_goods` VALUES ('5', '5', '4', '0', '2022-10-01 15:38:42', null);
