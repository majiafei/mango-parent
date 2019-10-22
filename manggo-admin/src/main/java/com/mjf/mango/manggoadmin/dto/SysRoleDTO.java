package com.mjf.mango.manggoadmin.dto;

import com.mango.common.entity.PageRequest;
import lombok.Data;

import java.util.List;

/**
 * @ClassName: SysRoleDTO
 * @Auther: admin
 * @Date: 2019/10/8 14:05
 * @Description:
 */
@Data
public class SysRoleDTO extends PageRequest {

    private Long roleId;

    private List<Long> menuIds;

}
