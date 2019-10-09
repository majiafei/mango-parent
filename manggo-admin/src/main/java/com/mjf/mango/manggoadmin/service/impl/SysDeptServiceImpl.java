package com.mjf.mango.manggoadmin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import com.mjf.mango.manggoadmin.entity.SysDept;
import com.mjf.mango.manggoadmin.mapper.SysDeptMapper;
import com.mjf.mango.manggoadmin.service.SysDeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.service.impl
 * @ClassName: SysDictServiceImpl
 * @Author: majiafei
 * @Description:
 * @Date: 2019/10/5 14:00
 */
@Service
public class SysDeptServiceImpl extends ServiceImpl<SysDeptMapper, SysDept> implements SysDeptService {

    @Autowired
    private SysDeptMapper sysDeptMapper;

    @Override
    public List<SysDept> findTree() {
        QueryWrapper<SysDept> wrapper = new QueryWrapper<SysDept>();
        wrapper.eq("del_flag", 0);
        List<SysDept> sysDeptList = sysDeptMapper.selectList(wrapper);

        Map<Long, SysDept> deptMap = sysDeptList.stream().collect(Collectors.toMap(SysDept::getDeptId, sysDept -> sysDept));

        sysDeptList.forEach(sysDept -> {
            if (sysDept.getParentId() != null) {
                Long parentId = sysDept.getParentId();
                SysDept parentDept = deptMap.get(parentId);
                sysDept.setParentName(parentDept.getDeptName());
                if (sysDept != null) {
                    List<SysDept> children = sysDept.getChildren();
                    if (children == null) {
                        children = Lists.newArrayList();
                    }
                    children.add(sysDept);
                    parentDept.setChildren(children);
                }
            }
        });

        sysDeptList.clear();
        deptMap.forEach((deptId, sysDept) -> {
            if (sysDept.getParentId() == null) {
                sysDept.setLevel(0); //
                sysDept.setParentName("");
                setLevel(sysDept.getChildren(), 1);
                sysDeptList.add(sysDept);
            }
        });

        return sysDeptList;
    }

    private void setLevel(List<SysDept> children, int level) {
        if (CollectionUtils.isEmpty(children)) {
            return;
        }

        children.forEach(sysDept -> {
            sysDept.setLevel(level);
            setLevel(sysDept.getChildren(), level + 1);
        });
    }
}
