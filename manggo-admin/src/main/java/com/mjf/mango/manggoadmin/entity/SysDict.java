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
 * @ClassName: SysDict
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/5 13:54
 */
@Data
@TableName("sys_dict")
public class SysDict {

    @TableId(value = "sys_dict_id", type = IdType.AUTO)
    private Long sysDictId;

    @TableField("value")
    private String value;

    @TableField("label")
    private String label;

    @TableField("type")
    private String type;

    @TableField("description")
    private String description;

    @TableField("sort")
    private Double sort;

    @TableField("create_by")
    private String createBy;

    @TableField("create_time")
    private Date createTime;

    @TableField("last_update_by")
    private String lastUpdateBy;

    @TableField("last_update_time")
    private Date lastUpdateTime;

    @TableField("del_flag")
    private Integer delFlag;
}
