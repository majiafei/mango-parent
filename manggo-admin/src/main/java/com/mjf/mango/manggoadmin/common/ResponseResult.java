package com.mjf.mango.manggoadmin.common;

import lombok.Data;

/**
 * @ClassName: ResponseResult
 * @Auther: admin
 * @Date: 2019/9/30 11:34
 * @Description:
 */
@Data
public class ResponseResult<T> {

    private int code;
    private T data;
    private String message;

    public ResponseResult(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public ResponseResult(T data) {
        this.code = 200;
        this.data = data;
    }

    public ResponseResult ok(T data) {
        return new ResponseResult(data);
    }

    public ResponseResult error(int code, String message, T data) {
        return new ResponseResult(code, message, data);
    }
}
