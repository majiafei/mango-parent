package com.mjf.mango.manggoadmin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.mjf.mango.manggoadmin.entity.SysDict;
import com.mjf.mango.manggoadmin.entity.SysMenu;

import java.util.List;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.service
 * @ClassName: SysUserService
 * @Author: majiafei
 * @Description:
 * @Date: 2019/9/29 22:00
 */

public interface SysMenuService extends IService<SysMenu> {

    List<SysMenu> findMenus(String userName);

    List<SysMenu> findMenuTree();

}
