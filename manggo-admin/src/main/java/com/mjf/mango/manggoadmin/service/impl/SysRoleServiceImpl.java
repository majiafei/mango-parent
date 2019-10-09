package com.mjf.mango.manggoadmin.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mjf.mango.manggoadmin.dto.SysRoleDTO;
import com.mjf.mango.manggoadmin.entity.SysRole;
import com.mjf.mango.manggoadmin.mapper.SysRoleMapper;
import com.mjf.mango.manggoadmin.service.SysRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Override
    public IPage<SysRole> findPage(SysRoleDTO sysRoleDTO) {
        Page<SysRole> page = new Page<>(sysRoleDTO.getPageNum(), sysRoleDTO.getPageSize());
        // TODO 其他条件
        return sysRoleMapper.selectPage(page, null);
    }
}
