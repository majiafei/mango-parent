package com.mjf.mango.manggoadmin.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mjf.mango.manggoadmin.common.exception.ServiceException;
import com.mjf.mango.manggoadmin.entity.SysDict;
import com.mjf.mango.manggoadmin.entity.SysUser;
import com.mjf.mango.manggoadmin.mapper.SysDictMapper;
import com.mjf.mango.manggoadmin.mapper.SysUserMapper;
import com.mjf.mango.manggoadmin.service.SysDictService;
import com.mjf.mango.manggoadmin.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ProjectName: house
 * @Package: com.mjf.mango.manggoadmin.service.impl
 * @ClassName: SysDictServiceImpl
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/5 14:00
 */
@Service
public class SysDictServiceImpl extends ServiceImpl<SysDictMapper, SysDict> implements SysDictService {

    @Override
    public void addDict(SysDict sysDict) {
        boolean save = this.save(sysDict);
        if (!save) {
            throw new ServiceException("添加dict失败");
        }
    }
}
