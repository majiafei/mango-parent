package com.mjf.mango.manggoadmin.jwt;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.jwt
 * @ClassName: JwtUserDetails
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/5 12:02
 */
public class JwtUserDetails implements UserDetails {
    private String userName;

    private String password;

    private String salt;

    private Collection<? extends  GrantedAuthority> authorities;

    public JwtUserDetails(String userName, String password, String salt, Collection<? extends GrantedAuthority> authorities) {
        this.userName = userName;
        this.password = password;
        this.salt = salt;
        this.authorities = authorities;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return userName;
    }

    public boolean isAccountNonExpired() {
        return true;
    }

    public boolean isAccountNonLocked() {
        return true;
    }

    public boolean isCredentialsNonExpired() {
        return true;
    }

    public boolean isEnabled() {
        return true;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }
}
