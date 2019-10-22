package com.mjf.mango.manggoadmin.service.impl;

import com.baomidou.mybatisplus.extension.service.IService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.mjf.mango.manggoadmin.dto.SysRoleDTO;
import com.mjf.mango.manggoadmin.entity.SysRoleMenu;
import com.mjf.mango.manggoadmin.mapper.SysMenuMapper;
import com.mjf.mango.manggoadmin.mapper.SysRoleMenuMapper;
import com.mjf.mango.manggoadmin.security.SecurityUtils;
import com.mjf.mango.manggoadmin.service.SysRoleMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.service
 * @ClassName: SysRoleMenuServiceImpl
 * @Author: majiafei
 * @Description:
 * @Date: 2019/9/29 22:00
 */
@Service
public class SysRoleMenuServiceImpl extends ServiceImpl<SysRoleMenuMapper, SysRoleMenu> implements SysRoleMenuService {

    @Autowired
    private SysRoleMenuMapper sysRoleMenuMapper;

    @Transactional
    @Override
    public void saveRoleMenus(SysRoleDTO sysRoleDTO) {
        // 先将该角色的权限删除
        Map<String, Object> map = Maps.newHashMap();
        map.put("role_id", sysRoleDTO.getRoleId());
        sysRoleMenuMapper.deleteByMap(map);

        List<SysRoleMenu> sysRoleMenuList = Lists.newArrayList();
        SysRoleMenu sysRoleMenu = null;
        for (Long menuId: sysRoleDTO.getMenuIds()) {
            sysRoleMenu = new SysRoleMenu();
            sysRoleMenu.setRoleId(sysRoleDTO.getRoleId());
            sysRoleMenu.setMenuId(menuId);
            sysRoleMenu.setCreateBy(SecurityUtils.getUsername());
            sysRoleMenu.setCreateTime(new Date());

            sysRoleMenuList.add(sysRoleMenu);
        }

        // 批量添加
        this.saveBatch(sysRoleMenuList);
    }
}
