package com.mjf.mango.manggoadmin.mapper;

import com.mjf.mango.manggoadmin.common.CommonMapper;
import com.mjf.mango.manggoadmin.entity.SysMenu;
import org.apache.ibatis.annotations.Param;

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

}
