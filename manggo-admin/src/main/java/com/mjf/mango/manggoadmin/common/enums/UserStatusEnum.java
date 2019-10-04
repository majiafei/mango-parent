package com.mjf.mango.manggoadmin.common.enums;

import lombok.Data;

/**
 * @ClassName: UserStatusEnum
 * @Auther: admin
 * @Date: 2019/10/4 17:02
 * @Description:
 */
public enum  UserStatusEnum {
    DISABLED(0, "禁用"),
    NORMAL(1, "正常")
    ;
    private int code;
    private String message;

    UserStatusEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }}
