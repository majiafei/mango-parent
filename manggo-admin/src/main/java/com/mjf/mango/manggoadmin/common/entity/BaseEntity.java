package com.mjf.mango.manggoadmin.common.entity;

import com.baomidou.mybatisplus.annotation.TableField;

import java.util.Date;

/**
 * @ClassName: BaseEntity
 * @Auther: admin
 * @Date: 2019/10/8 15:16
 * @Description:
 */
public class BaseEntity {
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
