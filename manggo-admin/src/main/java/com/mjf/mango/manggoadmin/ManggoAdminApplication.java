package com.mjf.mango.manggoadmin;

import com.mjf.mango.manggoadmin.properties.CookieProperties;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
//@EnableDiscoveryClient
@MapperScan(basePackages = "com.mjf.mango.manggoadmin.mapper")
@EnableConfigurationProperties(CookieProperties.class)
public class ManggoAdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(ManggoAdminApplication.class, args);
    }

}
