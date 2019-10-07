CREATE TABLE `sys_config` (
  `sys_config_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `value` varchar(100) DEFAULT NULL,
  `label` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `sort` decimal(10,0) DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_update_by` varchar(50) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  `del_flag` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`sys_config_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `sys_dept` (
  `dept_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `dept_ name` varchar(50) NOT NULL COMMENT '机构名称',
  `parent_id` bigint(20) NOT NULL COMMENT '上级机构  一级机构为0',
  `order_num` int(10) DEFAULT NULL COMMENT '排序',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `last_update_by` varchar(50) DEFAULT NULL COMMENT '更新人',
  `last_update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` tinyint(4) DEFAULT NULL COMMENT '是否删除  -1:已删除   0:正常',
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `sys_dict` (
  `sys_dict_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `value` varchar(100) DEFAULT NULL,
  `label` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `sort` decimal(10,0) DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_update_by` varchar(50) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  `del_flag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sys_dict_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `sys_log` (
  `sys_log_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) DEFAULT NULL,
  `operation` varchar(50) DEFAULT NULL,
  `method` varchar(200) DEFAULT NULL,
  `params` varchar(5000) DEFAULT NULL,
  `time` bigint(20) DEFAULT NULL,
  `ip` varchar(64) DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_update_by` varchar(50) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  `del_flag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sys_log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `sys_login_log` (
  `sys_login_log_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL COMMENT '登录状态',
  `ip` varchar(64) DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_update_by` varchar(50) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  `del_flag` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`sys_login_log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `sys_menu` (
  `menu_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(50) NOT NULL COMMENT '菜单名称',
  `parent_id` bigint(20) NOT NULL COMMENT '上级机构  一级机构为0',
  `menu_url` varchar(255) DEFAULT NULL,
  `menu_perrms` varchar(500) DEFAULT NULL COMMENT '授权(多个用逗号分隔，如: sys:user:add, sys:user:edit)',
  `menu_type` int(10) DEFAULT NULL COMMENT '类型  0:目录   1:菜单  2: 按钮',
  `icon` varchar(255) DEFAULT NULL COMMENT '菜单图标',
  `order_num` int(11) DEFAULT NULL COMMENT '排序',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `last_update_by` varchar(50) DEFAULT NULL COMMENT '更新人',
  `last_update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` int(10) DEFAULT NULL COMMENT '是否删除  -1:已删除   0:正常',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `sys_role` (
  `role_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL COMMENT '角色名称',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `last_update_by` varchar(50) DEFAULT NULL COMMENT '更新人',
  `last_update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` tinyint(4) DEFAULT NULL COMMENT '是否删除  -1:已删除   0:正常',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `sys_role_dept` (
  `sys_role_dept_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` bigint(20) NOT NULL,
  `dept_id` bigint(20) DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_update_by` varchar(50) DEFAULT NULL,
  `last_update_time` datetime DEFAULT NULL,
  `del_flag` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`sys_role_dept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `sys_user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(50) NOT NULL COMMENT '用户名',
  `user_nick_name` varchar(150) DEFAULT NULL COMMENT '昵称',
  `user_avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `user_password` varchar(100) NOT NULL COMMENT '密码',
  `user_salt` varchar(40) NOT NULL COMMENT '加密盐',
  `user_email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `user_mobile` varchar(20) DEFAULT NULL COMMENT '手机号',
  `user_staus` tinyint(4) DEFAULT NULL COMMENT '状态   0:禁用，1：正常',
  `dept_id` bigint(20) DEFAULT NULL COMMENT '机构id',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `last_update_by` varchar(50) DEFAULT NULL COMMENT '更新人',
  `last_update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` tinyint(4) DEFAULT NULL COMMENT '是否删除  -1:已删除   0:正常',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UNIQUE_USER_NAME` (`user_name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`
(
  `id`               bigint(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `user_id`          bigint(20)  DEFAULT NULL COMMENT '用户ID',
  `role_id`          bigint(20)  DEFAULT NULL COMMENT '角色ID',
  `create_by`        varchar(50) DEFAULT NULL COMMENT '创建人',
  `create_time`      datetime    DEFAULT NULL COMMENT '创建时间',
  `last_update_by`   varchar(50) DEFAULT NULL COMMENT '更新人',
  `last_update_time` datetime    DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 88
  DEFAULT CHARSET = utf8 COMMENT ='用户角色';

DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `role_id` bigint(20) DEFAULT NULL COMMENT '角色ID',
  `menu_id` bigint(20) DEFAULT NULL COMMENT '菜单ID',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `last_update_by` varchar(50) DEFAULT NULL COMMENT '更新人',
  `last_update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=623 DEFAULT CHARSET=utf8 COMMENT='角色菜单';

