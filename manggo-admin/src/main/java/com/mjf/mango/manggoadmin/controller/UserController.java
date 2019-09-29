package com.mjf.mango.manggoadmin.controller;

import com.mjf.mango.manggoadmin.entity.SysUser;
import com.mjf.mango.manggoadmin.service.SysUserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
@Log4j2
public class UserController {

    @Autowired
    private SysUserService sysUserService;

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String hello() {
        return "hello";
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    public ResponseEntity<Void> addUser(SysUser sysUser) {
        try {
            sysUserService.insertUser(sysUser);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
        }
    }

}
