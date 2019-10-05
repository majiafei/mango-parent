package com.mjf.mango.manggoadmin.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.beans.Transient;
import java.util.List;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.entity
 * @ClassName: SysMenu
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/5 13:09
 */
@Data
@TableName("sys_menu")
public class SysMenu {

    @TableId(type = IdType.AUTO, value = "menu_id")
    private Long menu_id;

    @TableField("parent_id")
    private Long parentId;

    @TableField("menu_name")
    private String menuName;

    @TableField("menu_url")
    private String url;

    @TableField("menu_perrms")
    private String perms;

    @TableField("menu_type")
    private Integer type;

    private String icon;

    private Integer orderNum;

    private Byte delFlag;

    // 非数据库字段
    @TableField(exist = false)
    private String parentName;
    // 非数据库字段
    @TableField(exist = false)
    private Integer level;
    // 非数据库字段
    @TableField(exist = false)
    private List<SysMenu> children;
}
