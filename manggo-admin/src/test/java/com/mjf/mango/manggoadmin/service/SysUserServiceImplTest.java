package com.mjf.mango.manggoadmin.service;

import com.google.common.collect.Lists;
import com.mjf.mango.manggoadmin.ManggoAdminApplicationTests;
import com.mjf.mango.manggoadmin.entity.SysUser;
import com.mjf.mango.manggoadmin.mapper.SysUserMapper;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Set;

/**
 * @ProjectName: house
 * @Package: com.mjf.mango.manggoadmin.service
 * @ClassName: SysUserServiceImplTest
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/5 12:55
 */
public class SysUserServiceImplTest extends ManggoAdminApplicationTests {

    @Autowired
    private SysUserMapper sysUserMapper;

    @Autowired
    private SysUserService sysUserService;

    @Test
    public void findByUserName() {
        SysUser admin = sysUserMapper.findByUserName("admin");
        Assert.assertNotNull(admin);
    }

    @Test
    public void findMenuIds() {
        List<Long> roleIds = Lists.newArrayList(2L);
        List<Long> menuIds = sysUserMapper.findMenuIds(roleIds);
        Assert.assertEquals(56, menuIds.size());
    }

    @Test
    public void findPers() {
        Set<String> admin = sysUserService.findPermissions("admin");
        System.out.println(admin.size());
    }

}
