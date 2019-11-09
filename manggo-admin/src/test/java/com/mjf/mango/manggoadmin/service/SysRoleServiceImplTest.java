package com.mjf.mango.manggoadmin.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.mjf.mango.manggoadmin.ManggoAdminApplicationTests;
import com.mjf.mango.manggoadmin.dto.SysRoleDTO;
import com.mjf.mango.manggoadmin.entity.SysRole;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * @ClassName: SysRoleServiceImplTest
 * @Auther: admin
 * @Date: 2019/10/8 14:12
 * @Description:
 */
public class SysRoleServiceImplTest extends ManggoAdminApplicationTests {

    @Autowired
    private SysRoleService sysRoleService;

    @Test
    public void findPage() {
        SysRoleDTO sysRoleDTO = new SysRoleDTO();
        sysRoleDTO.setPageNum(1);
        sysRoleDTO.setPageSize(10);

        IPage<SysRole> page = sysRoleService.findPage(sysRoleDTO);
        Assert.assertEquals(1, page.getPages());
    }

    @Test
    public void findRoleMenus() {
        //List<SysRole> roleMenus = sysRoleService.findRoleMenus(1L);
        //System.out.println(roleMenus.size());
    }

}
