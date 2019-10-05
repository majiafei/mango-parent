package com.mjf.mango.manggoadmin.service.impl;

import com.mjf.mango.manggoadmin.entity.SysUser;
import com.mjf.mango.manggoadmin.jwt.JwtUserDetails;
import com.mjf.mango.manggoadmin.security.GrantedAuthorityImpl;
import com.mjf.mango.manggoadmin.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.service.impl
 * @ClassName: UserDetailsServiceImpl
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/5 13:35
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private SysUserService sysUserService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SysUser sysUser = sysUserService.findByUserName(username);
        if (sysUser == null) {
            throw new UsernameNotFoundException("该用户不存在");
        }

        Set<String> permissions = sysUserService.findPermissions(username);
        List<GrantedAuthorityImpl> grantedAuthorities = permissions.stream().map(GrantedAuthorityImpl::new).collect(Collectors.toList());

        return new JwtUserDetails(sysUser.getUserName(), sysUser.getUserPassword(), sysUser.getUserSalt(), grantedAuthorities);
    }
}
