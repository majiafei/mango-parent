package com.mjf.mango.manggoadmin.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.mjf.mango.manggoadmin.common.entity.BaseEntity;
import lombok.Data;

/**
 * @ClassName: SysRole
 * @Auther: admin
 * @Date: 2019/10/8 14:08
 * @Description:
 */
@Data
@TableName("sys_role")
public class SysRole extends BaseEntity {

    @TableId(value = "role_id", type = IdType.AUTO)
    private Long roleId;

    @TableField("role_name")
    private String roleName;

    @TableField("remark")
    private String remark;

}
