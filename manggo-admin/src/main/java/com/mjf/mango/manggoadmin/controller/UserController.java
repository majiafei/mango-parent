package com.mjf.mango.manggoadmin.controller;

import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.itextpdf.text.*;
import com.itextpdf.text.Font;
import com.itextpdf.text.pdf.*;
import com.mango.common.ResponseResult;
import com.mango.common.entity.PageRequest;
import com.mango.common.utils.PdfUtils;
import com.mjf.mango.manggoadmin.aspect.LoginLog;
import com.mjf.mango.manggoadmin.dto.UserDTO;
import com.mjf.mango.manggoadmin.common.exception.ServiceException;
import com.mjf.mango.manggoadmin.entity.SysUser;
import com.mjf.mango.manggoadmin.jwt.JwtTokenUtils;
import com.mjf.mango.manggoadmin.security.JwtAuthenticatioToken;
import com.mjf.mango.manggoadmin.security.SecurityUtils;
import com.mjf.mango.manggoadmin.service.SysUserService;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.Set;

/**
 * @ProjectName: mango
 * @Package: com.mjf.mango.manggoadmin.controller
 * @ClassName: UserController
 * @Author: majiafei
 * @Description:
 * @Date: 2019/9/29 21:16
 */
@RestController
@RequestMapping("/user")
@Log4j2
public class UserController {

    @Autowired
    private SysUserService sysUserService;

    @Autowired
    private DefaultKaptcha defaultKaptcha;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * 用户注册
     * @param sysUser 用户信息对象
     * @return
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseResult register(@Valid SysUser sysUser) {
        try {
            sysUserService.insertUser(sysUser);

            return ResponseResult.ok();
        } catch (ServiceException e) {
            e.printStackTrace();
            log.error(e.getMessage(), e);
            return ResponseResult.build(500, e.getMessage());
        }
    }

    /**
     * 获取用户列表(分页)
     * @param size 每页的数量
     * @param page 当前页码
     * @return
     */
    @PostMapping("/list")
    @PreAuthorize("hasAnyAuthority('sys:user:view')") // 直接调用hasAnyAuthority方法，获取权限信息，判断，是否存在sys:user:view这个权限，若不存在就抛出异常
    public ResponseResult list(@RequestBody PageRequest pageRequest) {
        System.out.println(SecurityUtils.getUsername());
        return ResponseResult.ok(sysUserService.list(pageRequest.getPageSize(), pageRequest.getPageNum()));
    }

    @GetMapping("/getCode")
    public void getCode(HttpServletRequest request, HttpServletResponse response) {
        String text = defaultKaptcha.createText();
        BufferedImage image = defaultKaptcha.createImage(text);
        ByteArrayOutputStream jpegOutputStream = new ByteArrayOutputStream();
        try {
            ImageIO.write(image, "jpg", jpegOutputStream);

            response.setContentType("image/jpeg");
            ServletOutputStream outputStream = response.getOutputStream();
            outputStream.write(jpegOutputStream.toByteArray());
            outputStream.flush();
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
            log.error(e.getMessage(), e);
            throw new ServiceException("生成验证码失败");
        }
    }


    /**
     *
     * @param userDTO
     * @param request
     * @return
     */
    @LoginLog("用户登录")
    @PostMapping("/login")
    public ResponseResult login(@RequestBody UserDTO userDTO, HttpServletRequest request) {
        try {
            // 验证码
            // 用户名
            SysUser sysUser = sysUserService.findByUserName(userDTO.getUserName());
            if (sysUser == null) {
                return ResponseResult.build(500, "该用户不存在");
            }
            // 密码
            String password = DigestUtils.md5Hex(sysUser.getUserSalt() + userDTO.getPassword());
            if (!password.equals(sysUser.getUserPassword())) {
                return ResponseResult.build(500, "用户名或者密码不正确");
            }

            JwtAuthenticatioToken jwtAuthenticatioToken = SecurityUtils.login(request, userDTO.getUserName(), password, authenticationManager);
            return ResponseResult.ok(jwtAuthenticatioToken);
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage(), e);
            return ResponseResult.build(500, e.getMessage());
        }
    }

    @GetMapping("/findPermissions")
    public ResponseResult findPermissions(HttpServletRequest request) {
        String token = JwtTokenUtils.getToken(request);
        if (StringUtils.isBlank(token)) {
            return ResponseResult.build(HttpStatus.UNAUTHORIZED.value(), "请先登录");
        }

        String userName = JwtTokenUtils.getUsernameFromToken(token);
        if (StringUtils.isBlank(userName)) {
            return ResponseResult.build(HttpStatus.UNAUTHORIZED.value(), "请先登录");
        }

        Set<String> permissions = sysUserService.findPermissions(userName);

        return ResponseResult.ok(permissions);
    }

    @GetMapping("/printPdf")
    public void printPdf(HttpServletResponse response) {
        try {
            Document document = new Document();
            PdfWriter.getInstance(document, response.getOutputStream());
            response.setContentType("application/pdf");
            document.open();
            document.newPage();
            // A4纸张
            document.setPageSize(PageSize.A4);
            // 标题
            document.addTitle("用户信息");
            // 表格，3列
            PdfPTable table = new PdfPTable(3);
            // 单元格
            PdfPCell cell = null;
            // 字体，定义为蓝色加粗
            Font f8 = new Font();
            f8.setStyle(Font.BOLD);
            f8.setColor(BaseColor.BLUE);
            // 标题
            cell = new PdfPCell(new Paragraph("id", f8));
            // 居中对齐
            cell.setHorizontalAlignment(1);
            // 将单元格加入表格
            table.addCell(cell);

            // 标题
            cell = new PdfPCell(new Paragraph("age", f8));
            // 居中对齐
            cell.setHorizontalAlignment(1);
            // 将单元格加入表格
            table.addCell(cell);

            // 标题
            cell = new PdfPCell(new Paragraph("name", f8));
            // 居中对齐
            cell.setHorizontalAlignment(1);
            // 将单元格加入表格
            table.addCell(cell);
            // 文档中加入表格
            document.add(table);
            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
