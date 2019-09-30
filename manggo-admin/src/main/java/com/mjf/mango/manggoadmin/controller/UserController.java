package com.mjf.mango.manggoadmin.controller;

import com.mjf.mango.manggoadmin.common.ResponseResult;
import com.mjf.mango.manggoadmin.common.exception.ServiceException;
import com.mjf.mango.manggoadmin.entity.SysUser;
import com.mjf.mango.manggoadmin.service.SysUserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.controller
 * @ClassName: UserController
 * @Author: majiafei
 * @Description:
 * @Date: 2019/9/29 21:16
 */
@RestController
@RequestMapping("/user")
@Log4j2
public class UserController {

    @Autowired
    private SysUserService sysUserService;

    /**
     * 用户注册
     * @param sysUser 用户信息对象
     * @return
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseResult register(@Valid SysUser sysUser) {
        try {
            sysUserService.insertUser(sysUser);

            return ResponseResult.ok();
        } catch (ServiceException e) {
            e.printStackTrace();
            log.error(e.getMessage(), e);
            return ResponseResult.build(500, e.getMessage());
        }
    }

    /**
     * 获取用户列表(分页)
     * @param size 每页的数量
     * @param page 当前页码
     * @return
     */
    @GetMapping("/list")
    public ResponseResult list(@RequestParam(value = "size", defaultValue = "10") Integer size,
                               @RequestParam(value = "page", defaultValue = "1") Integer page) {
        return ResponseResult.ok(sysUserService.list(size, page));
    }

}
