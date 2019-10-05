package com.mjf.mango.manggoadmin.controller;

import com.mango.common.ResponseResult;
import com.mjf.mango.manggoadmin.entity.SysDict;
import com.mjf.mango.manggoadmin.service.SysDictService;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.controller
 * @ClassName: SysDictController
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/5 13:58
 */
@RestController
@RequestMapping("/dict")
@Log4j2
public class SysDictController {

    @Autowired
    private SysDictService sysDictService;

    @PreAuthorize("hasAuthority('sys:dict:add')")
    @PostMapping("/addDict")
    public ResponseResult addDict(@RequestBody SysDict sysDict) {
        try {
            sysDictService.addDict(sysDict);

            return ResponseResult.ok();
        } catch (Exception e) {
            log.error("添加dict失败", e);
            return ResponseResult.build(500, e.getMessage());
        }
    }

}
