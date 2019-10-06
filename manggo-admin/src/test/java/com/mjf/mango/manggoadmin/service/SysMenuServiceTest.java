package com.mjf.mango.manggoadmin.service;

import com.mjf.mango.manggoadmin.ManggoAdminApplicationTests;
import com.mjf.mango.manggoadmin.entity.SysMenu;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * @ProjectName: house
 * @Package: com.mjf.mango.manggoadmin.service
 * @ClassName: SysMenuServiceTest
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/6 12:22
 */
public class SysMenuServiceTest extends ManggoAdminApplicationTests {

    @Autowired
    private SysMenuService sysMenuService;

    @Test
    public void findMenus() {
        List<SysMenu> sysMenuList = sysMenuService.findMenus("xiaoming1");
        System.out.println(sysMenuList.size());
    }

}
