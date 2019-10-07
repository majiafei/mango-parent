package com.mjf.mango.manggoadmin.controller;

import com.mango.common.ResponseResult;
import com.mjf.mango.manggoadmin.service.SysDeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.PipedReader;

/**
 * @ClassName: SysDeptController
 * @Auther: admin
 * @Date: 2019/10/7 17:28
 * @Description:
 */
@RestController
@RequestMapping("/dept")
public class SysDeptController {

    @Autowired
    private SysDeptService sysDeptService;

    @GetMapping("/findTree")
    public ResponseResult findTree() {
        return ResponseResult.ok(sysDeptService.findTree());
    }

}
