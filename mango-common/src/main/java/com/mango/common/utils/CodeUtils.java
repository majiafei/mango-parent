package com.mango.common.utils;

import org.apache.commons.codec.digest.DigestUtils;

/**
 * @ClassName: CodeUtils
 * @Auther: admin
 * @Date: 2019/10/4 15:02
 * @Description:
 */
public class CodeUtils {

    public static String md5Hex(String data, String salt) {
        return DigestUtils.md5Hex(salt + DigestUtils.md5(data));
    }

}
