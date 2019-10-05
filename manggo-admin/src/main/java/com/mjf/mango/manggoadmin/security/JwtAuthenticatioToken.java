package com.mjf.mango.manggoadmin.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

/**
 * @ProjectName: house
 * @Package: com.mjf.mango.manggoadmin.security
 * @ClassName: JwtAuthenticatioToken
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/5 12:30
 */
public class JwtAuthenticatioToken extends UsernamePasswordAuthenticationToken {
    private static final long serialVersionUID = 1L;

    private String token;

    public JwtAuthenticatioToken(Object principal, Object credentials){
        super(principal, credentials);
    }

    public JwtAuthenticatioToken(Object principal, Object credentials, String token){
        super(principal, credentials);
        this.token = token;
    }

    public JwtAuthenticatioToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities, String token) {
        super(principal, credentials, authorities);
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

}
