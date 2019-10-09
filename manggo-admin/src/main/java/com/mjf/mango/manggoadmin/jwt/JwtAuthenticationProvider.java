package com.mjf.mango.manggoadmin.jwt;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.jwt
 * @ClassName: JwtAuthenticationProvider
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/5 11:55
 */
public class JwtAuthenticationProvider extends DaoAuthenticationProvider {

    public JwtAuthenticationProvider(UserDetailsService userDetailsService) {
        setUserDetailsService(userDetailsService);
    }

    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
        if (authentication.getCredentials() == null) {
            if (logger.isDebugEnabled()) {
                logger.debug("Authentication failed: no credentials provided");
                throw new BadCredentialsException(messages.getMessage("Bad Credentials"));
            }
        }

/*        String presentedPassword = authentication.getCredentials().toString();
        String salt = ((JwtUserDetails) userDetails).getSalt();
        if (!CodeUtils.md5Hex(presentedPassword, salt).equals(userDetails.getPassword())) {
            logger.debug("authentication failed: password not match");
            throw new BadCredentialsException("bad credentials");
        }*/

    }
}
