package com.mjf.mango.manggoadmin.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;
import java.util.Date;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.entity
 * @ClassName: SysUser
 * @Author: majiafei
 * @Description:
 * @Date: 2019/9/29 21:53
 */
@Data
public class SysUser {

    @TableId(type = IdType.AUTO)
    private Long userId;

    @TableField("user_name")
    @NotEmpty(message = "用户名不能为空")
    private String userName;

    @TableField("user_password")
    @NotEmpty(message = "密码不能为空")
    @Length(min = 6, max = 20, message = "密码最小为6位,最大为8位")
    private String userPassword;

    @TableField("user_nick_name")
    private String nickName;

    @TableField("user_avatar")
    private String userAvatar;

    @TableField("user_salt")
    private String userSalt;

    @TableField("user_email")
    private String userEmail;

    @TableField("user_mobile")
    private String userMobile;

    @TableField("user_staus")
    private Integer userStaus;

    @TableField("dept_id")
    private Long deptId;

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
