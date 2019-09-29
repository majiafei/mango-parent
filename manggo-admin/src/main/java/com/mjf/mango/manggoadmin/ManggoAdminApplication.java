package com.mjf.mango.manggoadmin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.mjf.mango.manggoadmin.mapper")
public class ManggoAdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(ManggoAdminApplication.class, args);
    }

}
