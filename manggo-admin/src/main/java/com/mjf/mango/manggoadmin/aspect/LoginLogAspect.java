package com.mjf.mango.manggoadmin.aspect;

import com.mjf.mango.manggoadmin.security.SecurityUtils;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

/**
 * @ClassName: LoginLogAspect
 * @Auther: admin
 * @Date: 2019/10/18 17:11
 * @Description:
 */
@Aspect
@Component
public class LoginLogAspect {

    /**
     * 横切点
     */
    @Pointcut("execution(public * com.mjf.mango.manggoadmin.controller.UserController.*(..))")
    public void webLog() {
    }

    @After(value = "webLog() && @annotation(LoginLog)")
    public void beforeLogin() {
        System.out.println("=================" + SecurityUtils.getUsername());
    }

}
