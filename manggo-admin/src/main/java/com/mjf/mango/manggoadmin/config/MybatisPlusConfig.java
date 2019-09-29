package com.mjf.mango.manggoadmin.config;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @ProjectName: mango
 * @Package: com.yyt.tx.mjf.config
 * @ClassName: MybatisPlusConfig
 * @Author: majiafei
 * @Description:
 * @Date: 2019/4/4 22:29
 */
@Configuration
public class MybatisPlusConfig {

    /**
     * 添加分页插件
     * @return
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        PaginationInterceptor page = new PaginationInterceptor();
        page.setDialectType("mysql");
        return page;
    }

}
