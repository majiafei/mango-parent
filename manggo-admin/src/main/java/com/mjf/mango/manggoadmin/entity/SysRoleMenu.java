package com.mjf.mango.manggoadmin.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.entity
 * @ClassName: SysRoleMenu
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/21 22:01
 */
@Data
@TableName("sys_role_menu")
public class SysRoleMenu {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("role_id")
    private Long roleId;

    @TableField("menu_id")
    private Long menuId;

    private String createBy;

    @TableField("create_time")
    private Date createTime;

    private String lastUpdateBy;

    @TableField("last_update_time")
    private Date lastUpdateTime;

}
