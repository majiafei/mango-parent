package com.mjf.mango.manggoadmin.security;

import org.springframework.security.core.GrantedAuthority;

/**
 * @ProjectName: house
 * @Package: com.mjf.mango.manggoadmin.security
 * @ClassName: GrantedAuthorityImpl
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/5 12:06
 */
public class GrantedAuthorityImpl implements GrantedAuthority {

    private String authority;

    public GrantedAuthorityImpl(String authority) {
        this.authority = authority;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
