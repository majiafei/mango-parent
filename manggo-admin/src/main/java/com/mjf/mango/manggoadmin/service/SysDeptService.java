package com.mjf.mango.manggoadmin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.mjf.mango.manggoadmin.entity.SysDept;

import java.util.List;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.service
 * @ClassName: SysUserService
 * @Author: majiafei
 * @Description:
 * @Date: 2019/9/29 22:00
 */

public interface SysDeptService extends IService<SysDept> {

    List<SysDept> findTree();

}
