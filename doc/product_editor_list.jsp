<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2019/8/19
  Time: 17:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta content="4" name="menu">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>编辑列表</title>
    <link rel="stylesheet" type="text/css" href="/css/easyui/easyui.css">
    <link rel="stylesheet" type="text/css" href="/css/easyui/icon.css">
    <script type="text/javascript" src="/js/easyui/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="/js/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="/js/easyui/easyui.util.js?version=${jsVersion}"></script>
    <script language="JavaScript" type="text/javascript" src="/js/webox/jquery-webox.js"></script>
    <script type="text/javascript" src="product_edit_list_events.js"></script>
</head>
<body>
<div id="container" style="width:1500px;height:600px;margin:0px 0px;text-align:left">
    <div id="qryCondition" style="width:1200px;height:100px;">
        <form id="qryForm" width="100%">
            <table width="100%">
                <tr>
                    <td style="width:20%">
                        SPU:<input id="spus" name="spus" style="width:50%;"/>
                    </td>
                    <td style="width: 20%">
                        SKU:<input id="skus" name="skus" style="width: 50%">
                    </td>
                    <td style="width: 20%">
                        SKU状态:
                        <input name="itemStatus" id="itemStatus" style="width: 150px;"/>
                    </td>
                    <td style="width: 20%">
                        产品线:<input id="productLineId" name="productLineId" style="width: 150px;">
                    </td>
                    <td style="width: 20%">
                        编辑人:<input id="editor" name="editor" style="width: 50%">
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="width:20%">
                        SKU完成时间:<input id="skuFromDate" name="skuFromDate"  style="width:100%;"/>~<input id="skuEndDate" name="skuEndDate"  style="width:100%;"/>
                    </td>
                    <td colspan="2" style="width:20%">
                        虚拟库存:<input id="minVirtualQuantity" name="minVirtualQuantity"  style="width:30%;"/>~<input id="maxVirtualQuantity" name="maxVirtualQuantity" style="width:30%;"/>
                    </td>
                    <td><a id="receiveBtn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'">领取</a></td>
                </tr>
                <tr>
                    <td colspan="2" style="width:20%">
                        编辑时间:<input id="editFromDate" name="editFromDate" style="width:100%;"/>~<input id="editEndDate" name="editEndDate" style="width:100%;"/>
                    </td>
                    <td colspan="1" style="width:20%">
                        编辑状态:<select id="editorStatus" name="editorStatus" class="easyui-combobox" style="width:150px;">
                        <option value="-1">ALL</option>
                        <option value="0">待编辑</option>
                        <option value="1">已编辑</option>
                        <option value="2">未领取</option>
                    </select>
                    </td>
                    <td><a id="searchBtn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'">查找</a></td>
                    <td><a id="returnBtn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'">退回</a></td>
                </tr>
            </table>
        </form>
    </div>
    <table id="productEditListTable" >
</table>
</div>
<div style="text-align: left">
    <span style="color: red">备注:sku完成时间是指sku三级审核的时间</span>
</div>
</body>
</html>
