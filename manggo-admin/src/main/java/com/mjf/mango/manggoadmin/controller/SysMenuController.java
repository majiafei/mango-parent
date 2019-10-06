package com.mjf.mango.manggoadmin.controller;

import com.mango.common.ResponseResult;
import com.mjf.mango.manggoadmin.jwt.JwtTokenUtils;
import com.mjf.mango.manggoadmin.service.SysMenuService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.controller
 * @ClassName: SysMenuController
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/6 11:47
 */
@RestController
@RequestMapping("/menu")
public class SysMenuController {

    @Autowired
    private SysMenuService sysMenutService;

    @GetMapping("/findNavTree")
    public ResponseResult findMenus(HttpServletRequest request) {
        String token = JwtTokenUtils.getToken(request);
        if (StringUtils.isBlank(token)) {
            return ResponseResult.build(HttpStatus.UNAUTHORIZED.value(), "请先登录");
        }

        String userName = JwtTokenUtils.getUsernameFromToken(token);
        if (StringUtils.isBlank(userName)) {
            return ResponseResult.build(HttpStatus.UNAUTHORIZED.value(), "请先登录");
        }

        return ResponseResult.ok(sysMenutService.findMenus(userName));
    }

    @GetMapping("/findMenuTree")
    public ResponseResult findMenuTree() {
        return ResponseResult.ok(sysMenutService.findMenuTree());
    }

}
