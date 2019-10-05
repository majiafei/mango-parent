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

    public static void main(String[] args) {
        // b2625726858005ed97f3303ae6095ca8 dd365b5ef12f211dcd173dc19e7ec3dd
        System.out.println(CodeUtils.md5Hex("1111", "1111"));
    }

}
