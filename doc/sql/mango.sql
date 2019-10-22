/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : mango

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 13/10/2019 11:43:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config`  (
  `sys_config_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sort` decimal(10, 0) NULL DEFAULT NULL,
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `last_update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `last_update_time` datetime(0) NULL DEFAULT NULL,
  `del_flag` tinyint(4) NULL DEFAULT NULL,
  PRIMARY KEY (`sys_config_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept`  (
  `dept_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `dept_ name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '机构名称',
  `parent_id` bigint(20) NOT NULL COMMENT '上级机构  一级机构为0',
  `order_num` int(10) NULL DEFAULT NULL COMMENT '排序',
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `last_update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '更新人',
  `last_update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` tinyint(4) NULL DEFAULT NULL COMMENT '是否删除  -1:已删除   0:正常',
  PRIMARY KEY (`dept_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_dict
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict`  (
  `sys_dict_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sort` decimal(10, 0) NULL DEFAULT NULL,
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `last_update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `last_update_time` datetime(0) NULL DEFAULT NULL,
  `del_flag` tinyint(4) NULL DEFAULT NULL,
  PRIMARY KEY (`sys_dict_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
INSERT INTO `sys_dict` VALUES (1, 'string', 'string', 'string', 'string', 0, 'string', '2019-10-05 06:28:03', 'string', '2019-10-05 06:28:03', 0);

-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log`  (
  `sys_log_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `operation` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `method` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `params` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `time` bigint(20) NULL DEFAULT NULL,
  `ip` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `last_update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `last_update_time` datetime(0) NULL DEFAULT NULL,
  `del_flag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`sys_log_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_login_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_login_log`;
CREATE TABLE `sys_login_log`  (
  `sys_login_log_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '登录状态',
  `ip` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `last_update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `last_update_time` datetime(0) NULL DEFAULT NULL,
  `del_flag` tinyint(4) NULL DEFAULT NULL,
  PRIMARY KEY (`sys_login_log_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `menu_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单名称',
  `parent_id` bigint(20) NOT NULL COMMENT '上级机构  一级机构为0',
  `menu_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `menu_perrms` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '授权(多个用逗号分隔，如: sys:user:add, sys:user:edit)',
  `menu_type` int(10) NULL DEFAULT NULL COMMENT '类型  0:目录   1:菜单  2: 按钮',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `order_num` int(11) NULL DEFAULT NULL COMMENT '排序',
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `last_update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '更新人',
  `last_update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int(10) NULL DEFAULT NULL COMMENT '是否删除  -1:已删除   0:正常',
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, '系统管理', 0, NULL, NULL, 0, 'el-icon-setting', 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (2, '用户管理', 1, '/sys/user', NULL, 1, 'el-icon-service', 1, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (3, '查看', 2, NULL, 'sys:user:view', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (4, '新增', 2, NULL, 'sys:user:add', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (5, '修改', 2, NULL, 'sys:user:edit', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (6, '删除', 2, NULL, 'sys:user:delete', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (7, '机构管理', 1, '/sys/dept', NULL, 1, 'el-icon-news', 2, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (8, '查看', 7, NULL, 'sys:dept:view', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (9, '新增', 7, NULL, 'sys:dept:add', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (10, '修改', 7, NULL, 'sys:dept:edit', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (11, '删除', 7, NULL, 'sys:dept:delete', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (12, '角色管理', 1, '/sys/role', NULL, 1, 'el-icon-view', 4, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (13, '查看', 12, NULL, 'sys:role:view', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (14, '新增', 12, NULL, 'sys:role:add', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (15, '修改', 12, NULL, 'sys:role:edit', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (16, '删除', 12, NULL, 'sys:role:delete', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (17, '菜单管理', 1, '/sys/menu', NULL, 1, 'el-icon-menu', 5, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (18, '查看', 17, NULL, 'sys:menu:view', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (19, '新增', 17, NULL, 'sys:menu:add', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (20, '修改', 17, NULL, 'sys:menu:edit', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (21, '删除', 17, NULL, 'sys:menu:delete', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (22, '字典管理', 1, '/sys/dict', NULL, 1, 'el-icon-edit-outline', 7, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (23, '查看', 22, NULL, 'sys:dict:view', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (24, '新增', 22, NULL, 'sys:dict:add', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (25, '修改', 22, NULL, 'sys:dict:edit', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (26, '删除', 22, NULL, 'sys:dict:delete', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (27, '系统配置', 1, '/sys/config', NULL, 1, 'el-icon-edit-outline', 7, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (28, '查看', 27, NULL, 'sys:config:view', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (29, '新增', 27, NULL, 'sys:config:add', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (30, '修改', 27, NULL, 'sys:config:edit', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (31, '删除', 27, NULL, 'sys:config:delete', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (32, '登录日志', 1, '/sys/loginlog', NULL, 1, 'el-icon-info', 8, NULL, NULL, 'admin', '2018-09-23 19:32:28', 0);
INSERT INTO `sys_menu` VALUES (33, '查看', 32, NULL, 'sys:loginlog:view', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (34, '删除', 32, NULL, 'sys:loginlog:delete', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (35, '操作日志', 1, '/sys/log', NULL, 1, 'el-icon-info', 8, NULL, NULL, 'admin', '2018-09-23 19:32:28', 0);
INSERT INTO `sys_menu` VALUES (36, '查看', 35, NULL, 'sys:log:view', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (37, '删除', 35, NULL, 'sys:log:delete', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (38, '系统监控', 0, '', '', 0, 'el-icon-info', 4, 'admin', '2018-12-27 10:57:29', 'admin', '2019-01-10 17:31:04', 0);
INSERT INTO `sys_menu` VALUES (39, '数据监控', 38, 'http://127.0.0.1:8001/druid/login.html', NULL, 1, 'el-icon-warning', 0, NULL, NULL, 'admin', '2018-12-27 11:03:45', 0);
INSERT INTO `sys_menu` VALUES (40, '查看', 39, NULL, 'sys:druid:view', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (41, '服务监控', 38, 'http://127.0.0.1:8000/', NULL, 1, 'el-icon-view', 1, 'admin', '2018-11-02 20:02:15', 'admin', '2018-12-27 11:03:53', 0);
INSERT INTO `sys_menu` VALUES (42, '查看', 41, NULL, 'sys:monitor:view', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (43, '服务治理', 0, '', '', 0, 'el-icon-service', 2, 'admin', '2018-12-27 11:05:48', 'admin', '2018-12-27 11:06:39', 0);
INSERT INTO `sys_menu` VALUES (44, '注册中心', 43, 'http://127.0.0.1:8500', NULL, 1, ' el-icon-view', 0, 'admin', '2018-11-03 11:06:48', 'admin', '2018-12-27 11:08:11', 0);
INSERT INTO `sys_menu` VALUES (45, '查看', 44, NULL, 'sys:consul:view', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (46, '接口文档', 0, 'http://127.0.0.1:8001/swagger-ui.html', NULL, 1, 'el-icon-document', 3, NULL, NULL, 'admin', '2018-12-27 11:04:18', 0);
INSERT INTO `sys_menu` VALUES (47, '查看', 46, NULL, 'sys:swagger:view', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (48, '代码生成', 0, '/generator/generator', '', 1, 'el-icon-star-on', 5, 'admin', '2018-11-15 14:39:30', 'admin', '2018-11-15 14:56:18', 0);
INSERT INTO `sys_menu` VALUES (49, '查看', 48, NULL, 'sys:generator:view', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (50, '在线用户', 0, '/sys/online', '', 1, 'el-icon-view', 5, 'admin', '2018-11-15 14:39:30', 'admin', '2018-11-15 14:56:18', 0);
INSERT INTO `sys_menu` VALUES (51, '查看', 50, NULL, 'sys:online:view', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (52, '使用案例', 0, NULL, NULL, 0, 'el-icon-picture-outline', 6, NULL, NULL, 'admin', '2018-11-15 14:39:43', 0);
INSERT INTO `sys_menu` VALUES (53, '国际化', 52, '/demo/i18n', NULL, 1, 'el-icon-edit', 1, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (54, '查看', 53, NULL, 'sys:dict:view', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (55, '换皮肤', 52, '/demo/theme', NULL, 1, 'el-icon-picture', 2, NULL, NULL, NULL, NULL, 0);
INSERT INTO `sys_menu` VALUES (56, '查看', 55, NULL, 'sys:dict:view', 2, NULL, 0, NULL, NULL, NULL, NULL, 0);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `role_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名称',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `last_update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '更新人',
  `last_update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` tinyint(4) NULL DEFAULT NULL COMMENT '是否删除  -1:已删除   0:正常',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, 'admin', '超级管理员', 'admin', '2019-01-19 11:11:11', 'admin', '2019-01-19 19:07:18', 0);
INSERT INTO `sys_role` VALUES (2, 'mng', '项目经理', 'admin', '2019-01-19 11:11:11', 'admin', '2019-01-19 11:39:28', 0);
INSERT INTO `sys_role` VALUES (3, 'dev', '开发人员', 'admin', '2019-01-19 11:11:11', 'admin', '2019-01-19 11:39:28', 0);
INSERT INTO `sys_role` VALUES (4, 'test', '测试人员', 'admin', '2019-01-19 11:11:11', 'admin', '2019-01-19 11:11:11', 0);

-- ----------------------------
-- Table structure for sys_role_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_dept`;
CREATE TABLE `sys_role_dept`  (
  `sys_role_dept_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` bigint(20) NOT NULL,
  `dept_id` bigint(20) NULL DEFAULT NULL,
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `last_update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `last_update_time` datetime(0) NULL DEFAULT NULL,
  `del_flag` tinyint(4) NULL DEFAULT NULL,
  PRIMARY KEY (`sys_role_dept_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `role_id` bigint(20) NULL DEFAULT NULL COMMENT '角色ID',
  `menu_id` bigint(20) NULL DEFAULT NULL COMMENT '菜单ID',
  `create_by` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `last_update_by` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '更新人',
  `last_update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 626 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '角色菜单' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (431, 8, 1, 'admin', '2018-09-23 19:55:08', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (432, 8, 2, 'admin', '2018-09-23 19:55:08', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (433, 8, 9, 'admin', '2018-09-23 19:55:08', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (434, 8, 3, 'admin', '2018-09-23 19:55:08', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (435, 8, 13, 'admin', '2018-09-23 19:55:08', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (436, 8, 4, 'admin', '2018-09-23 19:55:08', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (437, 8, 17, 'admin', '2018-09-23 19:55:08', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (438, 8, 5, 'admin', '2018-09-23 19:55:08', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (439, 8, 21, 'admin', '2018-09-23 19:55:08', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (440, 8, 7, 'admin', '2018-09-23 19:55:08', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (441, 8, 31, 'admin', '2018-09-23 19:55:08', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (442, 8, 8, 'admin', '2018-09-23 19:55:08', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (443, 8, 6, 'admin', '2018-09-23 19:55:08', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (444, 8, 35, 'admin', '2018-09-23 19:55:08', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (469, 2, 1, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (470, 2, 2, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (472, 2, 4, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (473, 2, 5, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (474, 2, 6, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (475, 2, 7, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (476, 2, 8, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (477, 2, 9, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (478, 2, 10, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (479, 2, 11, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (480, 2, 12, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (481, 2, 13, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (482, 2, 14, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (483, 2, 15, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (484, 2, 16, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (485, 2, 17, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (486, 2, 18, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (487, 2, 19, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (488, 2, 20, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (489, 2, 21, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (490, 2, 22, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (491, 2, 23, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (492, 2, 24, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (493, 2, 25, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (494, 2, 26, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (495, 2, 27, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (496, 2, 28, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (497, 2, 29, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (498, 2, 30, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (499, 2, 31, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (500, 2, 32, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (501, 2, 33, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (502, 2, 34, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (503, 2, 35, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (504, 2, 36, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (505, 2, 37, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (506, 2, 43, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (507, 2, 44, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (508, 2, 45, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (509, 2, 46, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (510, 2, 47, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (511, 2, 38, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (512, 2, 39, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (513, 2, 40, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (514, 2, 41, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (515, 2, 42, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (516, 2, 48, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (517, 2, 49, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (518, 2, 50, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (519, 2, 51, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (520, 2, 52, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (521, 2, 53, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (522, 2, 54, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (523, 2, 55, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (524, 2, 56, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (572, 3, 1, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (573, 3, 2, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (574, 3, 3, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (577, 3, 6, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (578, 3, 7, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (579, 3, 8, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (580, 3, 12, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (581, 3, 13, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (582, 3, 17, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (583, 3, 18, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (584, 3, 22, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (585, 3, 23, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (586, 3, 24, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (587, 3, 25, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (588, 3, 26, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (589, 3, 27, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (590, 3, 28, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (591, 3, 29, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (592, 3, 30, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (593, 3, 31, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (594, 3, 32, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (595, 3, 33, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (596, 3, 35, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (597, 3, 36, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (598, 3, 43, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (599, 3, 44, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (600, 3, 45, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (601, 3, 38, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (602, 3, 39, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (603, 3, 40, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (604, 3, 41, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (605, 3, 42, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (606, 3, 50, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (607, 3, 51, 'admin', '2019-01-22 14:45:28', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (608, 4, 1, 'admin', '2019-01-22 14:46:44', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (609, 4, 2, 'admin', '2019-01-22 14:46:44', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (610, 4, 3, 'admin', '2019-01-22 14:46:44', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (611, 4, 7, 'admin', '2019-01-22 14:46:44', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (612, 4, 8, 'admin', '2019-01-22 14:46:44', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (613, 4, 17, 'admin', '2019-01-22 14:46:44', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (614, 4, 18, 'admin', '2019-01-22 14:46:44', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (615, 4, 32, 'admin', '2019-01-22 14:46:44', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (616, 4, 33, 'admin', '2019-01-22 14:46:44', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (617, 4, 35, 'admin', '2019-01-22 14:46:44', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (618, 4, 36, 'admin', '2019-01-22 14:46:44', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (619, 4, 46, 'admin', '2019-01-22 14:46:44', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (620, 4, 47, 'admin', '2019-01-22 14:46:44', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (621, 4, 50, 'admin', '2019-01-22 14:46:44', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (622, 4, 51, 'admin', '2019-01-22 14:46:44', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (623, 3, 5, 'admin', '2019-10-06 15:34:57', NULL, NULL);
INSERT INTO `sys_role_menu` VALUES (625, 2, 3, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `user_nick_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `user_avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '头像',
  `user_password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `user_salt` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '加密盐',
  `user_email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `user_mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `user_staus` tinyint(4) NULL DEFAULT NULL COMMENT '状态   0:禁用，1：正常',
  `dept_id` bigint(20) NULL DEFAULT NULL COMMENT '机构id',
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `last_update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '更新人',
  `last_update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` tinyint(4) NULL DEFAULT NULL COMMENT '是否删除  -1:已删除   0:正常',
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `UNIQUE_USER_NAME`(`user_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (5, 'xiaoming1', NULL, NULL, '0414a7bdf28f69b8da0520e22521e07c', 'f5a0db', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_user` VALUES (6, 'admin', NULL, NULL, '5dabc84e08e1efa4d31a8327dc168916', 'cf8e7b', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `sys_user_role_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `last_update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `last_update_time` datetime(0) NULL DEFAULT NULL,
  `del_flag` tinyint(4) NULL DEFAULT NULL,
  PRIMARY KEY (`sys_user_role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (1, 5, 2, 'admin', '2019-10-05 13:21:46', NULL, NULL, 0);
INSERT INTO `sys_user_role` VALUES (2, 6, 2, 'admin', '2019-10-06 15:09:45', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
