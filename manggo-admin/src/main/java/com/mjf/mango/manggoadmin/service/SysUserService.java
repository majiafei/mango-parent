package com.mjf.mango.manggoadmin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.mjf.mango.manggoadmin.entity.SysUser;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.service
 * @ClassName: SysUserService
 * @Author: majiafei
 * @Description:
 * @Date: 2019/9/29 22:00
 */

public interface SysUserService extends IService<SysUser> {

    void insertUser(SysUser sysUser);

}
