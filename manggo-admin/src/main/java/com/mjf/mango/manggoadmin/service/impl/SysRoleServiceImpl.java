package com.mjf.mango.manggoadmin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import com.mjf.mango.manggoadmin.common.exception.ServiceException;
import com.mjf.mango.manggoadmin.dto.SysRoleDTO;
import com.mjf.mango.manggoadmin.entity.SysMenu;
import com.mjf.mango.manggoadmin.entity.SysRole;
import com.mjf.mango.manggoadmin.mapper.SysMenuMapper;
import com.mjf.mango.manggoadmin.mapper.SysRoleMapper;
import com.mjf.mango.manggoadmin.mapper.SysUserMapper;
import com.mjf.mango.manggoadmin.service.SysMenuService;
import com.mjf.mango.manggoadmin.service.SysRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @ClassName: SysRoleServiceImpl
 * @Auther: admin
 * @Date: 2019/10/8 14:08
 * @Description:
 */
@Service
public class SysRoleServiceImpl extends ServiceImpl<SysRoleMapper, SysRole> implements SysRoleService {

    @Autowired(required = false)
    private SysRoleMapper sysRoleMapper;

    @Autowired
    private SysMenuMapper sysMenuMapper;

    @Autowired
    private SysUserMapper sysUserMapper;

    @Override
    public IPage<SysRole> findPage(SysRoleDTO sysRoleDTO) {
        Page<SysRole> page = new Page<>(sysRoleDTO.getPageNum(), sysRoleDTO.getPageSize());
        // TODO 其他条件
        return sysRoleMapper.selectPage(page, null);
    }

    @Override
    public List<SysMenu> findRoleMenus(Long roleId) {
        // 先从sys_role_menu表中查找menuId
        List<Long> menuIds = sysUserMapper.findMenuIds(Lists.newArrayList(roleId));
        return sysMenuMapper.selectBatchIds(menuIds);
    }

    @Override
    public void saveRoleMenus(SysRoleDTO sysRoleDTO) {
        sysMenuMapper.deleteMenuIdsByRoleId(sysRoleDTO.getRoleId());


    }
}
