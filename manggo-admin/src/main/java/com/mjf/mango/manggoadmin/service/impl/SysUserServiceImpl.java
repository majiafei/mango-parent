package com.mjf.mango.manggoadmin.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Maps;
import com.mjf.mango.manggoadmin.common.exception.ServiceException;
import com.mjf.mango.manggoadmin.entity.SysUser;
import com.mjf.mango.manggoadmin.mapper.SysUserMapper;
import com.mjf.mango.manggoadmin.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Map;
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

    @Autowired(required = false)
    private SysUserMapper sysUserMapper;

    public void insertUser(SysUser sysUser) {
        // 用户名唯一
        Map<String, Object> map = Maps.newHashMap();
        map.put("user_name", sysUser.getUserName());
        List<SysUser> sysUsers = sysUserMapper.selectByMap(map);
        if (!CollectionUtils.isEmpty(sysUsers)) {
            throw new ServiceException("该用户名已经被注册过");
        }

        sysUser.setUserSalt(UUID.randomUUID().toString().substring(0, 6));
        boolean b = this.save(sysUser);
        if (!b) {
            // TODO
            throw new RuntimeException("添加用户失败");
        }
    }

    public IPage<SysUser> list(int size, int page) {
        IPage<SysUser> iPage = new Page(page, size);
        IPage result = sysUserMapper.selectMapsPage(iPage, null);
        return result;
    }
}
