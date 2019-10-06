package com.mjf.mango.manggoadmin.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.mjf.mango.manggoadmin.entity.SysMenu;
import com.mjf.mango.manggoadmin.mapper.SysMenuMapper;
import com.mjf.mango.manggoadmin.service.SysMenuService;
import com.mjf.mango.manggoadmin.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.service.impl
 * @ClassName: SysDictServiceImpl
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/5 14:00
 */
@Service
public class SysMenuServiceImpl extends ServiceImpl<SysMenuMapper, SysMenu> implements SysMenuService {

    @Autowired
    private SysUserService sysUserService;

    @Override
    public List<SysMenu> findMenus(String userName) {
        List<SysMenu> menuList = sysUserService.findMenuList(userName);

        // 存放菜单（不包含按钮）
        List<SysMenu> newMenuList = Lists.newArrayList();
        Map<Long, SysMenu> sysMenuMap = Maps.newHashMap();
        for (SysMenu sysMenu : menuList) {
            if (sysMenu.getType() != 2) {
                sysMenuMap.put(sysMenu.getId(), sysMenu);
                newMenuList.add(sysMenu);
            }
        }

        newMenuList.forEach(sysMenu -> {
            Long parentId = sysMenu.getParentId();
            SysMenu parentMenu = sysMenuMap.get(parentId);
            if (parentMenu != null) {
                List<SysMenu> children = parentMenu.getChildren();
                if (children == null) {
                    children = Lists.newArrayList();
                }
                children.add(sysMenu);
                parentMenu.setChildren(children);
            }
        });

        menuList.clear();
        sysMenuMap.forEach((k, v) -> {
            if (v.getParentId() == 0) {
                menuList.add(v);
            }
        });

        return menuList;
    }
}
