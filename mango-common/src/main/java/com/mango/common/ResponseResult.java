package com.mango.common;

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

    public ResponseResult() {
        this.code = 200;
        this.data = null;
    }

    public ResponseResult(int code, String message) {
        this.code = 200;
        this.message = message;
    }

    public static <T> ResponseResult ok(T data) {
        return new ResponseResult(data);
    }

    public static <T> ResponseResult ok() {
        return new ResponseResult();
    }

    public static ResponseResult build(int code, String message) {
        return new ResponseResult(code, message);
    }
}
