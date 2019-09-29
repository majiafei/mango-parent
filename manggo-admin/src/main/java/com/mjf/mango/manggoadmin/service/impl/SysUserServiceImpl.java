package com.mjf.mango.manggoadmin.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mjf.mango.manggoadmin.entity.SysUser;
import com.mjf.mango.manggoadmin.mapper.SysUserMapper;
import com.mjf.mango.manggoadmin.service.SysUserService;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.service.impl
 * @ClassName: SysUserServiceImpl
 * @Author: majiafei
 * @Description:
 * @Date: 2019/9/29 22:02
 */
@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {

    public void insertUser(SysUser sysUser) {
        sysUser.setUserSalt(UUID.randomUUID().toString().substring(0, 6));
        boolean b = this.save(sysUser);
        if (!b) {
            // TODO
            throw new RuntimeException("添加用户失败");
        }
    }
}
