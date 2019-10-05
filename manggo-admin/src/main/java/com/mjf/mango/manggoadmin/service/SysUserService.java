package com.mjf.mango.manggoadmin.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.mjf.mango.manggoadmin.entity.SysUser;

import java.util.List;
import java.util.Set;

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

    IPage<SysUser> list(int size, int page);

    /**
     * 查找用户的权限
     * @param userName
     * @return
     */
    Set<String> findPermissions(String userName);

    SysUser findByUserName(String userName);

}
