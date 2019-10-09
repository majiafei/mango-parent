package com.mjf.mango.manggoadmin.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

/**
 * @ClassName: CookieProperties
 * @Auther: admin
 * @Date: 2019/10/8 09:10
 * @Description:
 */
@ConfigurationProperties("mango.cookie")
@Data
public class CookieProperties {

    private Integer expire;

    private String tokenName;

}
