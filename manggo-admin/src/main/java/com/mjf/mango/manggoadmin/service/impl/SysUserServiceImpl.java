package com.mjf.mango.manggoadmin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import com.mango.common.utils.CodeUtils;
import com.mjf.mango.manggoadmin.common.exception.ServiceException;
import com.mjf.mango.manggoadmin.entity.SysMenu;
import com.mjf.mango.manggoadmin.entity.SysUser;
import com.mjf.mango.manggoadmin.mapper.SysMenuMapper;
import com.mjf.mango.manggoadmin.mapper.SysUserMapper;
import com.mjf.mango.manggoadmin.service.SysUserService;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.stream.Collectors;

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

    @Autowired
    private SysMenuMapper sysMenuMapper;

    public void insertUser(SysUser sysUser) {
        // 用户名唯一
        Map<String, Object> map = Maps.newHashMap();
        map.put("user_name", sysUser.getUserName());
        List<SysUser> sysUsers = sysUserMapper.selectByMap(map);
        if (!CollectionUtils.isEmpty(sysUsers)) {
            throw new ServiceException("该用户名已经被注册过");
        }

        // 盐值
        String salt = UUID.randomUUID().toString().substring(0, 6);
        sysUser.setUserSalt(salt);
        // 对密码进行加密(盐值+加密后的密码再次进行加密)
        String password = DigestUtils.md5Hex(salt + sysUser.getUserPassword());
        sysUser.setUserPassword(password);

        boolean b = this.save(sysUser);
        if (!b) {
            throw new ServiceException("添加用户失败");
        }
    }

    public IPage<SysUser> list(int size, int page) {
        IPage<SysUser> iPage = new Page(page, size);
        IPage result = sysUserMapper.selectMapsPage(iPage, null);
        return result;
    }

    public Set<String> findPermissions(String userName) {
        // 查找用户
        SysUser sysUser = sysUserMapper.findByUserName(userName);
        if (sysUser == null) {
            throw new ServiceException("该用户不存在");
        }

        List<Long> roleIds = sysUserMapper.findRoleIds(sysUser.getUserId());
        if (CollectionUtils.isEmpty(roleIds)) {
            throw new ServiceException("请给用户配角色");
        }
        List<Long> menuIds = sysUserMapper.findMenuIds(roleIds);
        Set<Long> menuIdSet = new HashSet<Long>(menuIds);
        List<SysMenu> sysMenuList = sysMenuMapper.selectBatchIds(Lists.newArrayList(menuIdSet));
        List<String> permList = sysMenuList.stream().map(sysMenu -> sysMenu.getPerms()).collect(Collectors.toList());

        return Sets.newHashSet(permList);
    }

    @Override
    public SysUser findByUserName(String userName) {
        return sysUserMapper.findByUserName(userName);
    }
}
