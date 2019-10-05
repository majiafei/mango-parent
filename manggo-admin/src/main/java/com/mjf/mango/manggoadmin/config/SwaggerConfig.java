package com.mjf.mango.manggoadmin.config;

import com.google.common.collect.Lists;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.List;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.config
 * @ClassName: SwaggerConfig
 * @Author: majiafei
 * @Description:
 * @Date: 2019/9/29 21:22
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket createRestApi() {
        ParameterBuilder parameterBuilder = new ParameterBuilder();
        List<Parameter> parameterList = Lists.newArrayList();
        parameterBuilder.name("token").description("令牌")
                .modelRef(new ModelRef("string")).parameterType("header")
                .required(false).build();
        parameterList.add(parameterBuilder.build());

        return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo())
                .select().apis(RequestHandlerSelectors.any()).paths(PathSelectors.any())
                .build().globalOperationParameters(parameterList);
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().build();
    }

}
