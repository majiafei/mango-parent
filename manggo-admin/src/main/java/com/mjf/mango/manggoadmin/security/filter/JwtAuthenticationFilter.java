package com.mjf.mango.manggoadmin.security.filter;

import com.mjf.mango.manggoadmin.jwt.JwtTokenUtils;
import com.mjf.mango.manggoadmin.security.SecurityUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * <p>
 *     登录认证授权过滤器
 * </p>
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.security.filter
 * @ClassName: JwtAuthenticationFilter
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/5 12:13
 */
public class JwtAuthenticationFilter extends BasicAuthenticationFilter {
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        SecurityUtils.checkAuthentication(request);
        chain.doFilter(request, response);
    }
}
