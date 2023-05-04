-- 毕业设计
-- 命令行运行 mysql -u root -p  <../sqls/init.sql

-- 创建菜鸟管理系统数据库
CREATE DATABASE cainiao DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
use cainiao;

-- 创建管理员
CREATE table if not exists admin_user(
    id INT UNSIGNED AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(25) NOT NULL,
    name VARCHAR(20) NOT NULL,
    phone CHAR(11) NOT NULL,
    time DATETIME NOT NULL,
    primary key(id, username)
);

-- 创建顾客表
CREATE table if not exists customer(
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    phone VARCHAR(11) NOT NULL,
    addr CHAR(20),
    time DATETIME NOT NULL,
    primary key(id)
);

-- 创建货物表
CREATE table if not exists goods(
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL ,
    customer_id INT UNSIGNED,
    admin_id INT UNSIGNED,
    FOREIGN KEY(customer_id) REFERENCES customer(id),
    FOREIGN KEY(admin_id) REFERENCES admin_user(id),
    primary key(id)
);

-- 创建仓库
CREATE table if not exists storehouse(
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    primary key(id)
);

-- 库存表
CREATE table if not exists storehouse_goods(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL COMMENT '商品库存ID',
    goods_id INT UNSIGNED NOT NULL COMMENT '商品ID',
    storehouse_id INT UNSIGNED NOT NULL COMMENT '仓库ID',
    is_out TINYINT NOT NULL,
    instock_time DATETIME NOT NULL,
    outstock_time DATETIME,
    FOREIGN KEY(goods_id) REFERENCES goods(id),
    FOREIGN KEY(storehouse_id) REFERENCES storehouse(id),
    primary key(id)
);

-- 初始化出库，默认有20个仓位

INSERT INTO storehouse(id, name) VALUES (1, '1-1');
INSERT INTO storehouse(id, name) VALUES (2, '1-2');
INSERT INTO storehouse(id, name) VALUES (3, '1-3');
INSERT INTO storehouse(id, name) VALUES (4, '1-4');
INSERT INTO storehouse(id, name) VALUES (5, '1-5');
INSERT INTO storehouse(id, name) VALUES (6, '1-6');
INSERT INTO storehouse(id, name) VALUES (7, '1-7');
INSERT INTO storehouse(id, name) VALUES (8, '1-8');
INSERT INTO storehouse(id, name) VALUES (9, '1-9');
INSERT INTO storehouse(id, name) VALUES (10, '1-10');
INSERT INTO storehouse(id, name) VALUES (11, '2-1');
INSERT INTO storehouse(id, name) VALUES (12, '2-2');
INSERT INTO storehouse(id, name) VALUES (13, '2-3');
INSERT INTO storehouse(id, name) VALUES (14, '2-4');
INSERT INTO storehouse(id, name) VALUES (15, '2-5');
INSERT INTO storehouse(id, name) VALUES (16, '2-6');
INSERT INTO storehouse(id, name) VALUES (17, '2-7');
INSERT INTO storehouse(id, name) VALUES (18, '2-8');
INSERT INTO storehouse(id, name) VALUES (19, '2-9');
INSERT INTO storehouse(id, name) VALUES (20, '2-10');
