package com.mjf.mango.manggoadmin.controller;

import com.mango.common.ResponseResult;
import com.mjf.mango.manggoadmin.dto.SysRoleDTO;
import com.mjf.mango.manggoadmin.service.SysRoleMenuService;
import com.mjf.mango.manggoadmin.service.SysRoleService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @ClassName: SysRoleController
 * @Auther: admin
 * @Date: 2019/10/7 16:59
 * @Description:
 */
@RestController
@RequestMapping("/role")
@Log4j2
public class SysRoleController {

    @Autowired
    private SysRoleService sysRoleService;

    @Autowired
    private SysRoleMenuService sysRoleMenuService;

    @PostMapping("/findPage")
    public ResponseResult findPage(@RequestBody SysRoleDTO sysRoleDTO) {
        return ResponseResult.ok(sysRoleService.findPage(sysRoleDTO));
    }

    @PostMapping("/findRoleMenus")
    public ResponseResult findRoleMenus(@RequestBody SysRoleDTO sysRoleDTO) {
        return ResponseResult.ok(sysRoleService.findRoleMenus(sysRoleDTO.getRoleId()));
    }

    @PostMapping("saveRoleMenus")
    public ResponseResult saveRoleMenus(@RequestBody SysRoleDTO sysRoleDTO) {
        try {
            sysRoleMenuService.saveRoleMenus(sysRoleDTO);

            return ResponseResult.ok();
        } catch (Exception e) {
            log.error("授权失败", e);
            return ResponseResult.build(500, "授权失败");
        }
    }

}
