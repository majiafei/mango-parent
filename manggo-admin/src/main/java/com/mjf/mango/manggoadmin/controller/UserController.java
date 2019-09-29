package com.mjf.mango.manggoadmin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.controller
 * @ClassName: UserController
 * @Author: majiafei
 * @Description:
 * @Date: 2019/9/29 21:16
 */
@RestController
public class UserController {

    @RequestMapping("/hello")
    public String hello() {
        return "hello";
    }

}
