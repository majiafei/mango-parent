package com.mjf.mango.manggoadmin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
@MapperScan(basePackages = "com.mjf.mango.manggoadmin.mapper")
public class ManggoAdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(ManggoAdminApplication.class, args);
    }

}
