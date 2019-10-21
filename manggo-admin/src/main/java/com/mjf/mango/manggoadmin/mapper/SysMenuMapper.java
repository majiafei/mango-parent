package com.mjf.mango.manggoadmin.mapper;

import com.mjf.mango.manggoadmin.common.CommonMapper;
import com.mjf.mango.manggoadmin.entity.SysMenu;
import com.mjf.mango.manggoadmin.entity.SysUser;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Set;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.mapper
 * @ClassName: SysUserMapper
 * @Author: majiafei
 * @Description:
 * @Date: 2019/9/29 21:52
 */
public interface SysMenuMapper extends CommonMapper<SysMenu> {

    void deleteMenuIdsByRoleId(@Param("roleId") Long roleId);

    void insertRoleMenus();

}
