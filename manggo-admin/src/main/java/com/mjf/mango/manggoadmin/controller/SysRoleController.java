package com.mjf.mango.manggoadmin.controller;

import com.mango.common.ResponseResult;
import com.mjf.mango.manggoadmin.dto.SysRoleDTO;
import org.springframework.web.bind.annotation.*;

/**
 * @ClassName: SysRoleController
 * @Auther: admin
 * @Date: 2019/10/7 16:59
 * @Description:
 */
@RestController
@RequestMapping("/role")
public class SysRoleController {

    @PostMapping("/findPage")
    public ResponseResult findPage(@RequestBody SysRoleDTO sysRoleDTO) {
        return ResponseResult.ok(null);
    }

}
