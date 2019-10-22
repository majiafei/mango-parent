package com.mjf.mango.manggoadmin.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.mjf.mango.manggoadmin.dto.SysRoleDTO;
import com.mjf.mango.manggoadmin.entity.SysMenu;
import com.mjf.mango.manggoadmin.entity.SysRoleMenu;
import com.mjf.mango.manggoadmin.entity.SysUser;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.service
 * @ClassName: SysRoleMenuService
 * @Author: majiafei
 * @Description:
 * @Date: 2019/9/29 22:00
 */
@Service
public interface SysRoleMenuService extends IService<SysRoleMenu> {

    /**
     * 给角色授权
     * @param sysRoleDTO
     */
    void saveRoleMenus(SysRoleDTO sysRoleDTO);
}
