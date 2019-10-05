package com.mjf.mango.manggoadmin.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.mjf.mango.manggoadmin.entity.SysDict;
import com.mjf.mango.manggoadmin.entity.SysUser;

import java.util.Set;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.service
 * @ClassName: SysUserService
 * @Author: majiafei
 * @Description:
 * @Date: 2019/9/29 22:00
 */

public interface SysDictService extends IService<SysDict> {
    void addDict(SysDict sysDict);
}
