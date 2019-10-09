package com.mjf.mango.manggoadmin.service;

import com.mango.common.utils.JsonUtils;
import com.mjf.mango.manggoadmin.ManggoAdminApplicationTests;
import com.mjf.mango.manggoadmin.entity.SysDept;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * @ClassName: SysDeptServiceImpl
 * @Auther: admin
 * @Date: 2019/10/7 17:44
 * @Description:
 */
public class SysDeptServiceImpl extends ManggoAdminApplicationTests {

    @Autowired
    private SysDeptService sysDeptService;

    @Test
    public void findTree() {
        List<SysDept> tree = sysDeptService.findTree();
        System.out.println(JsonUtils.toString(tree));
    }

}
