package com.mjf.mango.manggoadmin.aspect;

import java.lang.annotation.*;

/**
 * @ClassName: LoginLog
 * @Auther: admin
 * @Date: 2019/10/18 17:13
 * @Description:
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface LoginLog {

    String value();

}
