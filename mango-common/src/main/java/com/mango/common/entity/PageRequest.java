package com.mango.common.entity;

import lombok.Data;

/**
 * @ProjectName: mango
 * @Package: com.mango.common.entity
 * @ClassName: PageRequest
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/6 18:20
 */
@Data
public class PageRequest {

    private Integer pageSize = 10;

    private Integer pageNum = 1;

}
