package com.mjf.mango.manggoadmin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mjf.mango.manggoadmin.common.CommonMapper;
import com.mjf.mango.manggoadmin.entity.SysUser;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.mapper
 * @ClassName: SysUserMapper
 * @Author: majiafei
 * @Description:
 * @Date: 2019/9/29 21:52
 */
public interface SysUserMapper extends CommonMapper<SysUser> {
    @Select("select role_id from sys_user_role where user_id = #{userId}")
    List<Long> findRoleIds(Long userId);

    @Select("select * from sys_user where user_name = #{userName}")
    SysUser findByUserName(String userName);

    List<Long> findMenuIds(@Param("roleIds") List<Long> roleIds);

}
