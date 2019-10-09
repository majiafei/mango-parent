var productObj = {
    layer: undefined
    ,titleCountMsg: '标题的数量不能超过15个'
    ,deleteTitleCount: '标题的数量不能小于3'
    ,addSellPointCount: '卖点的数量不能超过15个'
    ,delSellPointCount: '卖点的数量不能低于1个'
    ,addKeywordsCount: '关键词的数量不能超过15个'
    ,delKeywordsCount: '关键词的数量不能低于1个'
    ,form: undefined
    ,vueObj: undefined,
    oldProductProperty: undefined, // 之前的广告属性
    ebayPlatformId: 1,
    ebayPublicProductInfo: undefined,
    minTitleCount: 3,
    spuCode: '',
    formSelects: undefined,
    resultCode: undefined,
    productLineId: -1,
    ebayKey: 'Ebay',
    ebayAdsInfo: undefined,
    savePublishInfoResult: undefined,
    initClick: false,
    laydate: undefined,
    productLineName: undefined,
    languageDesc: {desc: 'description', specifications: 'specifications', packageIncluded: 'packageIncluded', note: 'note'},
    siteDesc: {descForSite: 'descriptionForSite', specificationsForSite: 'specificationsForSite', packageIncludedForSite: 'packageIncludedForSite', noteForSite: 'noteForSite'},
    languageEditor: {},
    siteEditor: {},
    publishProductIndex: undefined,
    maxTitleLength: 80,
    jpLanguageId: 8,
    maxDescLength: 2000,
    lanuageCodeType:{1: '英语', 8: '日语', 2: '法文', 3: '德文', 4: '意大利文', 5: '西班牙文'},
    sellPointNum: 5 // 必须显示5行卖点
};

$(function () {
    productObj.spuCode = getUrlParam('spu');
    productObj.productLineId = getUrlParam('productLineId');
    productObj.productLineName = getUrlParam_2('productLineName');
    //全局定义一次, 加载formSelects
    layui.config({
        base: '/layui/' //此处路径请自行处理, 可以使用绝对路径
    }).extend({
        formSelects: 'formSelects-v4'
    });

    var vueObj = new Vue({
        el: '#productDiv',
        created() {
            // 获取spu的信息
            this.getSpuInfo();
            this.getSpuCategory();
            // 获取属性名称
            this.getAttributeList();
            // 获取描述信息
            this.getSpuDescInfo();
            // 获取spu的标题
            this.getSpuTitleInfo();
            // 获取ebay刊登账号信息
            this.getEabyPublisAccountList();
            this.getEbayProductPushlishInfo();
            this.getProductLine();
            this.getProductDetail();
        },
        data: {
            spuTitleList:[
                {languageId: 1, spuTitleList: [{title: ''},{title: ''}]},
                {languageId: 3, spuTitleList: []},
                {languageId: 2, spuTitleList: []},
                {languageId: 5, spuTitleList: []},
                {languageId: 4, spuTitleList: []},
                {languageId: 8, spuTitleList: []}
            ],
            spuDescList: [
                {languageId: 1, description: '', specifications: '', packageIncluded: '', note: ''},
                {languageId: 3, description: '', specifications: '', packageIncluded: '', note: ''},
                {languageId: 2, description: '', specifications: '', packageIncluded: '', note: ''},
                {languageId: 5, description: '', specifications: '', packageIncluded: '', note: ''},
                {languageId: 4, description: '', specifications: '', packageIncluded: '', note: ''},
                {languageId: 8, description: '', specifications: '', packageIncluded: '', note: ''}
            ],
            amazonSellPointObjList: [ // 卖点(亚马逊平台)
                {languageId: 1, sellPointList:[{sellPoint: ''},{sellPoint: ''},{sellPoint: ''},{sellPoint: ''}, {sellPoint: ''}]},
                {languageId: 3, sellPointList:[{sellPoint: ''},{sellPoint: ''},{sellPoint: ''},{sellPoint: ''}, {sellPoint: ''}]},
                {languageId: 2, sellPointList:[{sellPoint: ''},{sellPoint: ''},{sellPoint: ''},{sellPoint: ''}, {sellPoint: ''}]},
                {languageId: 5, sellPointList:[{sellPoint: ''},{sellPoint: ''},{sellPoint: ''},{sellPoint: ''}, {sellPoint: ''}]},
                {languageId: 4, sellPointList:[{sellPoint: ''},{sellPoint: ''},{sellPoint: ''},{sellPoint: ''}, {sellPoint: ''}]},
                {languageId: 8, sellPointList:[{sellPoint: ''},{sellPoint: ''},{sellPoint: ''},{sellPoint: ''}, {sellPoint: ''}]}
                ],
            /*allLanguageKeywordsList:[ // 关键词(亚马逊平台)
                {languageId: 1, keywordList:[{keyword: ''},{keyword: ''},{keyword: ''},{keyword: ''}]},
                {languageId: 3, keywordList:[{keyword: ''},{keyword: ''},{keyword: ''},{keyword: ''}]},
                {languageId: 2, keywordList:[{keyword: ''},{keyword: ''},{keyword: ''},{keyword: ''}]},
                {languageId: 5, keywordList:[{keyword: ''},{keyword: ''},{keyword: ''},{keyword: ''}]},
                {languageId: 4, keywordList:[{keyword: ''},{keyword: ''},{keyword: ''},{keyword: ''}]},
                {languageId: 8, keywordList:[{keyword: ''},{keyword: ''},{keyword: ''},{keyword: ''}]}
                ],*/
            allLanguageKeywordsList: [
                {languageId: 1, keywords: ''},
                {languageId: 3, keywords: ''},
                {languageId: 2, keywords: ''},
                {languageId: 5, keywords: ''},
                {languageId: 4, keywords: ''},
                {languageId: 8, keywords: ''}],
            // 刊登账号的列表
            ebaySiteList:[],
            /*********************spu的信息***********************/
            spu: {
                skuList:  [],
                isMultiple: false
            },
            // ebay平台的广告信息
            productInfo: {
                isMultipleForProduct: true,
                uploadSiteInfoList: [],
                picType: 0,
                platformId: 1,
                continuTime: 'GTC'
            },
            attributeList:[
               /* {attributeId: 1, attributeName: 'color'},
                {attributeId: 2, attributeName: 'size'},
                {attributeId: 2, attributeName: 'color1'}*/
            ],
            attributeObj: [],
            // 属性的个数
            attributeCount: 2,
            propertyTypeList: [],
            // 英文目录
            enCategoryList: [
                {
                    mainCategoryId: 1,
                    platformId: 1,
                    storeId: 1,
                    mainCategoryName: '',
                    storeCategoryName: '',
                    siteCategoryList: [
                        {siteId: 0, siteName: 'US', categoryId: 0, categoryName: ''},
                        {siteId: 100, siteName: 'eBay Motor', categoryId: 0, categoryName: ''},
                        {siteId: 2, siteName: 'Canada', categoryId: 0, categoryName: ''},
                        {siteId: 3, siteName: 'UK', categoryId: 0, categoryName: ''},
                        {siteId: 15, siteName: 'Australia', categoryId: 0, categoryName: ''},
                        {siteId: 77, siteName: 'Germany', categoryId: 0, categoryName: ''},
                        {siteId: 71, siteName: 'France', categoryId: 0, categoryName: ''},
                        {siteId: 186, siteName: 'Spain', categoryId: 0, categoryName: ''},
                        {siteId: 101, siteName: 'Italy', categoryId: 0, categoryName: ''}
                    ]
                },
                // 亚马逊
                {mainCategoryId: 1, platformId: 2, mainCategoryName: '', siteCategoryList: [{siteId: 0, siteName: 'US', categoryId: 0, categoryName: ''}, {siteId: 2, siteName: 'Canada', categoryId: 0, categoryName: ''},  {siteId: 3, siteName: 'UK', categoryId: 0, categoryName: ''}, {siteId: 1, siteName: 'Japan', categoryId: 0, categoryName: ''}, {siteId: 77, siteName: 'Germany', categoryId: 0, categoryName: ''}, {siteId: 71, siteName: 'France', categoryId: 0, categoryName: ''}, {siteId: 186, siteName: 'Spain', categoryId: 0, categoryName: ''}, {siteId: 101, siteName: 'Italy', categoryId: 0, categoryName: ''}]},
                {mainCategoryId: 1, platformId: 4, mainCategoryName: '', siteCategoryList: [{siteId: 0, siteName: 'US', categoryId: 0, categoryName: ''}]}
            ],
            // 持续时间
            durationTimeList: ["Days_3","Days_5","Days_7","Days_30","GTC"],
            productDetail:[],
            productLineObj: {
                currentProductLineId: productObj.productLineId,
                productLineList:[],
                productLineName: productObj.productLineName
            },
            keywordsCountLimit: 4
        },
        methods: {
            getSpuInfo() {
                let that = this;
                $.ajax({
                    url: '/product/editor/getSpuInfoForEdit.do',
                    dataType: 'json',
                    data: {spu: productObj.spuCode},
                    success: function (result) {
                        that.spu = result;
                        if (!that.spu.isEdit) {
                            warningMessage('您还没有领取')
                        }
                        that.productInfo.isMultipleForProduct = that.spu.isMultiple;
                        productObj.productLineId = that.spu.productLineId;
                        var sku0 = that.spu.skuList[0];
                        if (sku0 != undefined && sku0 != null) {
                            if (sku0.propertyList != null) {
                                for (var i = 0; i < sku0.propertyList.length; i++) {
                                    that.propertyTypeList.push({propertyTypeName: sku0.propertyList[i].propertyType, index: i});
                                }
                            }
                        }
                        for (var i = 0; i < that.spu.skuList.length; i++) {
                            var sku = that.spu.skuList[i];
                            if (sku.propertyList != null) {
                                for (var j = 0; j < sku.propertyList.length; j++) {
                                    sku.propertyList[j].index = j;
                                }
                            }
                        }

                        // 关键词
                        var keywordList = result.keywordList;
                        var keywordMap = {};
                        if (keywordList && keywordList.length > 0) {
                            for (var i = 0; i < keywordList.length; i++) {
                                var languageId = keywordList[i].languageId;
                                keywordMap[languageId] = keywordList[i];
                            }
                        }
                        for (var i = 0; i < that.allLanguageKeywordsList.length; i++) {
                            var languageId = that.allLanguageKeywordsList[i].languageId;
                            if (keywordMap[languageId]) {
                                that.allLanguageKeywordsList[i].keywords = keywordMap[languageId].keywords;
                            }
                        }

                        // 卖点
                        var bulletPointList = result.bulletPointList;
                        var sellPointMap = {};
                        if (bulletPointList) {
                            for (var i = 0; i < bulletPointList.length; i++) {
                                var languageId = bulletPointList[i].languageId;
                                sellPointMap[languageId] = bulletPointList[i];
                            }
                            for (var i = 0; i < that.amazonSellPointObjList.length; i++) {
                                var languageId = that.amazonSellPointObjList[i].languageId;
                                if (sellPointMap[languageId]) {
                                    that.amazonSellPointObjList[i].sellPointList = sellPointMap[languageId].sellPointList;
                                    var sellPointList = that.amazonSellPointObjList[i].sellPointList;
                                    if (sellPointList && sellPointList.length < productObj.sellPointNum) {
                                        var num = productObj.sellPointNum - sellPointList.length;
                                        for (var j = 0; j < num; j++) {
                                            sellPointList.push({sellPoint: ''});
                                        }
                                    }
                                }
                            }
                        }
                    },
                    error: function () {
                        errorMessage('该spu不存在或者查询出错');
                    }
                })
            },
            getSpuCategory() {
                let that = this;
                $.ajax({
                    url: '/product/editor/getSpuCategory.do',
                    data: {spu: productObj.spuCode},
                    dataType: 'json',
                    success: function (result) {
                       for (var i = 0; i < result.length; i++) {
                           for (var j = 0; j < that.enCategoryList.length; j++) {
                               if (result[i].platformId == that.enCategoryList[j].platformId) {
                                   var resultPlatCategory = result[i];
                                   var enCategory = that.enCategoryList[j];
                                   that.enCategoryList[j].mainCategoryId = resultPlatCategory.mainCategoryId;
                                   that.enCategoryList[j].mainCategoryName = resultPlatCategory.mainCategoryName;
                                   that.enCategoryList[j].storeId = resultPlatCategory.storeId;
                                   that.enCategoryList[j].storeCategoryName = resultPlatCategory.storeCategoryName;
                                   var flag = false;
                                   for (var m = 0; m < resultPlatCategory.siteCategoryList.length; m++) {
                                       for (var n = 0; n < enCategory.siteCategoryList.length; n++) {
                                           if (resultPlatCategory.siteCategoryList[m].siteId == enCategory.siteCategoryList[n].siteId) {
                                               var resultSiteCategory = resultPlatCategory.siteCategoryList[m];
                                               if (resultSiteCategory.checked && !flag) {
                                                   resultSiteCategory.isLayuiThis = true;
                                                   flag = true;
                                               }
                                               enCategory.siteCategoryList.splice(n, 1);
                                               enCategory.siteCategoryList.splice(n, 0, resultSiteCategory);
                                               break;
                                           }
                                       }
                                   }
                                   break;
                               }
                           }
                       }
                    }
                });
            },
            getAttributeList() {
              let that = this;
                $.ajax({
                  url: '/features/inventory/getItemProperties.do',
                  dataType: 'json',
                  success: function (result) {
                      for (var i = 0; i < result.length; i++) {
                          that.attributeList.push(result[i]);
                      }
                  }
              })
            },
            getSpuDescInfo() {
              let that = this;
              $.ajax({
                  url: '/product/editor/getSpuDescBySpu.do',
                  data: {spu: productObj.spuCode},
                  dataType: 'json',
                  success: function (result) {
                      var  spuDescList = that.spuDescList;
                      var note = '1.Due to the manual measurement and different measurement methods, the actual size could be slightly different.<br>2.Please be reminded that due to lighting effects and monitor\'s brightness/contrast settings etc, the color tone of the website\'s photo and the actual item could be slightly different.'
                      for (var i = 0; i < spuDescList.length; i++) {
                         for (var j = 0; j < result.length; j++) {
                             if (result[j].languageId == spuDescList[i].languageId) {
                                 if (result[j].languageId == 1 && result[j].note == '') {
                                     result[j].note = note;
                                 }
                                 spuDescList.splice(i, 1);
                                 spuDescList.splice(i, 0, result[j]);
                                 break;
                             }
                         }
                      }
                      if (result.length == 0) {
                          for (var i = 0; i < spuDescList.length; i++) {
                              if (spuDescList[i].languageId == 1) {
                                  spuDescList[i].note = note;
                              }
                          }
                      }
                  }
              })
            },
            getSpuTitleInfo() {
                let that = this;
                $.ajax({
                    url: '/product/editor/getSpuTitle.do',
                    data: {spu: productObj.spuCode},
                    dataType: 'json',
                    success: function (result) {
                        var spuTitleList = that.spuTitleList;
                        for (var i = 0; i < spuTitleList.length; i++) {
                            for (var j = 0; j < result.length; j++) {
                                if (result[j].languageId == spuTitleList[i].languageId) {
                                    spuTitleList.splice(i, 1);
                                    spuTitleList.splice(i, 0, result[j]);
                                    break;
                                }
                            }
                            if (spuTitleList[i].spuTitleList.length < productObj.minTitleCount) {
                                for (var m = spuTitleList[i].spuTitleList.length; m < productObj.minTitleCount; m++) {
                                        spuTitleList[i].spuTitleList.push({title: ''});
                                }
                            }
                        }
                    }
                })
            },
            getEabyPublisAccountList() {
                let that = this;
                $.ajax({
                    url: '/features/productLine/getProductLineAccountInfo.do',
                    data: {productLineId: productObj.productLineId, spu: productObj.spuCode},
                    dataType: 'json',
                    success: function (result) {
                        var ebaySiteAccountList = result[productObj.ebayKey];
                        if (ebaySiteAccountList != undefined) {
                            that.ebaySiteList = ebaySiteAccountList;
                        }
                    }
                });
            },
            getEbayProductPushlishInfo() {
                if (productObj.ebayPublicProductInfo == undefined) {
                    getUploadInfoBypriceTypeAndSpuForEbay(0);
                    /*$.ajax({
                        url: '/product/editor/getEbayAdsInfo.do',
                        type: 'get',
                        data: {spu: productObj.spuCode, picType: 0},
                        dataType: 'json',
                        success: function (result) {
                            vueObj.productInfo = result;
                            if (vueObj.productInfo.picType == 1) {
                                vueObj.durationTimeList = [];
                                vueObj.durationTimeList.push('Days_3');
                                vueObj.durationTimeList.push('Days_5');
                                vueObj.durationTimeList.push('Days_7');
                                vueObj.durationTimeList.push('Days_10');
                                vueObj.durationTimeList.push('Days_30');
                                vueObj.durationTimeList.push('GTC');
                            }
                            ebayAdsInfo = vueObj.productInfo;

                            // 显示问题
                            var uploadSiteInfoList = productObj.vueObj.productInfo.uploadSiteInfoList;
                            var siteIds = [];
                            for (var i = 0; i < uploadSiteInfoList.length; i++) {
                                var accountList = uploadSiteInfoList[i].accountList;
                                if (accountList != null && accountList.length > 0) {
                                    siteIds.push(uploadSiteInfoList[i].siteId);
                                }
                            }
                            var enCategoryList = vueObj.enCategoryList;
                            var isHasCheckedSite = false;
                            for (var i = 0; i < enCategoryList.length; i++) {
                                // ebay平台
                                if (enCategoryList[i].platformId == 1) {
                                    for (var j = 0; j < enCategoryList[i].siteCategoryList.length; j++) {
                                        var siteId = enCategoryList[i].siteCategoryList[j].siteId;
                                        if (siteId != undefined && siteIds.indexOf(siteId) != -1) {
                                            enCategoryList[i].siteCategoryList[j].checked = true;
                                            enCategoryList[i].siteCategoryList[j].isLayuiThis = false;
                                            if (!isHasCheckedSite) {
                                                isHasCheckedSite = true;
                                                enCategoryList[i].siteCategoryList[j].isLayuiThis = true;
                                            }
                                        } else {
                                            enCategoryList[i].siteCategoryList[j].checked = false;
                                            enCategoryList[i].siteCategoryList[j].isLayuiThis = false;
                                        }
                                    }
                                }
                            }
                        },
                        error: function () {
                            ebayAdsInfo = undefined;
                        }
                    });*/
                }
            },
            getProductLine() {
                let that = this;
                $.ajax({
                    url: '/features/productLine/getProductLineList.do',
                    dataType: 'json',
                    success: function (result) {
                        for (var i = 0; i < result.length; i++) {
                            that.productLineObj.productLineList.push(result[i]);
                        }
                    }
                })
            },
            addTitle(languageId) {
                let that = this;
                var spuTitleList = that.spuTitleList;
                for (var i = 0; i < spuTitleList.length; i++) {
                    if (spuTitleList[i].languageId == languageId) {
                        if (spuTitleList[i].spuTitleList.length > 14) {
                            if (productObj.layer == undefined) {
                                warningMessage(productObj.titleCountMsg);
                                return;
                            } else {
                                productObj.layer.msg(productObj.titleCountMsg, {icon: 5});
                                return;
                            }
                        } else {
                            that.spuTitleList[i].spuTitleList.push({title: ''});
                            break;
                        }
                    }
                }
            },
            deleteTitle(index, languageId) {
                let that = this;
                var spuTitleList = that.spuTitleList;
                for (var i = 0; i < spuTitleList.length; i++) {
                     if (spuTitleList[i].languageId == languageId) {
                    if (spuTitleList[i].spuTitleList.length > 0 && spuTitleList[i].spuTitleList.length < (productObj.minTitleCount + 1)) {
                        if (productObj.layer == undefined) {
                            warningMessage(productObj.deleteTitleCount);
                            return;
                        } else {
                            productObj.layer.msg(productObj.deleteTitleCount, {icon: 5});
                            return;
                        }
                    } else {
                        that.spuTitleList[i].spuTitleList.splice(index, 1)
                    }
                    }
                }
            },
            addSellPoint(languageId) {
                let that = this;
                for (var i = 0; i < that.amazonSellPointObjList.length; i++) {
                    if (that.amazonSellPointObjList[i].languageId == languageId) {
                        var sellPointList = that.amazonSellPointObjList[i].sellPointList;
                        if (sellPointList.length == 15) {
                            warningMessage(productObj.addSellPointCount);
                            return;
                        }
                        sellPointList.push({sellPoint: ''});
                        break;
                    }
                }
            },
            delSellPoint(languageId, index) {
                let that = this;
                for (var i = 0; i < that.amazonSellPointObjList.length; i++) {
                    if (that.amazonSellPointObjList[i].languageId == languageId) {
                        var sellPointList = that.amazonSellPointObjList[i].sellPointList;
                        if (sellPointList.length == 1) {
                            warningMessage(productObj.delSellPointCount);
                            return;
                        }
                        sellPointList.splice(index, 1);
                        break;
                    }
                }
            },
            addKeywords(languageId) {
                let that = this;
                if (that.allLanguageKeywordsList.length > 14) {
                    if (productObj.layer == undefined) {
                        alert(productObj.addKeywordsCount);
                        return;
                    } else {
                        productObj.layer.msg(productObj.addKeywordsCount, {icon: 5});
                        return;
                    }
                }
                var allLanguageKeywordsList = that.allLanguageKeywordsList;
                for (var i = 0; i < allLanguageKeywordsList.length; i++) {
                    if (allLanguageKeywordsList[i].languageId == languageId) {
                        allLanguageKeywordsList[i].keywordList.push({keyword: ''})
                        break;
                    }
                }
            },
            delKeywords(languageId, index) {
                let that = this;
                for (var i = 0; i < that.allLanguageKeywordsList.length; i++) {
                    if (that.allLanguageKeywordsList[i].languageId == languageId) {
                        var keywordList = that.allLanguageKeywordsList[i].keywordList;
                        if (keywordList.length == 1) {
                            warningMessage('关键词的数量不能少于1');
                            return;
                        } else {
                            keywordList.splice(index, 1);
                        }
                        break;
                    }
                }
            },
            deleteSku(siteIndex, accountIndex , skuIndex) {
                let productInfo = this.productInfo;
                let uploadSiteInfoList = productInfo.uploadSiteInfoList;
                let uploadSiteInfo = uploadSiteInfoList[siteIndex];
                let skuSize = 0;
                if (uploadSiteInfo != undefined) {
                    var currentAccount = uploadSiteInfo.accountList[accountIndex];
                    if (currentAccount != undefined) {
                        uploadSiteInfo.accountList[accountIndex].uploadSkuList.splice(skuIndex, 1);
                        skuSize =  uploadSiteInfo.accountList[accountIndex].uploadSkuList.length;
                    }
                }
                productInfo.uploadSiteInfoList.splice(siteIndex, 1, uploadSiteInfo);
            },
            // 选择类目
            selectCategory(platformId, categoryType, siteId) { // categoryType:0代表主类目,1代表店铺分类,2代表站点类目
                let that = this;
                var index = productObj.layer.open({
                    type: 1,
                    title: 'Category',
                    area: ['500px','600px'],
                    // closeBtn: true,
                    skin:'layui-layer-lan',
                    anim: 0,
                    maxmin:true,
                    shade: 0.8,
                    content: '<div id="easyuiTree" class="layui-row">\n' +
                        '    <ul id="categoryTree"></ul>\n' +
                        '</div>',
                    success: function (layero, index) {
                        var loadingFlag;
                        // ebay平台
                        if (platformId == 1) {
                            if (categoryType == 0) {
                                $("#categoryTree").tree({
                                    url: '/features/productLine/getPlatMainCategoryTreeInfo.do?callbackControl=1',
                                    queryParams: {
                                        productLineId: vueObj.productLineObj.currentProductLineId
                                    },
                                    onBeforeLoad: function() {
                                        //loadingFlag = layer.msg('正在加载数据，请稍候……', { icon: 16, shade: 0.01,shadeClose:false,time:60000 });
                                    },
                                    onLoadSuccess: function() {
                                        //productObj.layer.close(loadingFlag);
                                    },
                                    onSelect: function (node) {
                                        var isLeaf = $("#categoryTree").tree('isLeaf', node.target);
                                        if (isLeaf) { // 如果是叶子节点
                                            var parent = $("#categoryTree").tree('getParent', node.target);
                                            var categoryNames = node.text;
                                            while (parent != undefined) {
                                                categoryNames = parent.text + '>' + categoryNames;
                                                parent = $("#categoryTree").tree('getParent', parent.target);
                                            }
                                            for (var i = 0; i < that.enCategoryList.length; i++) {
                                                // if (that.enCategoryList[i].platformId) {
                                                    // 选择主类目
                                                if (categoryType == 0) {
                                                    that.enCategoryList[i].mainCategoryName = categoryNames;
                                                    that.enCategoryList[i].mainCategoryId = node.id;
                                                    // 去掉其他类目的值
                                                    for (var m = 0; m < that.enCategoryList[i].siteCategoryList.length; m++) {
                                                        that.enCategoryList[i].siteCategoryList[m].categoryName = '';
                                                        that.enCategoryList[i].siteCategoryList[m].categoryId = 0;
                                                    }
                                                }
                                            }

                                            $.ajax({
                                                url: '/features/productLine/getOtherPlatCategoryByMainCategory.do',
                                                dataType: 'json',
                                                data: {categoryId: node.id}, // TODO 需要替换类目 node.id
                                                success: function (result) {
                                                    // 获取ebay的分类
                                                    var recommendEbayCategoryForSite = result['Ebay'];
                                                    if (recommendEbayCategoryForSite != undefined) {
                                                        // 赋值
                                                        for (var j = 0; j < recommendEbayCategoryForSite.length; j++) {
                                                            for (var i = 0; i < that.enCategoryList.length; i++) {
                                                                if (that.enCategoryList[i].platformId == 1) {
                                                                    for (var m = 0; m < that.enCategoryList[i].siteCategoryList.length; m++) {
                                                                        if (recommendEbayCategoryForSite[j].siteId == that.enCategoryList[i].siteCategoryList[m].siteId) {
                                                                            recommendEbayCategoryForSite[j].checked = that.enCategoryList[i].siteCategoryList[m].checked;
                                                                            recommendEbayCategoryForSite[j].isLayuiThis = that.enCategoryList[i].siteCategoryList[m].isLayuiThis;
                                                                            that.enCategoryList[i].siteCategoryList.splice(m, 1);
                                                                            that.enCategoryList[i].siteCategoryList.splice(m, 0, recommendEbayCategoryForSite[j]);
                                                                            that.$nextTick(function () {
                                                                                productObj.formSelects.render();
                                                                                productObj.form.render('select', 'singleSelect');
                                                                                $("#ebayCategoryAttribute").find('input').removeAttr("readonly");
                                                                            });
                                                                            break;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    // 获取亚马逊的分类
                                                    var recommendAmazonCategoryForSite = result['Amazon'];
                                                    var amazonCategoryBySiteIdMap = {};
                                                    if (recommendAmazonCategoryForSite) {
                                                        for (var j = 0; j < recommendAmazonCategoryForSite.length; j++) {
                                                            var siteId = recommendAmazonCategoryForSite[j].siteId;
                                                            amazonCategoryBySiteIdMap[siteId] = recommendAmazonCategoryForSite[j];
                                                        }
                                                        for (var i = 0; i < that.enCategoryList.length; i++) {
                                                            // 亚马逊平台
                                                            if (that.enCategoryList[i].platformId == 2) {
                                                                for (var j = 0; j < that.enCategoryList[i].siteCategoryList.length; j++) {
                                                                    var siteId = that.enCategoryList[i].siteCategoryList[j].siteId;
                                                                    if (amazonCategoryBySiteIdMap[siteId]) {
                                                                        that.enCategoryList[i].siteCategoryList[j] = amazonCategoryBySiteIdMap[siteId];
                                                                        vueObj.$set( that.enCategoryList[i].siteCategoryList, j,   that.enCategoryList[i].siteCategoryList[j]);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }

                                                    var recommendAliexpressCategoryForSite = result['Aliexpress'];
                                                    var aliCategoryBySiteIdMap = {};
                                                    if (recommendAliexpressCategoryForSite) {
                                                        for (var j = 0; j < recommendAliexpressCategoryForSite.length; j++) {
                                                            var siteId = recommendAliexpressCategoryForSite[j].siteId;
                                                            aliCategoryBySiteIdMap[siteId] = recommendAliexpressCategoryForSite[j];
                                                        }
                                                        for (var i = 0; i < that.enCategoryList.length; i++) {
                                                            // 速卖通平台
                                                            if (that.enCategoryList[i].platformId == 4) {
                                                                for (var j = 0; j < that.enCategoryList[i].siteCategoryList.length; j++) {
                                                                    var siteId = that.enCategoryList[i].siteCategoryList[j].siteId;
                                                                    if (aliCategoryBySiteIdMap[siteId]) {
                                                                        that.enCategoryList[i].siteCategoryList[j] = aliCategoryBySiteIdMap[siteId];
                                                                        vueObj.$set( that.enCategoryList[i].siteCategoryList, j,   that.enCategoryList[i].siteCategoryList[j]);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            });
                                            // 关闭窗口
                                            productObj.layer.close(index);
                                        }
                                    }
                                });
                            } else if (categoryType == 1) {
                                $("#categoryTree").tree({
                                    url: '/features/productLine/getShopCategoryInfo.do',
                                    queryParams: {
                                        accountId: 4
                                    },
                                    onSelect: function (node) {
                                        var isLeaf = $("#categoryTree").tree('isLeaf', node.target);
                                        if (isLeaf) { // 如果是叶子节点
                                            var parent = $("#categoryTree").tree('getParent', node.target);
                                            var categoryNames = node.text;
                                            while (parent) {
                                                categoryNames = parent.text + '>' + categoryNames;
                                                parent = $("#categoryTree").tree('getParent', parent.target);
                                            }
                                            for (var i = 0; i < that.enCategoryList.length; i++) {
                                                if (that.enCategoryList[i].platformId == platformId) {
                                                    that.enCategoryList[i].storeId = node.id;
                                                    that.enCategoryList[i].storeCategoryName = categoryNames;
                                                    break;
                                                }
                                            }
                                            // 关闭窗口
                                            productObj.layer.close(index);
                                        }
                                    }
                                });
                            } else if (categoryType == 2) {
                                $("#categoryTree").tree({
                                    url: '/features/productLine/list.do',
                                    queryParams: {
                                        siteId: siteId,
                                        platform: 'Ebay'
                                    },
                                    onSelect: function (node) {
                                        var isLeaf = $("#categoryTree").tree('isLeaf', node.target);
                                        if (isLeaf) { // 如果是叶子节点
                                            var parent = $("#categoryTree").tree('getParent', node.target);
                                            var categoryNames = node.text;
                                            while (parent) {
                                                categoryNames = parent.text + '>' + categoryNames;
                                                parent = $("#categoryTree").tree('getParent', parent.target);
                                            }
                                            for (var i = 0; i < that.enCategoryList.length; i++) {
                                                if (that.enCategoryList[i].platformId == platformId) {
                                                    for (var j = 0; j < that.enCategoryList[i].siteCategoryList.length; j++) {
                                                        if (that.enCategoryList[i].siteCategoryList[j].siteId == siteId) {
                                                            that.enCategoryList[i].siteCategoryList[j].categoryName = categoryNames;
                                                            that.enCategoryList[i].siteCategoryList[j].categoryId = node.id;

                                                            // 获取属性
                                                            that.enCategoryList[i].siteCategoryList[j].categoryAttributeList = [];
                                                            $.ajax({
                                                               url: '/features/productLine/getCategoryAttrInfo.do',
                                                                data: {categoryId: node.id, siteId: siteId},
                                                                dataType: 'json',
                                                                success: function (result) {
                                                                   var categoryAttributeList = [];
                                                                   for (var m = 0; m < result.length; m++) {
                                                                       categoryAttributeList.push(result[m]);
                                                                   }
                                                                   var siteCategory = that.enCategoryList[i].siteCategoryList[j];
                                                                   siteCategory.categoryAttributeList = categoryAttributeList;
                                                                    that.enCategoryList[i].siteCategoryList.splice(j, 1);
                                                                    that.enCategoryList[i].siteCategoryList.splice(j, 0, siteCategory)
                                                                    that.$nextTick(function () {
                                                                        productObj.formSelects.render();
                                                                        productObj.form.render('select', 'singleSelect');
                                                                        $("#ebayCategoryAttribute").find('input').removeAttr("readonly");
                                                                    })
                                                                }
                                                            });
                                                            break;
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                            // 关闭窗口
                                            productObj.layer.close(index);
                                        }
                                    },
                                    onLoadSuccess: function (node, data) {
                                        if (node == null) {

                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            },
            inputPropertyValue(skuId,index) {
                let that = this;
                var currentSku = that.spu.skuList[index];
                var productInfo = that.productInfo;
                for (var i = 0; i < productInfo.uploadSiteInfoList.length; i++) {
                    var uploadSiteInfo = productInfo.uploadSiteInfoList[i];
                    for (var j = 0; j < uploadSiteInfo.accountList.length; j++) {
                        var account = uploadSiteInfo.accountList[j];
                        for (var m = 0; m < account.uploadSkuList.length; m++) {
                            var sku = account.uploadSkuList[m];
                            if (sku.skuId == skuId) {
                                var propertyList = currentSku.propertyList;
                                sku.propertyList = [];
                                for (var n = 0; n < propertyList.length; n++) {
                                    sku.propertyList.push(propertyList[n]);
                                }
                                break;
                            }
                        }
                    }
                }
                var pp = that.productInfo.uploadSiteInfoList;
                that.productInfo.uploadSiteInfoList = [];
                for (var i = 0; i < pp.length; i++) {
                    that.productInfo.uploadSiteInfoList.push(pp[i]);
                }
            },
            // 修改重复的标题的时候，再把颜色改回去
            changeRepeatTitle(siteId, accountId) {
                let uploadSiteInfoList = this.productInfo.uploadSiteInfoList;
                for (var i = 0; i < uploadSiteInfoList.length; i++) {
                    if (uploadSiteInfoList[i].siteId == siteId) {
                        for (var j = 0; j < uploadSiteInfoList[i].accountList.length; j++) {
                            if (uploadSiteInfoList[i].accountList[j].accountId == accountId) {
                                var account = uploadSiteInfoList[i].accountList[j];
                                account.circle = false;
                                uploadSiteInfoList[i].accountList.splice(j, 1);
                                uploadSiteInfoList[i].accountList.splice(j, 0, account);
                                break;
                            }
                        }
                        break;
                    }
                }
            },
            getProductDetail() {
                let that = this;
                $.ajax({
                    url: '/product/editor/getSpuInfo.do',
                    data: {spu: productObj.spuCode},
                    dataType: "json",
                    success: function (result) {
                        if (result != null) {
                            if (result.code == 200) {
                                if (result.data != null) {
                                    that.productDetail = result.data;
                                }
                            } else {
                                errorMessage("获取数据失败");
                            }
                        }
                    }
                })
            },
            updateEbayCategory(categoryId, siteId){
                var loadingFlag;
                let that = this;
                $.ajax({
                    url: '/features/productLine/updateCategorySpecifics.do',
                    dataType: 'json',
                    data: {categoryId: categoryId, siteId: siteId},
                    beforeSend: function() {
                        loadingFlag = productObj.layer.alert('正在更新属性，请稍候……', { icon: 16, shade: 0.01,shadeClose:false,time:60000 });
                    },
                    success: function (result) {
                        if (loadingFlag != undefined) {
                            productObj.layer.close(loadingFlag);
                        }
                        if (result != null && result.length > 0) {
                            var enCategoryList = that.enCategoryList;
                            for (var i = 0; i < enCategoryList.length; i++) {
                                // ebay平台
                                if (enCategoryList[i].platformId == 1) {
                                    var siteCategoryList = enCategoryList[i].siteCategoryList;
                                    for (var j = 0; j < siteCategoryList.length; j++) {
                                        if (siteCategoryList[j].siteId == siteId) {
                                            siteCategoryList[j].categoryAttributeList = [];
                                            for (var m = 0; m < result.length; m++) {
                                                siteCategoryList[j].categoryAttributeList.push(result[m]);
                                            }
                                            that.$nextTick(function () {
                                                productObj.formSelects.render();
                                                productObj.form.render('select', 'singleSelect');
                                                $("#ebayCategoryAttribute").find('input').removeAttr("readonly");
                                            })
                                            break;
                                        }
                                    }
                                    break;
                                }
                            }

                        } else {
                            warningMessage('没有获取到属性信息或者不需要更新属性信息');
                        }
                    }
                })
            },
            keyUpDescprition(type,languageId) {
                var desc = $('#description' + languageId).html();
                for (var i = 0; i < this.spuDescList.length; i++) {
                    if (this.spuDescList[i].languageId == languageId) {
                        if (type == 1) {
                            this.spuDescList[i].description = desc;
                        }
                        break;
                    }
                }
            },
            suggestCategory(suggestTitle) {
                var loadingFlag;
                productObj.layer.open({
                    type: 1,
                    skin: 'layui-layer-lan',
                    title: '选择推荐的类目',
                    area: ['600px', '500px'],
                    content: '<div id="suggestCategoryDiv" class="layui-col-sm12"></div>',
                    success: function (layero, index) {
                        $.ajax({
                            url: '/features/productLine/getSuggestedCategories.do' ,
                            data: {productLineId: productObj.productLineId, title: suggestTitle},
                            dataType: 'json',
                            beforeSend: function() {
                                loadingFlag = layer.alert('正在加载，请稍候……', { icon: 16, shade: 0.01,shadeClose:false,time:60000 });
                            },
                            success: function (result) {
                                if (loadingFlag != undefined) {
                                    productObj.layer.close(loadingFlag);
                                }
                                if (result != null && result.length > 0) {
                                    var categoryHtml = "";
                                    for (var i = 0; i < result.length; i++) {
                                        categoryHtml += '<div class="layui-row"><div class="layui-col-sm12 rch-margin-top-2">';
                                        categoryHtml += '<label style="font-weight: bolder">'+(i+1)+'、</label><span onclick="selectSuggestCategory(this, '+ index +')" category-id="' + result[i].categoryId + '">' + result[i].categoryName + '</span>';
                                        categoryHtml += '</div></div>';
                                    }
                                    $("#suggestCategoryDiv").append(categoryHtml);
                                } else {
                                   var message = "";
                                   message += "<div class='layui-row' style='margin-top: 30%'><div class='layui-col-sm12 text-center'><label style='font-size: 20px'>没有需要推荐的类目</label></div></div>"
                                   $("#suggestCategoryDiv").append(message);
                                }
                            }
                        });
                    }
                });
            },
            addAttr(siteId) {
                let that = this;
                var enCategoryList = that.enCategoryList;
                for (var i = 0; i < enCategoryList.length; i++) {
                    if (enCategoryList[i].platformId == 1) { // ebay平台
                        for (var j = 0; j < enCategoryList[i].siteCategoryList.length; j++) {
                            var siteCategory = enCategoryList[i].siteCategoryList[j];
                            if (siteCategory.siteId == siteId) {
                                var attr = {attrId: 0, name: '', siteId: siteId, inputType: 'text', categoryId: siteCategory.categoryId, inputValue: ''};
                                if (!siteCategory.categoryAttributeList) {
                                    siteCategory.categoryAttributeList = [];
                                }
                                siteCategory.categoryAttributeList.push(attr);
                                enCategoryList[i].siteCategoryList.splice(j, 1);
                                enCategoryList[i].siteCategoryList.splice(j, 0, siteCategory);
                                break;
                            }
                        }
                        break;
                    }
                }
            },
            selectAmazonCategory(platformId, categoryType, siteId) {
                // TODO categoryType=2(站点类目)
                let that = this;
                if (categoryType == 2) {
                    var index = productObj.layer.open({
                        type: 1,
                        title: 'Amazon Category',
                        area: ['500px','600px'],
                        // closeBtn: true,
                        skin:'layui-layer-lan',
                        anim: 0,
                        maxmin:true,
                        shade: 0.8,
                        content: '<div id="easyuiTree" class="layui-row">\n' +
                            '    <ul id="categoryTree"></ul>\n' +
                            '</div>',
                        success: function (layero, index) {
                            var loadingFlag;
                            $("#categoryTree").tree({
                                url: '/features/productLine/list.do?platform=Amazon&siteId=' + siteId,
                                queryParams: {
                                    productLineId: vueObj.productLineObj.currentProductLineId
                                },
                                onBeforeLoad: function() {
                                    //loadingFlag = layer.msg('正在加载数据，请稍候……', { icon: 16, shade: 0.01,shadeClose:false,time:60000 });
                                },
                                onLoadSuccess: function() {
                                    //productObj.layer.close(loadingFlag);
                                },
                                onSelect: function (node) {
                                    var isLeaf = $("#categoryTree").tree('isLeaf', node.target);
                                    if (isLeaf) { // 如果是叶子节点
                                        var parent = $("#categoryTree").tree('getParent', node.target);
                                        var categoryNames = node.text;
                                        while (parent != undefined) {
                                            categoryNames = parent.text + '>' + categoryNames;
                                            parent = $("#categoryTree").tree('getParent', parent.target);
                                        }
                                        var mainCategoryName = '';
                                        var mainCategoryId = 0;
                                        var storeId = 0;
                                        for (var i = 0; i < that.enCategoryList.length; i++) {
                                            // ebay平台
                                            if (that.enCategoryList[i].platformId == 1) {
                                                mainCategoryName = that.enCategoryList[i].mainCategoryName;
                                                mainCategoryId = that.enCategoryList[i].mainCategoryId;
                                                storeId = that.enCategoryList[i].storeId;
                                            }
                                        }
                                        for (var i = 0; i < that.enCategoryList.length; i++) {
                                            if (that.enCategoryList[i].platformId == platformId) {
                                               that.enCategoryList[i].mainCategoryName = mainCategoryName;
                                               that.enCategoryList[i].mainCategoryId = mainCategoryId;
                                                that.enCategoryList[i].storeId = storeId;
                                                for (var m = 0; m < that.enCategoryList[i].siteCategoryList.length; m++) {
                                                    if (that.enCategoryList[i].siteCategoryList[m].siteId == siteId) {
                                                        that.enCategoryList[i].siteCategoryList[m].categoryName = categoryNames;
                                                        that.enCategoryList[i].siteCategoryList[m].categoryId = node.id.split('!')[0];
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                        productObj.layer.close(index);
                                    }
                                }
                            });

                        }
                    });
                }
            },
            selectAliCategory(platformId, categoryType, siteId) {
                let that = this;
                if (categoryType == 2) {
                    var index = productObj.layer.open({
                        type: 1,
                        title: 'Amazon Category',
                        area: ['500px','600px'],
                        // closeBtn: true,
                        skin:'layui-layer-lan',
                        anim: 0,
                        maxmin:true,
                        shade: 0.8,
                        content: '<div id="easyuiTree" class="layui-row">\n' +
                            '    <ul id="categoryTree"></ul>\n' +
                            '</div>',
                        success: function (layero, index) {
                            var loadingFlag;
                            $("#categoryTree").tree({
                                url: '/features/productLine/list.do?platform=AliExpress&siteId=0',
                                queryParams: {
                                    productLineId: vueObj.productLineObj.currentProductLineId
                                },
                                onBeforeLoad: function() {
                                    //loadingFlag = layer.msg('正在加载数据，请稍候……', { icon: 16, shade: 0.01,shadeClose:false,time:60000 });
                                },
                                onLoadSuccess: function() {
                                    //productObj.layer.close(loadingFlag);
                                },
                                onSelect: function (node) {
                                    var isLeaf = $("#categoryTree").tree('isLeaf', node.target);
                                    if (isLeaf) { // 如果是叶子节点
                                        var parent = $("#categoryTree").tree('getParent', node.target);
                                        var categoryNames = node.text;
                                        while (parent != undefined) {
                                            categoryNames = parent.text + '>' + categoryNames;
                                            parent = $("#categoryTree").tree('getParent', parent.target);
                                        }
                                        var mainCategoryName = '';
                                        var mainCategoryId = 0;
                                        var storeId = 0;
                                        for (var i = 0; i < that.enCategoryList.length; i++) {
                                            // ebay平台
                                            if (that.enCategoryList[i].platformId == 1) {
                                                mainCategoryName = that.enCategoryList[i].mainCategoryName;
                                                mainCategoryId = that.enCategoryList[i].mainCategoryId;
                                                storeId = that.enCategoryList[i].storeId;
                                            }
                                        }
                                        for (var i = 0; i < that.enCategoryList.length; i++) {
                                            if (that.enCategoryList[i].platformId == platformId) {
                                                that.enCategoryList[i].mainCategoryName = mainCategoryName;
                                                that.enCategoryList[i].mainCategoryId = mainCategoryId;
                                                that.enCategoryList[i].storeId = storeId;
                                                for (var m = 0; m < that.enCategoryList[i].siteCategoryList.length; m++) {
                                                    if (that.enCategoryList[i].siteCategoryList[m].siteId == siteId) {
                                                        that.enCategoryList[i].siteCategoryList[m].categoryName = categoryNames;
                                                        that.enCategoryList[i].siteCategoryList[m].categoryId = node.id;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                        productObj.layer.close(index);
                                    }
                                }
                            });

                        }
                    });
                }
            }
        }
    });
    productObj.vueObj = vueObj;
    layui.use(['element', 'form', 'laydate', 'formSelects', 'layedit'], function(){
        var element = layui.element;
        var form = layui.form;
        var layer = layui.layer;
        productObj.layer = layer;
        productObj.form = layui.form;
        var laydate = layui.laydate;
        productObj.laydate = laydate;
        var formSelects = layui.formSelects;
        productObj.formSelects = layui.formSelects;
        var layedit = layui.layedit;

        //执行一个laydate实例
        laydate.render({
            elem: '#uploadTime' //指定元素
            ,type: 'datetime'
        });

        element.on('tab(docDemoTabBrief)', function(){
            if (!productObj.initClick) {
                // 火狐浏览器
                if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
                    if (productObj.form != undefined) {
                        form.render('');
                        productObj.initClick = true;
                    }
                }
            }
            var layId = this.getAttribute('lay-id');
            if (layId == 2) {
                tabInitSiteDescEditor();
            } else if (layId == 4) {
                if (!$("#aliIframe").attr('src')) {
                    window.open( 'ali_product_editor.jsp?spu=' + productObj.spuCode + '&productLineId=' + productObj.productLineId, '_blank');
                 }
            }  else if (layId == 3) {
                window.open('amazon_product_editor.jsp?spu=' + productObj.spuCode + '&productLineId=' + productObj.productLineId, '_blank')
            }
        });
        element.on('tab(titleAndDescByLanguageTab)', function(){
            var layId = this.getAttribute('lay-id');
            var languageEditor = productObj.languageEditor;
            var id = '#' + productObj.languageDesc.desc + layId;
        });

        // 自定义规则
        form.verify({
            onlineStock: function(value, item){ //value：表单的值、item：表单的DOM对象
              if (value < 0) {
                  return '在线库存必须大于0';
              }
            }
        });

        form.on('checkbox(ebaySelectedImages)', function (data) {
            var $checkObj = $(data.elem);
            var value = parseInt($checkObj.val());
            var checked = $checkObj.prop("checked");
            var rch_image_id = $checkObj.attr('rch-image-id')
            var platform = $checkObj.attr('platform');
            var skuList = vueObj.spu.skuList;
            var skuId = $checkObj.attr('sku-id');
            var otherInpu = $checkObj.parent("div").siblings('div').find('input');
            // 其他的项，改为不选择状态
            otherInpu.each(function (i, e) {
                $(e).prop("checked", false)
                form.render('checkbox');
            });
            for (var i = 0; i < skuList.length; i++) {
                var sku = skuList[i];
                if (sku.skuId == skuId) {
                    var productImageVOList = sku.productImageVOList;
                    var currentImage = productImageVOList[rch_image_id];
                    if (currentImage != undefined) {
                        var picTypeForPlatform = currentImage.picTypeForPlatform;
                        if (checked) {
                            picTypeForPlatform[platform] = [value];
                        } else {
                            picTypeForPlatform[platform] = [];
                        }
                    }
                }
            }
        });
        form.on('checkbox(selectAccount)', function (data) {

            var $accountObj = $(data.elem);
            // 是否被选中
            var checked = $accountObj.prop("checked");
            // 账号id
            var value = parseInt($accountObj.val());
            // 当前站点的索引
            var site_index = $accountObj.attr('site-index');
            var ebaySiteList = vueObj.ebaySiteList;
            var cuurentSite = ebaySiteList[site_index];
            // 当前选中的ebay account的集合（包含的是账号id，账号名称）
            if (cuurentSite != undefined) {
                for (var i = 0; i < cuurentSite.ebayAccountList.length; i++) {
                    var ebayAccount = cuurentSite.ebayAccountList[i];
                    if (ebayAccount.accountId == value) {
                        ebayAccount.isChecked = checked;
                        if (checked) {
                            cuurentSite.accountCheckList.push(value);
                        } else {
                            var index = cuurentSite.accountCheckList.indexOf(value);
                            if (index > -1) {
                                cuurentSite.accountCheckList.splice(index, 1);
                            }
                        }
                        break;
                    }
                }
            }

            // 是否是多属性
            var isMultipleForProduct = vueObj.productInfo.isMultipleForProduct;
            var checkedEbayaccountObjList = [];
            var checkedSkuForMulObjs;
            if (isMultipleForProduct) {
                // 获取选取的sku(多属性)
                checkedSkuForMulObjs = $("input[name='multiPropertyInput']:checked");
            } else {
                checkedSkuForMulObjs = $("input[name='singlePropertyInput']:checked");
            }
            // 获取选中的账号
            for (var i = 0; i < cuurentSite.ebayAccountList.length; i++) {
                if (cuurentSite.ebayAccountList[i].isChecked && !cuurentSite.ebayAccountList[i].isUpload) {
                    cuurentSite.ebayAccountList[i]['shippingCost'] = 0;
                    cuurentSite.ebayAccountList[i]['shippingEai'] = 0;
                    cuurentSite.ebayAccountList[i]['intlShippingCost'] = 0;
                    cuurentSite.ebayAccountList[i]['intlShippingEal'] = 0;
                    checkedEbayaccountObjList.push(cuurentSite.ebayAccountList[i]);
                }
            }
            var uploadSiteInfoList = vueObj.productInfo.uploadSiteInfoList;
            // 当前站点id
            var currentSiteId = cuurentSite.id;
            // 之前的站点信息
            var oldUploadSiteInfo;
            var alreadSiteIndex = undefined;
            for (var i = 0; i < uploadSiteInfoList.length; i++) {
                var uploadSiteInfo = uploadSiteInfoList[i];
                if (uploadSiteInfo.siteId == currentSiteId) {
                    oldUploadSiteInfo = uploadSiteInfo;
                    alreadSiteIndex = i;
                    /*if (checked) {
                        uploadSiteInfoList.splice(i, 1);
                    }*/
                    break;
                }
            }
            if (oldUploadSiteInfo == undefined) {
                var newUploadSiteInfo = {};
                newUploadSiteInfo['siteId'] = cuurentSite.id;
                newUploadSiteInfo['siteName'] = cuurentSite.name;
                newUploadSiteInfo['languageId'] = cuurentSite.languageId;
                for (var i = 0; i < checkedEbayaccountObjList.length; i++) {
                    var checkedEbayaccountObj = checkedEbayaccountObjList[i];
                    checkedEbayaccountObj['uploadSkuList'] = [];
                    for (var j = 0; j < checkedSkuForMulObjs.length; j++) {
                        var checkedSkuForMulObj = $(checkedSkuForMulObjs[j]);
                        // sku的名称
                        var skuName = checkedSkuForMulObj.attr('title');
                        // skuid
                        var skuId = checkedSkuForMulObj.attr('sku-id');
                        var skuObj = {};
                        skuObj['skuId'] = skuId;
                        skuObj['skuName'] = skuName;
                        for (var m = 0; m < vueObj.spu.skuList.length; m++) {
                            if (skuId == vueObj.spu.skuList[m].skuId) {
                                skuObj['propertyList'] = vueObj.spu.skuList[m].propertyList;
                                break;
                            }
                        }
                        checkedEbayaccountObj['uploadSkuList'].push(skuObj);
                    }
                }
                newUploadSiteInfo['accountList'] = checkedEbayaccountObjList;
                vueObj.productInfo.uploadSiteInfoList.push(newUploadSiteInfo);
            } else {
                var newUploadSiteInfo = oldUploadSiteInfo;
                var accountList = newUploadSiteInfo.accountList;
                if (accountList != undefined) {
                    if (checked) {
                        for (var i = 0; i < checkedEbayaccountObjList.length; i++) {
                            if (checkedEbayaccountObjList[i].accountId == value) {
                                checkedEbayaccountObjList[i]['uploadSkuList'] = [];
                                for (var j = 0; j < checkedSkuForMulObjs.length; j++) {
                                    var checkedSkuForMulObj = $(checkedSkuForMulObjs[j]);
                                    // sku的名称
                                    var skuName = checkedSkuForMulObj.attr('title');
                                    // skuid
                                    var skuId = checkedSkuForMulObj.attr('sku-id');
                                    var skuObj = {};
                                    skuObj['skuId'] = skuId;
                                    skuObj['skuName'] = skuName;
                                    for (var m = 0; m < vueObj.spu.skuList.length; m++) {
                                        if (skuId == vueObj.spu.skuList[m].skuId) {
                                            skuObj['propertyList'] = vueObj.spu.skuList[m].propertyList;
                                            break;
                                        }
                                    }
                                    checkedEbayaccountObjList[i]['uploadSkuList'].push(skuObj);
                                }
                                newUploadSiteInfo.accountList.push(checkedEbayaccountObjList[i]);
                                break;
                            }
                        }
                        uploadSiteInfoList.splice(alreadSiteIndex, 1);
                        uploadSiteInfoList.splice(alreadSiteIndex, 0, newUploadSiteInfo)
                    } else {
                        for (var i = 0; i < accountList.length; i++) {
                            if (accountList[i].accountId == value) {
                                accountList.splice(i, 1);
                            }
                        }

                        // 删除富文本编辑器
                        // 给富文本编辑器赋值
                        var descId = productObj.siteDesc.descForSite + cuurentSite.id;
                        if (productObj.siteEditor[descId]) {
                            productObj.siteEditor[descId].remove();
                        }
                        var specificationsId = productObj.siteDesc.specificationsForSite + cuurentSite.id;
                        if (productObj.siteEditor[specificationsId])  {
                            productObj.siteEditor[specificationsId].remove();
                        }
                        var packageIncludedId = productObj.siteDesc.packageIncludedForSite + cuurentSite.id;
                        if (productObj.siteEditor[packageIncludedId])  {
                            productObj.siteEditor[packageIncludedId].remove();
                        }
                        var noteId = productObj.siteDesc.noteForSite + cuurentSite.id;
                        if (productObj.siteEditor[noteId])  {
                            productObj.siteEditor[noteId].remove();
                        }
                    }
                }
            }

            var siteIds = [];
            var alredySiteIds = [];
            // 删掉账号数量为0的站点
            for (var i = 0; i < vueObj.productInfo.uploadSiteInfoList.length; i++) {
                if (vueObj.productInfo.uploadSiteInfoList[i].accountList.length == 0) {
                    siteIds.push(vueObj.productInfo.uploadSiteInfoList[i].siteId);
                    vueObj.productInfo.uploadSiteInfoList.splice(i, 1);
                } else{
                    if (alredySiteIds.indexOf(vueObj.productInfo.uploadSiteInfoList[i].siteId) == -1) {
                        alredySiteIds.push(vueObj.productInfo.uploadSiteInfoList[i].siteId);
                    }
                }
            }

            // 设置类目中有哪个站点被选中
            var siteId = $accountObj.attr('site-id');
            for (var i = 0; i < vueObj.enCategoryList.length; i++) {
                // 当前平台是ebay平台
                if (vueObj.enCategoryList[i].platformId == 1) {
                    var siteCategoryList = vueObj.enCategoryList[i].siteCategoryList;
                    for (var j = 0; j < siteCategoryList.length; j++) {
                        if (siteCategoryList[j].siteId == siteId && checked) {
                            siteCategoryList[j].checked = true;
                            break;
                        }
                        for (var n = 0; n < siteIds.length; n++) {
                            if (siteIds[n] == siteCategoryList[j].siteId) {
                                siteCategoryList[j].checked = false;
                                siteCategoryList[j].isLayuiThis = false;
                                break;
                            }
                        }
                    }
                    var count = 0;
                    for (var j = 0; j < siteCategoryList.length; j++) {
                        if (siteCategoryList[j].checked && count == 0) {
                            count++;
                            siteCategoryList[j].isLayuiThis = true;
                            continue;
                        }
                        if (siteCategoryList[j].isLayuiThis && count == 1) {
                            siteCategoryList[j].isLayuiThis = false;
                        }
                    }
                    break;
                }
            }


/*            // 保证顺序
            var siteInfoMap = {};
            var newSiteInfoList = [];
            // 删掉账号数量为0的站点
            for (var i = 0; i < vueObj.productInfo.uploadSiteInfoList.length; i++) {
                var siteId = vueObj.productInfo.uploadSiteInfoList[i].siteId;
                siteInfoMap[siteId] = vueObj.productInfo.uploadSiteInfoList[i];
            }
            for (var i = 0; i < vueObj.enCategoryList.length; i++) {
                // 当前平台是ebay平台
                if (vueObj.enCategoryList[i].platformId == 1) {
                    var siteCategoryList = vueObj.enCategoryList[i].siteCategoryList;
                    for (var j = 0; j < siteCategoryList.length; j++) {
                        var siteId = siteCategoryList[j].siteId;
                        if (siteInfoMap[siteId]) {
                            newSiteInfoList.push(siteInfoMap[siteId]);
                        }
                    }
                    break;
                }
            }

            vueObj.productInfo.uploadSiteInfoList = [];
            vueObj.productInfo.uploadSiteInfoList = newSiteInfoList;
*/

            // 计算售价
            for (var i = 0; i < vueObj.productInfo.uploadSiteInfoList.length; i++) {
                var uploadSiteInfo = vueObj.productInfo.uploadSiteInfoList[i];
                if (uploadSiteInfo.siteId == cuurentSite.id) {
                    var accountList = uploadSiteInfo.accountList;
                    for (var j = 0; j < accountList.length; j++) {
                        if (accountList[j].accountId == value) {
                            var uploadSkuList = accountList[j].uploadSkuList;
                            var skuInfoList = [];
                            for (var m = 0; m < uploadSkuList.length; m++) {
                                var skuInfo = {};
                                skuInfo.skuId = uploadSkuList[m].skuId;
                                skuInfo.siteId = cuurentSite.id;
                                skuInfo.accountId = accountList[j].accountId;
                                skuInfoList.push(skuInfo);
                            }
                            // 获取默认的值
                            $.ajax({
                                url: '/product/editor/getEbaySkuPriceByProfitRate.do',
                                data: {skuInfoList: JSON.stringify(skuInfoList)},
                                dataType: 'json',
                                type: 'POST',
                                success: function (result) {
                                    if (result.code == 200) {
                                        var resultData = result.data;
                                        if (resultData!= null && resultData.length > 0) {
                                            var newSkuInfoList = [];
                                           for (var z = 0; z < resultData.length; z++) {
                                               //accountList[j].uploadSkuList.push(resultData[z]);
                                               for (var n = 0; n < uploadSkuList.length; n++) {
                                                   if (uploadSkuList[n].skuId == resultData[z].skuId) {
                                                       var newSkuInfo = Object.assign(uploadSkuList[n]);
                                                       newSkuInfo.logisticsChannelName = resultData[z].logisticsChannelName;
                                                       newSkuInfo.logisticsChannel = resultData[z].logisticsChannel;
                                                       newSkuInfo.lowestPrice = resultData[z].lowestPrice;
                                                       newSkuInfo.profitRate = resultData[z].profitRate;
                                                       newSkuInfo.salePrice = resultData[z].salePrice;
                                                       newSkuInfo.salePrice = resultData[z].salePrice;
                                                       newSkuInfoList.push(newSkuInfo)
                                                   }
                                               }
                                           }
                                        }
                                        var newAccount = Object.assign(uploadSiteInfo.accountList[j]);
                                        newAccount.uploadSkuList = newSkuInfoList;
                                        uploadSiteInfo.accountList.splice(j, 1);
                                        uploadSiteInfo.accountList.splice(j, 0, newAccount);
                                    } else {
                                        errorMessage(skuName + '根据利润率计算售价出错');
                                    }

                                    vueObj.$nextTick(function () {
                                        tabInitSiteDescEditor();
                                    });
                                }
                            });
                            break;
                        }
                    }
                    break;
                }
            }

            vueObj.$nextTick(function () {
                tabInitSiteDescEditor();
            });
        });

        /**************************************************单属性多属性选择Starting***********************************************************/
        form.on('radio(singlePropertyFilter)', function(data){
            // 记录旧的广告属性
            productObj.oldProductProperty = vueObj.productInfo.isMultipleForProduct;
            var multiPropertyInputs = $(".multiPropertyInput");
            // 选择单属性，多属性不能选中
            for (var i = 0; i < multiPropertyInputs.length; i++) {
                var multiPropertyInput = $(multiPropertyInputs[i]);
                multiPropertyInput.prop('checked', false);
                form.render('checkbox');
                // 将广告的属性信息改为false，即单属性
                vueObj.productInfo.isMultipleForProduct = false;
            }

            var $singleInput = $(data.elem);
            // sku id
            var skuId = $singleInput.attr('sku-id');
            // sku名称
            var skuName = $singleInput.attr('title');
            var uploadSiteInfoList = vueObj.productInfo.uploadSiteInfoList;
            var skuInfoList = [];
            for (var i = 0; i < uploadSiteInfoList.length; i++) {
                var uploadSiteInfo = uploadSiteInfoList[i];
                for (var j = 0; j < uploadSiteInfo.accountList.length; j++) {
                    var account = uploadSiteInfo.accountList[j];
                    account['uploadSkuList'] = [];
                    var sku = {};
                    sku['skuId'] = skuId;
                    sku['skuName'] = skuName;
                    account['uploadSkuList'].push(sku);

                    // 计算利润率和售价的信息
                    var skuInfoForRate = {};
                    skuInfoForRate.skuId = skuId;
                    skuInfoForRate.accountId = account.accountId;
                    skuInfoForRate.siteId = uploadSiteInfo.siteId;
                    skuInfoList.push(skuInfoForRate);

                    uploadSiteInfo.accountList.splice(j, 1);
                    uploadSiteInfo.accountList.splice(j, 0, account);
                }
            }

            // 计算利润率
            computeProfitAndSalePrice(skuInfoList);
        });
        form.on('checkbox(mulPropertyFilter)', function(data){
            // 记录旧的广告属性
            productObj.oldProductProperty = vueObj.productInfo.isMultipleForProduct;
            // 拍卖价
            vueObj.productInfo.picType = 0;
            // 设置一口价选中
            $("input[name=priceType]:eq(0)").prop("checked",true);
            form.render('radio');
            $("#startingPriceDiv").hide();

            var singlePropertyInputs = $(".singlePropertyInput");
            // 选择单属性，多属性不能选中
            for (var i = 0; i < singlePropertyInputs.length; i++) {
                var singlePropertyInput = $(singlePropertyInputs[i]);
                singlePropertyInput.prop('checked', false);
                form.render('radio');
                // 将广告的属性信息改为true，即多属性
                vueObj.productInfo.isMultipleForProduct = true;
            }

            var $mulInput = $(data.elem);
            var title = $($mulInput).attr('title');
            var skuId = $($mulInput).attr('sku-id');


            var checked = data.elem.checked;
            var uploadSiteInfoList = vueObj.productInfo.uploadSiteInfoList;
            var skuInfoList = [];
            if (checked) {
                for (var i = 0; i < uploadSiteInfoList.length; i++) {
                    var uploadSiteInfo = uploadSiteInfoList[i];
                    for (var j = 0; j < uploadSiteInfo.accountList.length; j++) {
                        // 生成sku信息
                        var skuInfo = {skuId : skuId, skuName: title};
                        // 属性
                        for (var m = 0; m < vueObj.spu.skuList.length; m++) {
                            if (skuId == vueObj.spu.skuList[m].skuId) {
                                skuInfo['propertyList'] = vueObj.spu.skuList[m].propertyList;
                                break;
                            }
                        }

                        var account = uploadSiteInfo.accountList[j];
                        var uploadSkuList = account.uploadSkuList;
                        if (uploadSkuList == undefined) {
                            uploadSkuList = [];
                            uploadSkuList.push(skuInfo);
                            uploadSiteInfo.accountList[j].uploadSkuList = uploadSkuList;
                        } else {
                           // var isFindSku = false;
                            if (productObj.oldProductProperty != undefined && !productObj.oldProductProperty) {
                                uploadSkuList = [];
                            }
                            uploadSkuList.push(skuInfo);
                            uploadSiteInfo.accountList[j].uploadSkuList = uploadSkuList;
                        }
                        var skuInfoForRate = {};
                        skuInfoForRate.skuId = skuId;
                        skuInfoForRate.siteId = uploadSiteInfo.siteId;
                        skuInfoForRate.accountId = account.accountId;
                        skuInfoList.push(skuInfoForRate);

                        uploadSiteInfo.accountList.splice(j, 1);
                        uploadSiteInfo.accountList.splice(j, 0, account);
                    }
                }

                computeProfitAndSalePrice(skuInfoList)
            } else {
                for (var i = 0; i < uploadSiteInfoList.length; i++) {
                    var uploadSiteInfo = uploadSiteInfoList[i];
                    for (var j = 0; j < uploadSiteInfo.accountList.length; j++) {
                        var account = uploadSiteInfo.accountList[j];
                        var uploadSkuList = account.uploadSkuList;
                        for (var m = 0; m < uploadSkuList.length; m++) {
                            if (uploadSkuList[m].skuId == skuId) {
                                uploadSkuList.splice(m, 1);
                                uploadSiteInfo.accountList[j].uploadSkuList = uploadSkuList;
                                break;
                            }
                        }
                        uploadSiteInfo.accountList.splice(j, 1);
                        uploadSiteInfo.accountList.splice(j, 0, account);
                    }
                }
            }

            getContinuteTime();
        });
        /**************************************************单属性多属性选择Ending***********************************************************/


        /**************************************************一口价和拍卖价选择Staring***********************************************************/
        form.on('radio(priceTypeFilter)', function(data){
            var priceTypeObj = $(data.elem);
            var value = priceTypeObj.val();
            var ebay_itemListingType = '';
            vueObj.productInfo.picType = parseInt(value);
            // 0代表一口价
            if (value == '0') { // 一口价
                $("#startingPriceDiv").css('display', 'none');
                ebay_itemListingType = 'FixedPriceItem';

                layer.confirm('确定选择吗?选择后将会丢失刚刚编辑的信息', {icon: 3, title:'提示'}, function(index){
                    layer.close(index);
                    vueObj.productInfo.picType = parseInt(value);
                    getProductLineAccountInfo();
                    getUploadInfoBypriceTypeAndSpuForEbay(value);

                    if (ebay_itemListingType != null) {
                        $.ajax({
                            url:'/ebayitem/getDurations.do',
                            data:{'listingType': ebay_itemListingType },
                            success:function(result){
                                var ebay_itemDuration = $("#ebay_itemDuration");
                                ebay_itemDuration.empty();
                                form.render('select');
                                var resultJSON = $.parseJSON( result);
                                if (resultJSON != null && resultJSON.data != null) {
                                    for (var i = 0; i < resultJSON.data.length; i++) {
                                        if (resultJSON.data[i] == 'GTC') {
                                            vueObj.productInfo.continuTime = 'GTC';
                                            ebay_itemDuration.append('<option selected value="'+ resultJSON.data[i] +'">' + resultJSON.data[i] + '</option>');
                                        } else {
                                            ebay_itemDuration.append('<option value="'+ resultJSON.data[i] +'">' + resultJSON.data[i] + '</option>');
                                        }
                                    }
                                }
                                form.render('select');
                            },
                            error:function(response){
                                layer.msg(response, {icon: 5});
                            }
                        });
                    }
                }, function () {
                    vueObj.productInfo.picType = 1;
                    $("#startingPriceDiv").css('display', 'inline');
                    $("input[name='priceType'][value='"+1+"']").prop("checked", true);
                    form.render('radio');
                    return;
                });
            } else if (value == '1') { // 拍卖价
                $("#startingPriceDiv").css('display', 'inline');
                ebay_itemListingType = 'Chinese';

                layer.confirm('确定选择吗?选择后将会丢失刚刚编辑的信息', {icon: 3, title:'提示'}, function(index){
                    layer.close(index);
                    vueObj.productInfo.picType = parseInt(value);
                    getProductLineAccountInfo();
                    // 获取spu为当前值，并且价格类型为拍卖价的刊登信息
                    getUploadInfoBypriceTypeAndSpuForEbay(value);

                    if (ebay_itemListingType != null) {
                        $.ajax({
                            url:'/ebayitem/getDurations.do',
                            data:{'listingType': ebay_itemListingType },
                            success:function(result){
                                var ebay_itemDuration = $("#ebay_itemDuration");
                                ebay_itemDuration.empty();
                                form.render('select');
                                var resultJSON = $.parseJSON( result);
                                if (resultJSON != null && resultJSON.data != null) {
                                    for (var i = 0; i < resultJSON.data.length; i++) {
                                        if (resultJSON.data[i] == 'GTC') {
                                            vueObj.productInfo.continuTime = 'GTC';
                                            ebay_itemDuration.append('<option selected value="'+ resultJSON.data[i] +'">' + resultJSON.data[i] + '</option>');
                                        } else {
                                            ebay_itemDuration.append('<option value="'+ resultJSON.data[i] +'">' + resultJSON.data[i] + '</option>');
                                        }
                                    }
                                }
                                form.render('select');
                            },
                            error:function(response){
                                layer.msg(response, {icon: 5});
                            }
                        });
                    }
                }, function () {
                    vueObj.productInfo.picType = 0;
                    $("#startingPriceDiv").css('display', 'none');
                    $("input[name='priceType'][value='"+0+"']").prop("checked", true);
                    form.render('radio');
                    return;
                });
            }

        });
        /**************************************************一口价和拍卖价选择Ending***********************************************************/

        form.on('submit(ebaySaveBtn)', function(data){
            // 校验相应的站点是否选择类目信息
            var uploadSiteInfoList = vueObj.productInfo.uploadSiteInfoList;
            // 选择的站点
            var siteIds = [];
            for (var i = 0; i < uploadSiteInfoList.length; i++) {
                if (uploadSiteInfoList[i].accountList.length > 0) {
                    siteIds.push(uploadSiteInfoList[i].siteId);
                }
            }
            var message = "";
            for (var i = 0; i < vueObj.enCategoryList.length; i++) {
                // ebay平台
                if (vueObj.enCategoryList[i].platformId == 1) {
                    for (var m = 0; m < siteIds.length; m++) {
                        for (var j = 0; j < vueObj.enCategoryList[i].siteCategoryList.length; j++) {
                            var siteCategory = vueObj.enCategoryList[i].siteCategoryList[j];
                            if (siteCategory.siteId == siteIds[m]) {
                                if (siteCategory.categoryName == '') {
                                    message += siteCategory.siteName + "站点没有选择类目信息;"
                                }
                                break;
                            }
                        }
                    }
                }
            }
            if (message != "") {
                layer.alert(message, {icon: 5});
                return;
            }

            if (productObj.resultCode != 200 && !productObj.vueObj.spu.isEdit) {
                layer.alert('请先保存编辑信息', {icon: 5});
                return;
            }

            // 持续时间
            vueObj.productInfo.continuTime = $("#ebay_itemDuration").val();

            // 获取属性 TODO
            var enCategoryList = vueObj.enCategoryList;
            var categoryAttributeValueList = [];
            for (var i = 0; i < enCategoryList.length; i++) {
                enCategoryList[i].spu = productObj.spuCode;
                if (enCategoryList[i].platformId == productObj.ebayPlatformId) {
                    var siteCategoryList = enCategoryList[i].siteCategoryList;
                    for (var j = 0; j < siteCategoryList.length; j++) {
                        if (siteCategoryList[j].checked) {
                            var categoryAttributeValue = {};
                            categoryAttributeValue['siteId'] = siteCategoryList[j].siteId;
                            categoryAttributeValue['propertyValueList'] = [];
                            // 属性
                            var categoryAttributeList = siteCategoryList[j].categoryAttributeList;
                            if (categoryAttributeList != undefined) {
                                for (var m = 0; m < categoryAttributeList.length; m++) {
                                    var categoryAttribute = categoryAttributeList[m];
                                    if (categoryAttribute.inputType == 'multiSelect') {
                                        // var attributeValue = formSelects.value(categoryAttribute.name + siteCategoryList[j].siteId, 'valStr');
                                        var attributeValue = formSelects.value(categoryAttribute.attrId, 'valStr');
                                        var propertyName = categoryAttribute.name;
                                        var propertyObj = {};
                                        propertyObj[propertyName] = attributeValue;
                                        if (categoryAttribute.isMandatory && attributeValue == '') {
                                            layer.alert(siteCategoryList[j].siteName + '站点:' + propertyName + "属性必选");
                                            return;
                                        }
                                        if (attributeValue != '') {
                                            categoryAttributeValue['propertyValueList'].push(propertyObj);
                                        }
                                    } else if (categoryAttribute.inputType == 'text') {
                                        var propertyName = categoryAttribute.name;
                                        var propertyObj = {};
                                        propertyObj[propertyName] = categoryAttribute.inputValue;
                                        if (categoryAttribute.isMandatory && categoryAttribute.inputValue == '') {
                                            layer.alert(siteCategoryList[j].siteName + '站点:' + propertyName + "属性必填");
                                            return;
                                        }
                                        if (categoryAttribute.inputValue != '') {
                                            categoryAttributeValue['propertyValueList'].push(propertyObj);
                                        }
                                    } else if (categoryAttribute.inputType == 'singleSelect') {
                                        var propertyObj = {};
                                        var propertyName = categoryAttribute.name;
                                        var attributeValue = $('.ebayCategoryAttribute' + siteCategoryList[j].siteId).find('#' + categoryAttribute.attrId).val();
                                        if (categoryAttribute.isMandatory && attributeValue == '') {
                                            layer.alert(siteCategoryList[j].siteName + '站点:' + propertyName + "属性必选");
                                            return;
                                        }
                                        propertyObj[propertyName] = attributeValue;
                                        if (attributeValue != '') {
                                            categoryAttributeValue['propertyValueList'].push(propertyObj);
                                        }
                                    }
                                }
                            }

                            categoryAttributeValueList.push(categoryAttributeValue);
                        }
                    }
                    break;
                }
            }

            for (var i = 0; i < categoryAttributeValueList.length; i++) {
                for (var j = 0; j < uploadSiteInfoList.length; j++) {
                    if (categoryAttributeValueList[i].siteId == uploadSiteInfoList[j].siteId) {
                        uploadSiteInfoList[j].propertyList = JSON.stringify(categoryAttributeValueList[i].propertyValueList);
                        break;
                    }
                }
            }
            vueObj.productInfo.spu = vueObj.spu.spuCode;

            var loadingFlag;
            $.ajax({
                url: '/product/editor/saveEbayAdsInfo.do',
                type: 'POST',
                data: {productInfo: JSON.stringify(vueObj.productInfo)},
                dataType: 'json',
                beforeSend: function() {
                    loadingFlag = layer.msg('正在保存刊登信息，请稍候……', { icon: 16, shade: 0.01,shadeClose:false,time:60000 });
                },
                success: function (result) {
                    if (loadingFlag != undefined) {
                        productObj.layer.close(loadingFlag);
                    }
                    if (result.code == 200) {
                        layer.msg('保存成功', {icon: 1});
                        productObj.savePublishInfoResult = result.code;
                        var data = result.data;
                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0; j < vueObj.productInfo.uploadSiteInfoList.length; j++) {
                                var uploadSiteInfo = vueObj.productInfo.uploadSiteInfoList[j];
                                if (uploadSiteInfo.siteId == data[i].siteId) {
                                    for (var m = 0; m < uploadSiteInfo.accountList.length; m++) {
                                        var account = uploadSiteInfo.accountList[m];
                                        if (account.accountId == data[i].accountId) {
                                            account.adsTemplateId = data[i].adsTemplateId;
                                            break;
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                    } else {
                        warningMessage(result.message);
                    }
                }
            });

            return false; // 阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });

        /**************************************************属性选择Starting***********************************************************/
        form.on('select(attributeSelectFilter)', function(data){
            var value = data.value;
            var othis = data.othis;
            var attributeName = $(this).text();
            // 第几个属性
            var attribute_index = parseInt($(data.elem).attr('attribute-index'));

         // 校验前一个属性有没有选中
/*            if (attribute_index != 0) {
                var preProperty;
                for (var i = 0; i < vueObj.propertyTypeList.length; i++) {
                    if (vueObj.propertyTypeList[i].index == attribute_index - 1) {
                        preProperty = vueObj.propertyTypeList[i];
                        break;
                    }
                }
                if (preProperty == undefined) {
                    productObj.layer.msg('请先选择第' + (attribute_index) + "个属性", {icon: 5});
                    $(data.elem).val('');
                    form.render('select');
                    return;
                }
            }*/

            var valid = true;
            if (vueObj.propertyTypeList != undefined) {
                var currentPropertyType;
                for (var i = 0; i < vueObj.propertyTypeList.length; i++) {
                    var propertyType = vueObj.propertyTypeList[i];
                    if (attribute_index != propertyType.index) {
                        if (vueObj.propertyTypeList[i].propertyTypeName == attributeName) {
                            productObj.layer.msg('sku不能有相同的属性', {icon: 5});
                            valid = false;
                        }
                    } else {
                        currentPropertyType = propertyType;
                    }
                }

                // 校验失败
                if (!valid) {
                    if (currentPropertyType != undefined) {
                        for (var i = 0; i < vueObj.attributeList.length; i++) {
                            // 查找上一次选择项的id
                            if (vueObj.attributeList[i].propertyName == currentPropertyType.propertyTypeName) {
                                $(data.elem).val(vueObj.attributeList[i].id);
                                form.render('select');
                                break;
                            }
                        }
                    } else {
                        $(data.elem).val('');
                        form.render('select');
                    }

                    return;
                }

                // 如果之前没有插入过该属性,就直接插入
                if (currentPropertyType == undefined) {
                    var propertyForIndex =  vueObj.propertyTypeList[attribute_index];
                    if (propertyForIndex == undefined) {
                        if (value != '') {
                            vueObj.propertyTypeList.splice(attribute_index, 0, {index: attribute_index, propertyTypeName: attributeName});
                        }
                    } else {
                        vueObj.propertyTypeList.splice(attribute_index, 0, {index: attribute_index, propertyTypeName: attributeName});
                    }
                } else {
                    for (var i = 0; i < vueObj.propertyTypeList.length; i++) {
                        if (attribute_index == vueObj.propertyTypeList[i].index) {
                            if (value != '') {
                                vueObj.propertyTypeList.splice(i, 1);
                                vueObj.propertyTypeList.splice(i, 0, {index: attribute_index, propertyTypeName: attributeName});
                            } else {
                                vueObj.propertyTypeList.splice(i, 1);
                            }
                            break;
                        }
                    }
                }
            }

            var attributeValueList = vueObj.spu.skuList;
            for (var i = 0; i < attributeValueList.length; i++) {
                var attributeObj = {propertyTypeId: value, propertyType: attributeName, propertyValue: '', index: attribute_index};
                var propertyList = attributeValueList[i].propertyList;
                if (propertyList == undefined) {
                    if (value != '') {
                        attributeValueList[i].propertyList = [];
                        attributeValueList[i].propertyList.push(attributeObj);
                    }
                } else {
                    var isFind = false;
                    for (var j = 0; j < propertyList.length; j++) {
                        if (propertyList[j].index == attribute_index) {
                            isFind = true;
                            if (value == '') {
                                attributeValueList[i].propertyList.splice(j, 1);
                            } else {
                                propertyList.splice(j, 1);
                                propertyList.splice(j, 0, attributeObj);
                            }
                            break;
                        }
                    }
                    if (!isFind) {
                        if (value != '') {
                            propertyList.splice(j, 1);
                            propertyList.splice(j, 0, attributeObj);
                        }
                    }
                   /* var property = propertyList[attribute_index];
                    if (property == undefined) {
                        attributeValueList[i].propertyList.splice(attribute_index, 1);
                        attributeValueList[i].propertyList.splice(attribute_index, 0, attributeObj);
                    } else {
                        // property的下标和名称中的下标是否一样
                        var isIndexEqual = true;
                        for (var j = 0; j < vueObj.propertyTypeList.length; j++) {
                            if (vueObj.propertyTypeList[j].propertyTypeName == property.propertyType) {
                                if (attribute_index != vueObj.propertyTypeList[j].index) {
                                    isIndexEqual = false;
                                    if (value == '') {
                                        attributeValueList[i].propertyList.splice(attribute_index, 1);
                                    } else {
                                        attributeValueList[i].propertyList.splice(vueObj.propertyTypeList[j].index, 1);
                                        attributeValueList[i].propertyList.splice(vueObj.propertyTypeList[j].index, 0, property);

                                        attributeValueList[i].propertyList.splice(attribute_index, 1);
                                        attributeValueList[i].propertyList.splice(attribute_index, 0, attributeObj);
                                    }
                                }
                                break;
                            }
                        }
                        if (isIndexEqual) {
                            if (value == '') {
                                attributeValueList[i].propertyList.splice(attribute_index, 1);
                            } else {
                                attributeValueList[i].propertyList.splice(attribute_index, 1);
                                attributeValueList[i].propertyList.splice(attribute_index, 0, attributeObj);
                            }
                        }
                    }*/
                }
            }
           /* for (var i = 0; i < attributeValueList.length; i++) {
                var attributeObj = {propertyTypeId: value, propertyType: attributeName, propertyValue: ''};
                if ( attributeValueList[i].propertyList != undefined) {
                    var oldAttVal = attributeValueList[i].propertyList[attribute_index];
                    if (oldAttVal == undefined) {
                        attributeValueList[i].propertyList.splice(attribute_index, 0, attributeObj);
                    } else if (oldAttVal.propertyTypeId != value) {
                        // 查找oldAttVal的索引
                        var oldAttValIndex = 0;
                        for (var j = 0; j < vueObj.propertyTypeList.length; j++) {
                            if (vueObj.propertyTypeList[i] == oldAttVal.propertyType) {
                                oldAttValIndex = j;
                                break
                            }
                        }
                        if (value == '') {
                            attributeValueList[i].propertyList.splice(attribute_index, 1);
                        } else {
                            attributeValueList[i].propertyList.splice(attribute_index, 1);
                            attributeValueList[i].propertyList.splice(attribute_index, 0, attributeObj);
                        }
                    } else {
                        if (value == '') {
                            attributeValueList[i].propertyList.splice(attribute_index, 1);
                        } else {
                            attributeValueList[i].propertyList.splice(attribute_index, 1);
                            attributeValueList[i].propertyList.splice(attribute_index, 0, attributeObj);
                        }
                    }
                } else {
                    attributeValueList[i].propertyList = [];
                    attributeValueList[i].propertyList.push(attributeObj);
                }
            }*/
        });
        /**************************************************属性选择Starting***********************************************************/


        form.on('checkbox(checkAllAccount)', function (data) {
            form.render('checkbox');
            form.render('select');
            var $checkObj = $(data.elem);
            var checked = $checkObj.prop("checked");
            var accountCheckboxs = $("#siteAccountTable").find('input');
            if (checked) {
                var checkedAccountList = [];
                // 是否是多属性
                var isMultipleForProduct = vueObj.productInfo.isMultipleForProduct;
                var checkedSkuForMulObjs;
                if (isMultipleForProduct) {
                    // 获取选取的sku(多属性)
                    checkedSkuForMulObjs = $("input[name='multiPropertyInput']:checked");
                } else {
                    checkedSkuForMulObjs = $("input[name='singlePropertyInput']:checked");
                }
                // 复选框选中
                var siteIds = [];
                for (var i = 0; i < accountCheckboxs.length; i++) {
                    if (!$(accountCheckboxs[i]).prop("checked")) {
                        $(accountCheckboxs[i]).prop("checked", true);
                        var siteId = parseInt($(accountCheckboxs[i]).attr('site-id'));
                        var accountId = parseInt($(accountCheckboxs[i]).val());
                        var languageId = parseInt($(accountCheckboxs[i]).attr('languageId'));
                        var title = $(accountCheckboxs[i]).attr('title');
                        var siteName = $(accountCheckboxs[i]).attr('site-name');
                        checkedAccountList.push({siteId: siteId, accountId: accountId, title: title, siteName: siteName
                        ,languageId: languageId});
                        if (siteIds.indexOf(siteId) == -1) {
                            siteIds.push(siteId);
                        }
                    }
                    form.render('checkbox');
                }


                var uploadSiteList = vueObj.productInfo.uploadSiteInfoList;
                var skuInfoList = [];
                // 标题和各sku的信息
                for (var i = 0; i < checkedAccountList.length; i++) {
                    var isFindSite = false;
                    var account = {};
                    account.accountId = checkedAccountList[i].accountId;
                    account.shippingCost = 0;
                    account.shippingEai = 0;
                    account.intlShippingCost = 0;
                    account.intlShippingEal = 0;
                    account.title = '';
                    account.accountName = checkedAccountList[i].title;
                    account.uploadSkuList = [];
                    for (var m = 0; m < checkedSkuForMulObjs.length; m++) {
                        var skuName = $(checkedSkuForMulObjs[m]).attr('title');
                        var skuId = $(checkedSkuForMulObjs[m]).attr('sku-id')
                        var sku = {skuName: skuName, skuId: skuId};
                        sku.shippingCost = 0;
                        sku.logisticsChannelName = '';
                        if (productObj.vueObj.productInfo.isMultipleForProduct) {
                            for (var z = 0; z < vueObj.spu.skuList.length; z++) {
                                if (skuId == vueObj.spu.skuList[m].skuId) {
                                    sku['propertyList'] = vueObj.spu.skuList[m].propertyList;
                                    break;
                                }
                            }
                        }
                        account.uploadSkuList.push(sku);

                        // 需要去计算售价
                        var skuInfo = {};
                        skuInfo.skuId = skuId;
                        skuInfo.siteId = checkedAccountList[i].siteId;
                        skuInfo.accountId = checkedAccountList[i].accountId;
                        skuInfoList.push(skuInfo);
                    }
                    for (var j = 0; j < uploadSiteList.length; j++) {
                        if (uploadSiteList[j].siteId == checkedAccountList[i].siteId) {
                            isFindSite = true;
                            uploadSiteList[j].accountList.push(account);
                            break;
                        }
                    }
                    if (!isFindSite) {
                        var site = {};
                        site.siteId = checkedAccountList[i].siteId;
                        site.siteName = checkedAccountList[i].siteName;
                        site.accountList = [];
                        site.languageId = checkedAccountList[i].languageId;
                        site.accountList.push(account);
                        uploadSiteList.push(site);
                    }
                }

                // 分类
                for (var i = 0; i < vueObj.enCategoryList.length; i++) {
                    // ebay平台
                    if (vueObj.enCategoryList[i].platformId == 1) {
                        var siteCategoryList = vueObj.enCategoryList[i].siteCategoryList;
                        for (var j = 0; j < siteCategoryList.length; j++) {
                            if (siteIds.indexOf(parseInt(siteCategoryList[j].siteId)) != -1) {
                                siteCategoryList[j].checked = true;
                                if (j == 0) {
                                    siteCategoryList[j].isLayuiThis = true;
                                } else {
                                    siteCategoryList[j].isLayuiThis = false;
                                }
                            }
                        }
                    }
                }

                vueObj.$nextTick(function () {
                    tabInitSiteDescEditor();
                });

                var uploadSiteInfoList = vueObj.productInfo.uploadSiteInfoList;
                // 设置默认的利润率，根据默认的利润率计算售价
                $.ajax({
                    url: '/product/editor/getEbaySkuPriceByProfitRate.do',
                    data: {skuInfoList: JSON.stringify(skuInfoList)},
                    dataType: 'json',
                    type: 'POST',
                    success: function (result) {
                        if (result.code == 200) {
                            var resultData = result.data;
                            if (resultData!= null && resultData.length > 0) {
                                for (var n = 0; n < resultData.length; n++) {
                                    for (var i = 0; i < uploadSiteInfoList.length; i++) {
                                        if (uploadSiteInfoList[i].siteId == resultData[n].siteId) {
                                            var accountList = uploadSiteInfoList[i].accountList;
                                            for (var j = 0; j < accountList.length; j++) {
                                                if (accountList[j].accountId == resultData[n].accountId) {
                                                    var uploadSkuList = accountList[j].uploadSkuList;
                                                    for (var m = 0; m < uploadSkuList.length; m++) {
                                                        if (uploadSkuList[m].skuId == resultData[n].skuId) {
                                                            uploadSkuList[m].logisticsChannel = resultData[n].logisticsChannel;
                                                            uploadSkuList[m].logisticsChannelName = resultData[n].logisticsChannelName;
                                                            uploadSkuList[m].lowestPrice = resultData[n].lowestPrice;
                                                            uploadSkuList[m].profit = resultData[n].profit;
                                                            uploadSkuList[m].profitRate = resultData[n].profitRate;
                                                            uploadSkuList[m].salePrice = resultData[n].salePrice;
                                                            uploadSkuList[m].shippingCost = resultData[n].shippingCost;
                                                            break;
                                                        }
                                                    }
                                                    var accountNewInfo = accountList[j];
                                                    accountList.splice(j, 1);
                                                    accountList.splice(j, 0, accountNewInfo);
                                                    break;
                                                }
                                            }
                                            break;
                                        }
                                    }
                                }
                            }

                        } else {
                            errorMessage('根据利润率计算售价出错');
                        }
                    }
                });
            } else {
                for (var i = 0; i < accountCheckboxs.length; i++) {
                    if (!$(accountCheckboxs[i]).prop('disabled')) {
                        $(accountCheckboxs[i]).prop("checked", false);
                    }
                }
                var uploadSiteInfoList = vueObj.productInfo.uploadSiteInfoList;
                var publishedSiteInfoList = [];
                for (var i = 0; i < uploadSiteInfoList.length; i++) {
                     var accountList = uploadSiteInfoList[i].accountList;
                     var publishedSiteInfo = Object.assign(uploadSiteInfoList[i]);
                     publishedSiteInfo.accountList = [];
                     for (var j = 0; j < accountList.length; j++) {
                         accountList[j].isChecked = false;
                        /* if (accountList[j].isUpload) {
                             publishedSiteInfo.accountList.push(accountList[j]);
                         }*/
                     }
/*                     if (publishedSiteInfo.accountList.length > 0) {
                         publishedSiteInfoList.push(publishedSiteInfo);
                     }
                     if (publishedSiteInfo.accountList.length == 0) {
                         var enCategoryList = vueObj.enCategoryList;
                         for (var m = 0; m < enCategoryList.length; m++) {
                             // ebay平台
                             if (enCategoryList[m].platformId == 1) {
                                 var siteCategoryList = enCategoryList[m].siteCategoryList;
                                 for (var z = 0; z < siteCategoryList.length; z++) {
                                     if (siteCategoryList[z].siteId == uploadSiteInfoList[i].siteId) {
                                         siteCategoryList[z].checked = false;
                                         siteCategoryList[z].isLayuiThis = false;
                                     }
                                 }
                             }
                         }
                     }*/
                 }
                vueObj.productInfo.uploadSiteInfoList = [];
              /*   for (var i = 0; i < publishedSiteInfoList.length; i++) {
                     vueObj.productInfo.uploadSiteInfoList.push(publishedSiteInfoList[i]);
                 }*/
                form.render('checkbox');
            }
        });

        form.on('submit(submitPublish)', function(data){
            var uploadTime = $("#uploadTime").val();
            $.ajax({
                url: '/product/editor/uploadEbayAds.do',
                data: {spu: productObj.spuCode, scheduleTime: uploadTime},
                dataType: 'json',
                success: function (result) {
                    if (result.code == 200) {
                        layer.msg('刊登成功', {icon: 1});
                        if (productObj.publishProductIndex) {
                            layer.close(productObj.publishProductIndex);
                        }
                    } else {
                        layer.msg(result.message, {icon: 5});
                    }
                }
            });
        });

        form.on('select(descSettingChange)', function (data) {
            var value = parseInt(data.value);
            var descSetting = vueObj.descSettingObj.descSetting;
            var languageId = $(data.elem).attr('languageId');
            var descSettingList = descSetting[languageId];
            var templateText = '';
            if (descSetting) {
                for (var i = 0; i < descSettingList.length; i++) {
                    if (descSettingList[i].id == value) {
                        templateText = descSettingList[i].simpleDescription;
                        break;
                    }
                }
            }

            var spuDescList = vueObj.spuDescList;
            for (var i = 0; i < spuDescList.length; i++) {
                if (spuDescList[i].languageId == languageId) {
                    spuDescList[i].description = templateText;
                    break;
                }
            }
        });
        // 火狐浏览器
        if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
            for (var j = 0; j < productObj.vueObj.propertyTypeList.length; j++) {
                var select = $('#attributeSelect' + j);
                for (var m = 0; m < productObj.vueObj.attributeList.length; m++) {
                    if (productObj.vueObj.attributeList[m].propertyName == productObj.vueObj.propertyTypeList[j].propertyTypeName) {
                        select.val(productObj.vueObj.attributeList[m].id);
                        productObj.form.render('select');
                        break;
                    }
                }
            }
            form.render('');
        }
    });

    $("#hideCategory").click(function () {
        if ($("#categoryDiv").hasClass('rch-show')) {
            $("#categoryDiv").removeClass('rch-show');
            $("#categoryDiv").addClass('rch-hide');
            $(this).text('显示目录')
        } else {
            $("#categoryDiv").removeClass('rch-hide');
            $("#categoryDiv").addClass('rch-show');
            $(this).text('隐藏目录')
        }
    });

    $("#showAccountBtn").click(function () {
        if ($("#selectAccountDiv").hasClass('rch-show')) {
            $("#selectAccountDiv").removeClass('rch-show');
            $("#selectAccountDiv").addClass('rch-hide');
            $(this).text('展示账号列表')
        } else {
            $("#selectAccountDiv").removeClass('rch-hide');
            $("#selectAccountDiv").addClass('rch-show');
            $(this).text('隐藏账号列表')
        }
    });

    $("#saveProductEditorBtn").click(function () {
        if (vueObj.spu.isMultiple) {
            // 校验sku的属性
            for (var i = 0; i < vueObj.spu.skuList.length; i++) {
                if (vueObj.spu.skuList[i].propertyList == undefined || vueObj.spu.skuList[i].propertyList.length == 0) {
                    productObj.layer.alert('属性必填', {icon: 5});
                    return;
                }
                for (var j = 0; j < vueObj.spu.skuList[i].propertyList.length; j++) {
                    if (vueObj.spu.skuList[i].propertyList[j].propertyValue == '') {
                        productObj.layer.open({
                            title: '提示信息'
                            ,content: vueObj.spu.skuList[i].skuName + '的第' + (j + 1) + "个属性必填"
                        });
                        return;
                    }
                }
            }
        }

        // 校验描述
        var spuDescList = vueObj.spuDescList;
        if (spuDescList == undefined || spuDescList.length == 0) {
            productObj.layer.open({
                title: '提示信息'
                ,content: '描述必填'
            });
        }

        var savedSpuDescList = [];
        for (var i = 0; i < spuDescList.length; i++) {
            spuDescList[i].spu = vueObj.spu.spuCode;
            if (spuDescList[i].description && spuDescList[i].description.length > productObj.maxDescLength) {
                productObj.layer.open({
                    title: '提示信息'
                    ,content: productObj.lanuageCodeType[spuDescList[i].languageId] + '语种描述的字符长度超过' + productObj.maxDescLength
                });
                return;
            }
            if (spuDescList[i].specifications && spuDescList[i].specifications.length > productObj.maxDescLength) {
                productObj.layer.open({
                    title: '提示信息'
                    ,content: productObj.lanuageCodeType[spuDescList[i].languageId] + '语种specifications的字符长度超过' + productObj.maxDescLength
                });
                return;
            }
            if (spuDescList[i].packageIncluded && spuDescList[i].packageIncluded.length > productObj.maxDescLength) {
                productObj.layer.open({
                    title: '提示信息'
                    ,content: productObj.lanuageCodeType[spuDescList[i].languageId] + '语种packageIncluded的字符长度超过' + productObj.maxDescLength
                });
                return;
            }
            if (spuDescList[i].note && spuDescList[i].note.length > productObj.maxDescLength) {
                productObj.layer.open({
                    title: '提示信息'
                    ,content: productObj.lanuageCodeType[spuDescList[i].languageId] + '语种note的字符长度超过' + productObj.maxDescLength
                });
                return;
            }
            if (spuDescList[i].languageId == 1) {
               if (spuDescList[i].description == '') {
                   productObj.layer.open({
                       title: '提示信息'
                       ,content: '英文:描述必填'
                   });
                   return;
               }
                if (spuDescList[i].specifications == '') {
                    productObj.layer.open({
                        title: '提示信息'
                        ,content: '英文:specifications必填'
                    });
                    return;
                }
                if (spuDescList[i].packageIncluded == '') {
                    productObj.layer.open({
                        title: '提示信息'
                        ,content: '英文:Package Included必填'
                    });
                    return;
                }
                savedSpuDescList.push(spuDescList[i]);
            } else {
                if (spuDescList[i].description != '' && spuDescList[i].packageIncluded != '' && spuDescList[i].specifications != '') {
                    savedSpuDescList.push(spuDescList[i]);
                }
            }
        }

        var skuList = vueObj.spu.skuList;
        var spuTitleList = vueObj.spuTitleList;
        var savedSpuTitleList = [];
        // 校验标题
        for (var i = 0; i < spuTitleList.length; i++) {
            spuTitleList[i].spu = vueObj.spu.spuCode;
            var savedSpuTitle = Object.assign(spuTitleList[i]);
            // 英语
            if (spuTitleList[i].languageId == 1) {
                var titleList = spuTitleList[i].spuTitleList;
                // 已经输入的标题的个数(针对语种)
                var alreadyInputTitle = 0;
                for (var j = 0; j < titleList.length; j++) {
                    if (titleList[j].title != '') {
                        alreadyInputTitle++;
                    }
                }
                if (alreadyInputTitle < 3) {
                    productObj.layer.alert('标题至少为3个', {icon: 5});
                    return;
                }
                savedSpuTitleList.push(savedSpuTitle);
            } else {
                /*if (savedSpuTitle.spuTitleList.length > 0) {
                    savedSpuTitleList.push(savedSpuTitle);
                }*/
                for (var j = 0; j < savedSpuTitle.spuTitleList.length; j++) {
                    if (savedSpuTitle.spuTitleList[j].title != '') {
                        savedSpuTitleList.push(savedSpuTitle);
                        break;
                    }
                }
            }
        }

        var savedCategoryList = [];
        for (var i = 0; i < vueObj.enCategoryList.length; i++) {
            if (vueObj.enCategoryList[i].mainCategoryName == '' &&  vueObj.enCategoryList.platformId == 1) {
                warningMessage('主类目必填');
                return;
            }
            vueObj.enCategoryList[i].spu = productObj.spuCode;
            // 对象的深度拷贝
            var savedCategory = Object.assign({}, vueObj.enCategoryList[i]);
            var siteCategoryList = vueObj.enCategoryList[i].siteCategoryList;
            savedCategory.siteCategoryList = [];
            for (var j = 0; j < siteCategoryList.length; j++) {
                var siteCategory = siteCategoryList[j];
                if (siteCategory.categoryName != '') {
                    savedCategory.siteCategoryList.push(siteCategory);
                }
            }
            if (savedCategory.siteCategoryList.length > 0) {
                savedCategoryList.push(savedCategory);
            }
        }

        /****************************************处理关键词*************************************************************/
        // 关键词
        var needSaveKeywordList = [];
        // 过滤（将）
        for (var i = 0; i < vueObj.allLanguageKeywordsList.length; i++) {
            var cuurentLanguageKeyword = vueObj.allLanguageKeywordsList[i];
            cuurentLanguageKeyword.spu = productObj.spuCode;
            if (cuurentLanguageKeyword.keywords != '') {
                needSaveKeywordList.push(vueObj.allLanguageKeywordsList[i]);
            }
        }
/*        if (needSaveKeywordList.length == 0) {
            errorMessage('至少填写一种语言的关键词');
            return;
        }*/
        /****************************************处理卖点Starting******************************************************/
        // 卖点
        var needSaveSellPointList = [];
        // 过滤（将）
        for (var i = 0; i < vueObj.amazonSellPointObjList.length; i++) {
            var cuurentLanguageSellPoint = vueObj.amazonSellPointObjList[i];
            var sellPointList = [];
            for (var j = 0; j < cuurentLanguageSellPoint.sellPointList.length; j++) {
                if (cuurentLanguageSellPoint.sellPointList[j].sellPoint != '') {
                    sellPointList.push(cuurentLanguageSellPoint.sellPointList[j]);
                }
            }
            if (sellPointList.length > 0) {
                var needSaveSellPoint = {languageId: cuurentLanguageSellPoint.languageId,spu: productObj.spuCode};
                needSaveSellPoint.sellPointList = sellPointList;
                needSaveSellPointList.push(needSaveSellPoint);
            }
        }
        // 校验是否填了关键词
/*        if (needSaveKeywordList.length == 0) { // TODO
            errorMessage('英语语种的卖点必填');
            return;
        }*/
        var isInputEnSellPoint = false;
        for (var i = 0; i < needSaveSellPointList.length; i++) {
            if (needSaveSellPointList[i].languageId == 1) {
                isInputEnSellPoint = true;
                break;
            }
        }
/*        if (!isInputEnSellPoint) { // TODO
            errorMessage('英语语种的卖点必填');
            return;
        }*/
        /****************************************处理卖点ending********************************************************/

        $.ajax({
            url: '/product/editor/changeSpuProductLine.do',
            data: {productLineId: productObj.productLineId, spu: productObj.spuCode},
            dataType: 'json',
            success: function (result) {
                if (result.code == 200) {

                } else {
                    productObj.layer.alert(result.message, {icon: 5});
                }
            }
        });

        var loadingFlag;
        $.ajax({
            url: '/product/editor/saveProductEditorInfo.do',
            data: {skuList: JSON.stringify(skuList),
                   spuTitleList: JSON.stringify(savedSpuTitleList), spuDescList: JSON.stringify(savedSpuDescList),
                    enCategoryList: JSON.stringify(savedCategoryList), spuKeywordList: JSON.stringify(needSaveKeywordList), spuBulletPointList: JSON.stringify(needSaveSellPointList)},
            type: 'POST',
            dataType: 'json',
            beforeSend: function() {
                loadingFlag = layer.alert('正在保存，请稍候……', { icon: 16, shade: 0.01,shadeClose:false,time:10000 });
            },
            success: function (result) {
                if (loadingFlag) {
                    layer.close(loadingFlag);
                }
                if (result.code == 200) {
                    productObj.layer.msg('保存成功', {icon: 1});
                    productObj.resultCode = 200;
                } else {
                    if (productObj.layer == undefined) {
                        errorMessage(result.message);
                    } else {
                        errorMessage(result.message);
                    }
                }
            }
        });
    });

    /**************************************************一键翻译Starting***********************************************************/
    $("#oneClickTranslationBtn").click(function () {
        var $languageType = $('input[name=languageType]:checked');
        if ($languageType.length == 0) {
            productObj.layer.msg('请选择需要翻译的语言', {icon: 5});
            return;
        }
        var languageIds = [];
        $languageType.each(function (i, e) {
           var $e = $(e);
            languageIds.push($e.val())
        });

        // 需要翻译的标题
        var waitedSpuTitle = '';
        var spuTitleList = vueObj.spuTitleList;
        for (var i = 0; i < spuTitleList.length; i++) {
            // 英文
            if (spuTitleList[i].languageId == 1) {
                waitedSpuTitle = JSON.stringify(spuTitleList[i]);
                break;
            }
        }

        var waitedSpuDesc = '';
        var spuDescList = vueObj.spuDescList;
        for (var i = 0; i < spuDescList.length; i++) {
            // 英文
            if (spuDescList[i].languageId == 1) {
                waitedSpuDesc = JSON.stringify(spuDescList[i]);
                break;
            }
        }

        var waitedSpuKeywords = '';
        var allLanguageKeywordsList = vueObj.allLanguageKeywordsList;
        for (var i = 0; i < allLanguageKeywordsList.length; i++) {
            // 英文
            if (allLanguageKeywordsList[i].languageId == 1) {
                waitedSpuKeywords = JSON.stringify(allLanguageKeywordsList[i]);
                break;
            }
        }

        var waitedSellPoint = '';
        var sellPointList = vueObj.amazonSellPointObjList;
        for (var i = 0; i < sellPointList.length; i++) {
            // 英文
            if (sellPointList[i].languageId == 1) {
                waitedSellPoint = JSON.stringify(sellPointList[i]);
                break;
            }
        }

        var loadingFlag;
        $.ajax({
            url: '/product/editor/oneClickTranslation.do',
            // type: 'POST',
            data: {languageIds: languageIds, waitedSpuTitle: waitedSpuTitle, waitedSpuDesc: waitedSpuDesc, waitedSpuKeywords: waitedSpuKeywords, waitedSellPoint: waitedSellPoint},
            dataType: 'json',
            beforeSend: function() {
                loadingFlag = layer.msg('正在翻译，请稍候……', { icon: 16, shade: 0.01,shadeClose:false,time:10000 });
            },
            success: function (result) {
                if (loadingFlag != undefined) {
                    productObj.layer.close(loadingFlag);
                }
                if (result.code == 200) {
                    var data = result.data;
                    var tranlatedSpuTitleList = data.spuTitleVOList;
                    var spuTitleList = vueObj.spuTitleList;
                    // 覆盖原来的标题
                    for (var i = 0; i < tranlatedSpuTitleList.length; i++) {
                        var isFind = false;
                        for (var j = 0; j < spuTitleList.length; j++) {
                            if (tranlatedSpuTitleList[i].languageId == spuTitleList[j].languageId) {
                                for (var m = 0; m < tranlatedSpuTitleList[i].spuTitleList.length; m++) {
                                    var title =  tranlatedSpuTitleList[i].spuTitleList[m].title;
                                    if (title.length > productObj.maxTitleLength) {
                                        tranlatedSpuTitleList[i].spuTitleList[m].title = subStr(title, tranlatedSpuTitleList[i].languageId, productObj.maxTitleLength);
                                    }
                                }
                                isFind = true;
                                spuTitleList.splice(j, 1);
                                spuTitleList.splice(j, 0, tranlatedSpuTitleList[i]);
                                break;
                            }
                        }
                        if (!isFind) {
                            spuTitleList.push(tranlatedSpuTitleList[i]);
                        }
                    }

                    // 关键词 :spuKeywordVOList
                    var spuKeywordVOList = data.spuKeywordVOList;
                    if (spuKeywordVOList) {
                        var spuKeywordVOBylanguageId = {};
                        for (var i = 0; i < spuKeywordVOList.length; i++) {
                            var languageId = spuKeywordVOList[i].languageId;
                            spuKeywordVOBylanguageId[languageId] = spuKeywordVOList[i];
                        }
                        var allLanguageKeywordsList = vueObj.allLanguageKeywordsList;
                        for (var i = 0; i < allLanguageKeywordsList.length; i++) {
                            var languageId = allLanguageKeywordsList[i].languageId;
                            if (spuKeywordVOBylanguageId[languageId]) {
                                allLanguageKeywordsList[i].keywords = spuKeywordVOBylanguageId[languageId].keywords;
                            }
                            vueObj.$set(allLanguageKeywordsList, i, allLanguageKeywordsList[i]);
                        }
                    }

                    // 卖点:spuSellPointVOList
                    var spuSellPointVOList = data.spuSellPointVOList;
                    if (spuSellPointVOList) {
                        var spuSellPointVOBylanguageId = {};
                        for (var i = 0; i < spuSellPointVOList.length; i++) {
                            var languageId = spuSellPointVOList[i].languageId;
                            spuSellPointVOBylanguageId[languageId] = spuSellPointVOList[i];
                        }
                        var amazonSellPointObjList = vueObj.amazonSellPointObjList;
                        for (var i = 0; i < amazonSellPointObjList.length; i++) {
                            var languageId = amazonSellPointObjList[i].languageId;
                            if (spuSellPointVOBylanguageId[languageId]) {
                                amazonSellPointObjList[i].sellPointList = spuSellPointVOBylanguageId[languageId].sellPointList;
                            }
                            vueObj.$set(amazonSellPointObjList, i, amazonSellPointObjList[i]);
                        }
                    }

                    // 描述
                    var tranlatedSpuDescriptionVOList = data.spuDescriptionVOList;
                    var spuDescList = vueObj.spuDescList;
                    for (var i = 0; i < tranlatedSpuDescriptionVOList.length; i++) {
                        var isFind = false;
                        for (var j = 0; j < spuDescList.length; j++) {
                            if (tranlatedSpuTitleList[i].languageId == spuDescList[j].languageId) {
                                isFind = true;
                                spuDescList.splice(j, 1);
                                spuDescList.splice(j, 0, tranlatedSpuDescriptionVOList[i]);

                                // 给富文本编辑器赋值
                                var descId = productObj.languageDesc.desc + spuDescList[j].languageId;
                                if (productObj.languageEditor[descId]) {
                                    productObj.languageEditor[descId].html(spuDescList[j].description);
                                }
                                var specificationsId = productObj.languageDesc.specifications + spuDescList[j].languageId;
                                if (productObj.languageEditor[specificationsId])  {
                                    productObj.languageEditor[specificationsId].html(spuDescList[j].specifications);
                                }
                                var packageIncludedId = productObj.languageDesc.packageIncluded + spuDescList[j].languageId;
                                if (productObj.languageEditor[packageIncludedId])  {
                                    productObj.languageEditor[packageIncludedId].html(spuDescList[j].packageIncluded);
                                }
                                var noteId = productObj.languageDesc.note + spuDescList[j].languageId;
                                if (productObj.languageEditor[noteId])  {
                                    productObj.languageEditor[noteId].html(spuDescList[j].note);
                                }

                                break;
                            }
                        }
                        if (!isFind) {
                            spuDescList.push(tranlatedSpuDescriptionVOList[i]);
                        }
                    }

                }
            }
        });
    });
    /**************************************************一键翻译Ending***********************************************************/

    /**************************************************ebay分配标题Starting*****************************************************/
    $("#distributionTitleBtn").click(function () {
        // 1.从后台获取标题
        var titleListFromDB = getTitleListFromDB();
        // 按照语言分裂{语言id: 标题}
        var titleListByLanguageId = {};
        for (var i = 0; i < titleListFromDB.length; i++) {
            var languageId = titleListFromDB[i].languageId;
            titleListByLanguageId[languageId] = titleListFromDB[i];
        }
        // 获取描述
        var descListFromDb = getDescListFromDB();
        var descListByLanguageId = {};
        for (var i = 0; i < descListFromDb.length; i++) {
            var languageId = descListFromDb[i].languageId;
            descListByLanguageId[languageId] = descListFromDb[i];
        }

        // 2.将目前选择的站点的账号按照语言分类
        var uploadSiteInfoList = vueObj.productInfo.uploadSiteInfoList;
        // 按照语种分类
        var accountListByLanguageId = {};
        for (var i = 0; i < uploadSiteInfoList.length; i++) {
            var accountObjByLanguageId = accountListByLanguageId[uploadSiteInfoList[i].languageId];
            if (accountObjByLanguageId == undefined) {
                accountObjByLanguageId = [];
            }
            var accountList = uploadSiteInfoList[i].accountList;
            for (var j = 0; j < accountList.length; j++) {
                var account = {siteId: uploadSiteInfoList[i].siteId, siteName: uploadSiteInfoList[i].siteName};
                account['accountId'] = accountList[j].accountId;
                account['accountName'] = accountList[j].accountName;
                account['title'] = '';
                accountObjByLanguageId.push(account);
            }
            accountListByLanguageId[uploadSiteInfoList[i].languageId] = accountObjByLanguageId;
        }

        // 3.查询目前选中的站点中，哪些是没有翻译的
        var waitedDistributeTitleByLanguage = {};  // 等待分配的标题，按照语种分类
        var waitedDistributeDescByLanguage = {};
        var languageIds = [];
         for (var key in  accountListByLanguageId) {
             if (titleListByLanguageId[key] == undefined) {
                 languageIds.push(key);
             } else {
                 waitedDistributeTitleByLanguage[key] = titleListByLanguageId[key];
             }
             if (descListByLanguageId[key] == undefined) {
                 if (languageIds.indexOf(key) == -1) {
                     languageIds.push(key);
                 }
             } else {
                 waitedDistributeDescByLanguage[key] = descListByLanguageId[key];
             }
         }

        // 4.翻译
        if (languageIds != undefined && languageIds.length > 0) {
            var translatedResult = translateTitleAndDesc(languageIds, titleListFromDB, descListFromDb);
            if (translatedResult != undefined) {
                var spuTitleVOList = translatedResult.data.spuTitleVOList;
                var spuDescriptionVOList = translatedResult.data.spuDescriptionVOList;
                for (var i = 0; i < spuDescriptionVOList.length; i++) {
                    var languageId = spuDescriptionVOList[i].languageId;
                    waitedDistributeDescByLanguage[languageId] = spuDescriptionVOList[i];
                }
                // TODO 描述稍后获取
                for (var i = 0; i < spuTitleVOList.length; i++) {
                    var languageId = spuTitleVOList[i].languageId;
                    waitedDistributeTitleByLanguage[languageId] = spuTitleVOList[i];
                }
            } else {
                errorMessage('翻译失败');
                return;
            }
        }

        // 5.分配
        for (var key in accountListByLanguageId) {
            var waitedDistributeTitle = waitedDistributeTitleByLanguage[key];
            // {"languageId":1,"spu":"AB00008","spuTitleList":[{"title":"hello"},{"title":"hello"},{"title":"hello"}],"createdUser":"admin","createdDateStr":null,"languageName":"英文"}
            if (waitedDistributeTitle != undefined) {
                var waitedDistributeTitleList = waitedDistributeTitle.spuTitleList;
                if (waitedDistributeTitleList == undefined || waitedDistributeTitleList.length == 0) {
                    errorMessage(waitedDistributeTitle.languageName + '没有翻译成功,请重新分配');
                    return;
                } else {
                    // {siteId: "0", siteName: "US", accountId: "13", accountName: "account13", title: ""}
                    var neededDistributedAccountList = accountListByLanguageId[key];
                    if (neededDistributedAccountList != undefined) {
                        // 如果标题的数量大于待分配的账号的属性，逐个循环即可
                        if (neededDistributedAccountList.length <= waitedDistributeTitleList.length) {
                            for (var i = 0; i < neededDistributedAccountList.length; i++) {
                                neededDistributedAccountList[i].title = waitedDistributeTitleList[i].title;
                            }
                        } else {
                            var currentLanTitleIndex = 0;
                            var circle = false;
                            var currentLanTitleCount = waitedDistributeTitleList.length;
                            for (var j = 0; j < neededDistributedAccountList.length; j++) {
                                neededDistributedAccountList[j].title = waitedDistributeTitleList[currentLanTitleIndex].title;
                                neededDistributedAccountList[j].circle = circle;
                                currentLanTitleIndex++;
                                if (currentLanTitleIndex > currentLanTitleCount - 1) {
                                    currentLanTitleIndex = 0;
                                    circle = true;
                                }
                            }
                        }
                    }
                }
            } else {
                errorMessage('某种语言翻译没有成功');
            }
        }

        // 分配完之后需要赋值给vueObj.productInfo.uploadSiteInfoList
        for (var key in accountListByLanguageId) {
            var assignedAccountList = accountListByLanguageId[key];
            for (var i = 0; i < assignedAccountList.length; i++) {
                // {"siteId":0,"siteName":"US","accountId":1,"accountName":"账号1","title":"我是折颜"}
                var currentAccount = assignedAccountList[i];
                for (var j = 0; j < vueObj.productInfo.uploadSiteInfoList.length; j++) {
                    if (currentAccount.siteId == vueObj.productInfo.uploadSiteInfoList[j].siteId) {
                        var accountList = vueObj.productInfo.uploadSiteInfoList[j].accountList;
                        for (var n = 0; n < accountList.length; n++) {
                            if (accountList[n].accountId == currentAccount.accountId) {
                                var account = accountList[n];
                                account.title = currentAccount.title;
                                account.circle = currentAccount.circle;
                                vueObj.productInfo.uploadSiteInfoList[j].accountList.splice(n, 1);
                                vueObj.productInfo.uploadSiteInfoList[j].accountList.splice(n, 0, account);
                                break;
                            }
                        }

                        // 描述赋值
                        var languageId = vueObj.productInfo.uploadSiteInfoList[j].languageId;
                        var descByLanguage = waitedDistributeDescByLanguage[languageId];
                        vueObj.productInfo.uploadSiteInfoList[j].packageIncluded = descByLanguage.packageIncluded;
                        vueObj.productInfo.uploadSiteInfoList[j].specifications = descByLanguage.specifications;
                        vueObj.productInfo.uploadSiteInfoList[j].note = descByLanguage.note;
                        vueObj.productInfo.uploadSiteInfoList[j].description = descByLanguage.description;

                        // 给富文本编辑器赋值
                        var descId = productObj.siteDesc.descForSite + vueObj.productInfo.uploadSiteInfoList[j].siteId;
                        if (productObj.siteEditor[descId]) {
                            productObj.siteEditor[descId].html(vueObj.productInfo.uploadSiteInfoList[j].description);
                        }
                        var specificationsId = productObj.siteDesc.specificationsForSite + vueObj.productInfo.uploadSiteInfoList[j].siteId;
                        if (productObj.siteEditor[specificationsId])  {
                            productObj.siteEditor[specificationsId].html( vueObj.productInfo.uploadSiteInfoList[j].specifications);
                        }
                        var packageIncludedId = productObj.siteDesc.packageIncludedForSite + vueObj.productInfo.uploadSiteInfoList[j].siteId;
                        if (productObj.siteEditor[packageIncludedId])  {
                            productObj.siteEditor[packageIncludedId].html(vueObj.productInfo.uploadSiteInfoList[j].packageIncluded);
                        }
                        var noteId = productObj.siteDesc.noteForSite + vueObj.productInfo.uploadSiteInfoList[j].siteId;
                        if (productObj.siteEditor[noteId])  {
                            productObj.siteEditor[noteId].html(vueObj.productInfo.uploadSiteInfoList[j].note);
                        }

                        break;
                    }
                }
            }
        }
    });
    /**************************************************ebay分配标题Ending********************************************************/


    $("#computeRate, #computeRate2").click(function () {
        layer.confirm('确定计算吗?', {icon: 3, title:'提示'}, function(index){
            var uploadSiteInfoList = vueObj.productInfo.uploadSiteInfoList;
            var skuList = [];
            for (var i = 0; i < uploadSiteInfoList.length; i++) {
                for (var j = 0; j < uploadSiteInfoList[i].accountList.length; j++) {
                    var account =  uploadSiteInfoList[i].accountList[j];
                    for (var m = 0; m < account.uploadSkuList.length; m++) {
                        var sku = {};
                        for (var key in account.uploadSkuList[m]) {
                            if (key != 'propertyList') {
                                sku[key] = account.uploadSkuList[m][key];
                            }
                        }
                        if (sku['salePrice'] == undefined ||  sku['salePrice']== '')  {
                            layer.alert(uploadSiteInfoList[i].siteName + '站点,' + account.accountName + '没有填售价', {icon: 5});
                            return;
                        }
                        if (sku['shippingCost'] == undefined) {
                            sku['shippingCost'] = 0;
                        }
                        sku.siteId = uploadSiteInfoList[i].siteId;
                        sku.accountId = account.accountId;
                        skuList.push(sku);
                    }
                }
            }
            var loadingFlag;
            $.ajax({
                url: '/product/editor/getSkuPriceAndRate.do',
                data: {skuInfoList: JSON.stringify(skuList)},
                dataType: 'json',
                beforeSend: function(){
                    loadingFlag = layer.alert('正在计算，请稍候……', { icon: 16, shade: 0.01,shadeClose:false,time:40000 });
                },
                success: function (result) {
                    if (loadingFlag != undefined) {
                        layer.close(loadingFlag);
                    }
                    if (result == null) {
                        errorMessage("计算失败");
                        return;
                    }
                    if (result.code = 200) {
                        var data = result.data;
                        if (data == null) {
                            errorMessage(result.message);
                            return;
                        }
                        for (var n = 0; n < data.length; n++) {
                            for (var i = 0; i < uploadSiteInfoList.length; i++) {
                                if (uploadSiteInfoList[i].siteId == data[n].siteId) {
                                    for (var j = 0; j < uploadSiteInfoList[i].accountList.length; j++) {
                                        var account =  uploadSiteInfoList[i].accountList[j];
                                        if (account.accountId == data[n].accountId) {
                                            for (var m = 0; m < account.uploadSkuList.length; m++) {
                                                if (account.uploadSkuList[m].skuId == data[n].skuId) {
                                                    account.uploadSkuList[m].profitRate = data[n].profitRate;
                                                    account.uploadSkuList[m].lowestPrice = data[n].lowestPrice;
                                                    account.uploadSkuList[m].logisticsChannelName = data[n].logisticsChannelName;
                                                    account.uploadSkuList[m].logisticsChannel = data[n].logisticsChannel;
                                                    var sku = account.uploadSkuList[m];
                                                    account.uploadSkuList.splice(m, 1);
                                                    account.uploadSkuList.splice(m, 0, sku);
                                                    break;
                                                }
                                            }
                                            break;
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                        vueObj.productInfo.uploadSiteInfoList = [];
                        for (var i = 0; i < uploadSiteInfoList.length; i++) {
                            vueObj.productInfo.uploadSiteInfoList.push(uploadSiteInfoList[i]);
                        }
                    } else {
                        errorMessage('计算出错');
                    }
                }
            })
        });
    });

    $("#publishProductBtn, #publishProductBtn2").click(function () {
        productObj.publishProductIndex = productObj.layer.open({
            type: 1,
            skin: 'layui-layer-lan',
            title: '刊登时间选择',
            area: ['400px', '300px'],
            content: $("#uploadTimeScrip").html(),
            success: function (layero, index) {
                //执行一个laydate实例
                productObj.laydate.render({
                    elem: '#uploadTime' //指定元素
                    ,type: 'datetime'
                });
            }
        });
    });

    // 修改产品线
    $("#updateProductLineBtn").click(function () {
        var updateProductLineLayer = productObj.layer.open({
            type: 1,
            skin: 'layui-layer-lan',
            title: '修改产品线',
            area: ['400px', '300px'],
            content: $("#updateProductLineScript").html(),
            success: function (layero, index) {
                var productLineList = productObj.vueObj.productLineObj.productLineList;
                var $productLineSelect = $("#productLineSelect");
                if (productLineList!= undefined) {
                    for (var i = 0; i < productLineList.length; i++) {
                        if (productLineList[i].id == productObj.productLineId) {
                            $productLineSelect.append('<option selected value="'+ productLineList[i].id +'">' + productLineList[i].name + '</option>');
                        } else {
                            $productLineSelect.append('<option value="'+ productLineList[i].id +'">' + productLineList[i].name + '</option>');
                        }
                    }
                }

                // 取消修改
                $("#cancelUpdateProductLineBtn").click(function () {
                    productObj.layer.close(updateProductLineLayer);
                });

                $("#confirmUpdateProductLineBtn").click(function () {
                    productObj.layer.confirm('确定修改吗?', {icon: 3, title:'提示'}, function(index){
                        productObj.layer.close(index);
                        var productLineId = $("#productLineSelect").val();
                        productObj.productLineId = productLineId;
                        productObj.vueObj.productLineObj.currentProductLineId = productLineId;
                        //replaceParamVal('productLineId', productLineId);
                        var productLineName = $("#productLineSelect  option:selected").text();
                        productObj.vueObj.spu.productLineId = productLineId;
                        productObj.vueObj.spu.productLineName = productLineName;
                        // 去掉其他类目的值
                        var enCategoryList = productObj.vueObj.enCategoryList;
                        for (var m = 0; m < enCategoryList.length; m++) {
                            enCategoryList[m].mainCategoryId = 0;
                            enCategoryList[m].mainCategoryName = '';
                            enCategoryList[m].storeCategoryName = '';
                            enCategoryList[m].storeId = 0;
                            for (var i = 0; i < enCategoryList[m].siteCategoryList.length; i++) {
                                enCategoryList[m].siteCategoryList[i].categoryId = 0;
                                enCategoryList[m].siteCategoryList[i].categoryName = '';
                            }
                        }

                        var type = 'FixedPriceItem';
                        if (productObj.vueObj.productInfo.picType == 1) {
                            type = 'Chinese';
                        }
                        // 重新获取账号
                        $.ajax({
                            url: '/features/productLine/getProductLineAccountInfo.do',
                            data: {productLineId: productObj.productLineId, spu: productObj.spuCode, type: type},
                            dataType: 'json',
                            success: function (result) {
                                var ebaySiteAccountList = result[productObj.ebayKey];
                                productObj.vueObj.ebaySiteList = [];
                                if (ebaySiteAccountList != undefined) {
                                    for (var i = 0; i < ebaySiteAccountList.length; i++) {
                                        productObj.vueObj.ebaySiteList.push(ebaySiteAccountList[i]);
                                    }
                                }
                                // 数据加载完成之后，再渲染
                                productObj.vueObj.$nextTick(function () {
                                    productObj.form.render('checkbox');
                                });
                                // TODO 需要缺定是否这样做
                                productObj.vueObj.productInfo.uploadSiteInfoList = [];
                            }
                        });
                        productObj.layer.close(updateProductLineLayer);
                    });
                });
            }
        });
    });

    $("#computeSalePrice1, #computeSalePrice2").click(function () {
        layer.confirm('确定计算吗', {icon: 3, title:'提示'}, function(index){
            layer.close(index);
            var uploadSiteInfoList = productObj.vueObj.productInfo.uploadSiteInfoList;
            if (uploadSiteInfoList == null || uploadSiteInfoList == undefined || uploadSiteInfoList.length == 0) {
                productObj.layer.alert('当前没有站点被选择', {icon: 5});
                return;
            }

            var skuInfoList = [];
            for (var i = 0; i < uploadSiteInfoList.length; i++) {
                var accountList = uploadSiteInfoList[i].accountList;
                if (accountList == null || accountList == undefined || accountList.length == 0) {
                    productObj.layer.alert('当前没有账号被选择', {icon: 5});
                    return;
                }
                for (var j = 0; j < accountList.length; j++) {
                    var account = accountList[j];
                    var uploadSkuList = account.uploadSkuList;
                    if (uploadSkuList == null || uploadSkuList == undefined || uploadSkuList.length == 0) {
                        productObj.layer.alert('当前没有sku被选择', {icon: 5});
                        return;
                    }
                    for (var m = 0; m < uploadSkuList.length; m++) {
                        if (uploadSkuList[m].profitRate == undefined || uploadSkuList[m].profitRate == '') {
                            productObj.layer.alert('请输入' + uploadSkuList[m].skuName + '的利润率');
                            return;
                        }
                        var skuInfo = {};
                        skuInfo.skuId = uploadSkuList[m].skuId;
                        skuInfo.siteId = uploadSiteInfoList[i].siteId;
                        skuInfo.accountId = accountList[j].accountId;
                        skuInfo.profitRate = uploadSkuList[m].profitRate;
                        skuInfoList.push(skuInfo);
                    }
                }
            }

            var loadingFlag;
            // 调用接口计算利润率
            $.ajax({
                url: '/product/editor/getEbaySkuPriceByProfitRate.do',
                data: {skuInfoList: JSON.stringify(skuInfoList)},
                dataType: 'json',
                type: 'POST',
                beforeSend: function(){
                    loadingFlag = layer.alert('正在计算，请稍候……', { icon: 16, shade: 0.01,shadeClose:false,time:100000 });
                },
                success: function (result) {
                    if (loadingFlag != undefined) {
                        productObj.layer.close(loadingFlag);
                    }
                    if (result.code == 200) {
                        var resultData = result.data;
                        if (resultData!= null && resultData.length > 0) {
                            for (var n = 0; n <resultData.length; n++) {
                                for (var i = 0; i < uploadSiteInfoList.length; i++) {
                                    if (uploadSiteInfoList[i].siteId == resultData[n].siteId) {
                                        var accountList = uploadSiteInfoList[i].accountList;
                                        for (var j = 0; j < accountList.length; j++) {
                                            if (accountList[j].accountId == resultData[n].accountId) {
                                                var uploadSkuList = accountList[j].uploadSkuList;
                                                for (var m = 0; m < uploadSkuList.length; m++) {
                                                    if (uploadSkuList[m].skuId == resultData[n].skuId) {
                                                        uploadSkuList[m].logisticsChannel = resultData[n].logisticsChannel;
                                                        uploadSkuList[m].logisticsChannelName = resultData[n].logisticsChannelName;
                                                        uploadSkuList[m].lowestPrice = resultData[n].lowestPrice;
                                                        uploadSkuList[m].profit = resultData[n].profit;
                                                        uploadSkuList[m].salePrice = resultData[n].salePrice;
                                                        uploadSkuList[m].shippingCost = resultData[n].shippingCost;
                                                       /* var uploadSku = uploadSkuList[m];
                                                        uploadSkuList.splice(m, 1);
                                                        uploadSkuList.splice(m, 0, uploadSku);*/
                                                        break;
                                                    }
                                                }
                                                var accountNewInfo = accountList[j];
                                                accountList.splice(j, 1);
                                                accountList.splice(j, 0, accountNewInfo);
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                        }

                    } else {
                        errorMessage('根据利润率计算售价出错');
                    }
                }
            });
        });
    });

    $("#saveProductEditorDraftBtn").click(function () {
        if (vueObj.spu.isMultiple) {
            // 校验sku的属性
            for (var i = 0; i < vueObj.spu.skuList.length; i++) {
                if (vueObj.spu.skuList[i].propertyList == undefined || vueObj.spu.skuList[i].propertyList.length == 0) {
                    productObj.layer.alert('属性必填', {icon: 5});
                    return;
                }
                for (var j = 0; j < vueObj.spu.skuList[i].propertyList.length; j++) {
                    if (vueObj.spu.skuList[i].propertyList[j].propertyValue == '') {
                        productObj.layer.open({
                            title: '提示信息'
                            ,content: vueObj.spu.skuList[i].skuName + '的第' + (j + 1) + "个属性必填"
                        });
                        return;
                    }
                }
            }
        }

        // 校验描述
        var spuDescList = vueObj.spuDescList;
        if (spuDescList == undefined || spuDescList.length == 0) {
            productObj.layer.open({
                title: '提示信息'
                ,content: '描述必填'
            });
        }

        var savedSpuDescList = [];
        for (var i = 0; i < spuDescList.length; i++) {
            spuDescList[i].spu = vueObj.spu.spuCode;
            if (spuDescList[i].languageId == 1) {
                if (spuDescList[i].description == '') {
                    productObj.layer.open({
                        title: '提示信息'
                        ,content: '英文:描述必填'
                    });
                    return;
                }
                if (spuDescList[i].specifications == '') {
                    productObj.layer.open({
                        title: '提示信息'
                        ,content: '英文:specifications必填'
                    });
                    return;
                }
                if (spuDescList[i].packageIncluded == '') {
                    productObj.layer.open({
                        title: '提示信息'
                        ,content: '英文:Package Included必填'
                    });
                    return;
                }
                savedSpuDescList.push(spuDescList[i]);
            } else {
                if (spuDescList[i].note != '' && spuDescList[i].description != '' && spuDescList[i].packageIncluded != '' && spuDescList[i].specifications != '') {
                    savedSpuDescList.push(spuDescList[i]);
                }
            }
        }

        var skuList = vueObj.spu.skuList;
        var spuTitleList = vueObj.spuTitleList;
        var savedSpuTitleList = [];
        // 校验标题
        for (var i = 0; i < spuTitleList.length; i++) {
            spuTitleList[i].spu = vueObj.spu.spuCode;
            var savedSpuTitle = Object.assign(spuTitleList[i]);
            // 英语
            if (spuTitleList[i].languageId == 1) {
                var titleList = spuTitleList[i].spuTitleList;
                // 已经输入的标题的个数(针对语种)
                var alreadyInputTitle = 0;
                for (var j = 0; j < titleList.length; j++) {
                    if (titleList[j].title != '') {
                        alreadyInputTitle++;
                    }
                }
                if (alreadyInputTitle < 3) {
                    productObj.layer.alert('标题至少为3个', {icon: 5});
                    return;
                }
                savedSpuTitleList.push(savedSpuTitle);
            } else {
                /*if (savedSpuTitle.spuTitleList.length > 0) {
                    savedSpuTitleList.push(savedSpuTitle);
                }*/
                for (var j = 0; j < savedSpuTitle.spuTitleList.length; j++) {
                    if (savedSpuTitle.spuTitleList[j].title != '') {
                        savedSpuTitleList.push(savedSpuTitle);
                        break;
                    }
                }
            }
        }

        var savedCategoryList = [];
        for (var i = 0; i < vueObj.enCategoryList.length; i++) {
            if (vueObj.enCategoryList[i].mainCategoryName == '') {
                warningMessage('主类目必填');
                return;
            }
            vueObj.enCategoryList[i].spu = productObj.spuCode;
            // 对象的深度拷贝
            var savedCategory = Object.assign({}, vueObj.enCategoryList[i]);
            var siteCategoryList = vueObj.enCategoryList[i].siteCategoryList;
            savedCategory.siteCategoryList = [];
            for (var j = 0; j < siteCategoryList.length; j++) {
                var siteCategory = siteCategoryList[j];
                if (siteCategory.categoryName != '') {
                    savedCategory.siteCategoryList.push(siteCategory);
                }
            }
            if (savedCategory.siteCategoryList.length > 0) {
                savedCategoryList.push(savedCategory);
            }
        }

        $.ajax({
            url: '/product/editor/changeSpuProductLine.do',
            data: {productLineId: productObj.productLineId, spu: productObj.spuCode},
            dataType: 'json',
            success: function (result) {
                if (result.code == 200) {

                } else {
                    productObj.layer.alert(result.message, {icon: 5});
                }
            }
        });

        $.ajax({
            url: '/product/editor/saveProductEditorInfoAsDraft.do',
            data: {spu: productObj.spuCode, skuList: JSON.stringify(skuList),
                spuTitleList: JSON.stringify(savedSpuTitleList), spuDescList: JSON.stringify(savedSpuDescList),
                enCategoryList: JSON.stringify(savedCategoryList)},
            type: 'POST',
            dataType: 'json',
            success: function (result) {
                if (result.code == 200) {
                    productObj.layer.msg('保存成功', {icon: 1});
                    productObj.resultCode = 200;
                } else {
                    if (productObj.layer == undefined) {
                        errorMessage(result.message);
                    } else {
                        errorMessage(result.message);
                    }
                }
            }
        });
    });
    // 初始化富文本编辑器
    KindEditor.ready(function(K) {
        for (var i = 0; i < vueObj.spuDescList.length; i++) {
            // 描述
           productObj.languageEditor[productObj.languageDesc.desc + vueObj.spuDescList[i].languageId] = K.create('#' + productObj.languageDesc.desc + vueObj.spuDescList[i].languageId, {
                items: ['justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'fontsize', 'forecolor', 'hilitecolor', 'bold', 'italic','clearhtml'],
                id:productObj.languageDesc.desc + vueObj.spuDescList[i].languageId,
                afterChange: function () {
                    for (var j = 0; j < vueObj.spuDescList.length; j++) {
                        if (this.id == productObj.languageDesc.desc + vueObj.spuDescList[j].languageId) {
                            vueObj.spuDescList[j].description = this.html();
                            break;
                        }
                    }
                }
            });

            // 规格
            productObj.languageEditor[productObj.languageDesc.specifications + vueObj.spuDescList[i].languageId] = K.create('#' + productObj.languageDesc.specifications + vueObj.spuDescList[i].languageId, {
                items: ['justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'fontsize', 'forecolor', 'hilitecolor', 'bold', 'italic','clearhtml'],
                id:productObj.languageDesc.specifications + vueObj.spuDescList[i].languageId,
                afterChange: function () {
                    for (var j = 0; j < vueObj.spuDescList.length; j++) {
                        if (this.id == productObj.languageDesc.specifications + vueObj.spuDescList[j].languageId) {
                            vueObj.spuDescList[j].specifications = this.html();
                            break;
                        }
                    }
                }
            });

            // 包装
            productObj.languageEditor[productObj.languageDesc.packageIncluded + vueObj.spuDescList[i].languageId] = K.create('#' + productObj.languageDesc.packageIncluded + vueObj.spuDescList[i].languageId, {
                items: ['justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'fontsize', 'forecolor', 'hilitecolor', 'bold', 'italic','clearhtml'],
                id:productObj.languageDesc.packageIncluded + vueObj.spuDescList[i].languageId,
                afterChange: function () {
                    for (var j = 0; j < vueObj.spuDescList.length; j++) {
                        if (this.id == productObj.languageDesc.packageIncluded + vueObj.spuDescList[j].languageId) {
                            vueObj.spuDescList[j].packageIncluded = this.html();
                            break;
                        }
                    }
                }
            });

            // note
            productObj.languageEditor[productObj.languageDesc.note + vueObj.spuDescList[i].languageId] = K.create('#' + productObj.languageDesc.note + vueObj.spuDescList[i].languageId, {
                items: ['justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'fontsize', 'forecolor', 'hilitecolor', 'bold', 'italic','clearhtml'],
                id:productObj.languageDesc.note + vueObj.spuDescList[i].languageId,
                afterChange: function () {
                    for (var j = 0; j < vueObj.spuDescList.length; j++) {
                        if (this.id == productObj.languageDesc.note + vueObj.spuDescList[j].languageId) {
                            vueObj.spuDescList[j].note = this.html();
                            break;
                        }
                    }
                }
            });
        }
    });
});

window.onload = function () {
/*    var imgList = $("#proImagesDiv").find('img');
    for (var i = 0; i < imgList.length; i++) {
        imgList[i].src = $(imgList[i]).attr('data-original');
    }*/
    for (var j = 0; j < productObj.vueObj.propertyTypeList.length; j++) {
        var select = $('#attributeSelect' + j);
        for (var m = 0; m < productObj.vueObj.attributeList.length; m++) {
            if (productObj.vueObj.attributeList[m].propertyName == productObj.vueObj.propertyTypeList[j].propertyTypeName) {
                select.val(productObj.vueObj.attributeList[m].id);
                productObj.form.render('select');
                break;
            }
        }
    }
    $('.viewImg').viewer({
        url: 'data-original',
    });

    $("#categoryContent").find('input').removeAttr("readonly");

    if (!productObj.vueObj.productInfo.isMultipleForProduct) {
        if (productObj.vueObj.productInfo.uploadSiteInfoList != undefined && productObj.vueObj.productInfo.uploadSiteInfoList.length > 0) {
            var uploadSiteInfo = productObj.vueObj.productInfo.uploadSiteInfoList[0];
            if (uploadSiteInfo.accountList != undefined && uploadSiteInfo.accountList.length >0) {
                var account = uploadSiteInfo.accountList[0];
                if (account.uploadSkuList != undefined && account.uploadSkuList.length > 0) {
                    var skuId = account.uploadSkuList[0].skuId;
                    var singlePropertyInpus = $(".singlePropertyInput");
                    for (var i = 0; i < singlePropertyInpus.length; i++) {
                        if ($(singlePropertyInpus[i]).attr('sku-id') == skuId) {
                            $(singlePropertyInpus[i]).prop('checked', true);
                            productObj.form.render('radio');
                            break;
                        }
                    }
                }
            }
        }
    }

        // 加载详情图片
        var $detailImgs = $(".detailImgs").find('img');
        for (var i = 0; i < $detailImgs.length; i++) {
            $detailImgs[i].src = $($detailImgs[i]).attr('data-original');
        }
        if (productObj.form != undefined) {
            productObj.form.render('select');
            productObj.form.render('checkbox');
        }

    // 火狐浏览器
    if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
        if (productObj.form != undefined) {
            productObj.form.render('');
        }
    }

    $(".imgShow").hover(function (e) {
        var settings = {
            xzoom: 200,//zoomed width default width
            yzoom: 200,//zoomed div default width
            offset: 10,	//zoomed div default offset
            position: "right",//zoomed div default position,offset position is to the right of the image
            lens: 1, //zooming lens over the image,by default is 1;
            preload: 1
        };
        var imageLeft = this.offsetLeft;
        var imageTop =  $(this).get(0).offsetTop;
        var bigimage = $(this).children("img").attr("data-original");
        var imageWidth = $(this).children('img').get(0).offsetWidth;

        if($("div.zoomdiv").get().length == 0){
            $(this).after("<div class='zoomdiv'><img style='width: 100%' class='bigimg' src='"+bigimage+"'/></div>");
            $(this).append("<div class='jqZoomPup'>&nbsp;</div>");
        }
        if (imageLeft + imageWidth + settings.offset + settings.xzoom > screen.width) {
            leftpos = imageLeft - settings.offset - settings.xzoom;
        } else {
            leftpos = imageLeft + imageWidth + settings.offset;
        }
        if (e.pageX + $(this).get(0).offsetWidth + 400 > screen.width) {
            imageTop = imageTop + $(this).children('img').get(0).offsetHeight;
            leftpos = leftpos - imageWidth;
        }
        $("div.zoomdiv").css({ top: imageTop,left: leftpos});
        $("div.zoomdiv").width(400);
        $("div.zoomdiv").height(400);
        $("div.zoomdiv").show();

        $(this).mouseleave(function (e) {
            $("div.zoomdiv").remove();
        });
    });
}

function deleteSku(btnObj) {
    $(btnObj).parent('div').remove()
}

function addSkuBtn() {
    var productInfo = productObj.vueObj.productInfo;
    if (!productInfo.isMultipleForProduct) {
        productObj.layer.msg('多属性才能增加sku', {icon: 5});
    }
    var uploadSiteInfoList = productInfo.uploadSiteInfoList;
    for (var i = 0; i < uploadSiteInfoList.length; i++) {
        var uploadSiteInfo = uploadSiteInfoList[i];
        for (var j = 0; j < uploadSiteInfo.accountList.length; j++) {
            var uploadSkuList = uploadSiteInfo.accountList[j].uploadSkuList;
            var sku = {skuId: 0, skuName: ''};
            sku.propertyList = [];
            if (productObj.vueObj.productInfo.isMultipleForProduct) {
                if (productObj.vueObj.spu.skuList.length > 0) {
                    var propertyListForSku0 = productObj.vueObj.spu.skuList[0].propertyList;
                    // propertyType propertyValue
                    for (var m = 0; m < propertyListForSku0.length; m++) {
                        var property = {};
                        property.propertyTypeId = propertyListForSku0[m].propertyTypeId;
                        property.propertyType = propertyListForSku0[m].propertyType;
                        property.propertyValue = '';
                        property.spu = propertyListForSku0[m].spu;
                        sku.propertyList.push(property);
                    }
                }
            }
            uploadSkuList.push(sku);
        }
    }

    productObj.vueObj.productInfo.uploadSiteInfoList = [];
    for (var i = 0; i < uploadSiteInfoList.length; i++) {
        productObj.vueObj.productInfo.uploadSiteInfoList.push(uploadSiteInfoList[i]);
    }
}

var currentImg;
var totalImgForSku;

function inputSalePrice() {

}

function getTitleListFromDB() {
    var titleListFromDB = [];
    $.ajax({
        url: '/product/editor/getSpuTitle.do',
        data: {spu: productObj.spuCode},
        dataType: 'json',
        async: false,
        success: function (result) {
            titleListFromDB = result;
        }
    });
    return titleListFromDB;
}
function getDescListFromDB() {
    var descListFromDb = [];
    $.ajax({
        url: '/product/editor/getSpuDescBySpu.do',
        data: {spu: productObj.spuCode},
        dataType: 'json',
        async: false,
        success: function (result) {
            descListFromDb = result;
        }
    });
    if (descListFromDb.length == 0) {
        errorMessage('没有可用的描述，请在编辑页面填写描述并且保存');
        return;
    }
    return descListFromDb;
}

function translateTitleAndDesc(languageIds, waitedSpuTitleList, spuDescList) {
    if (waitedSpuTitleList == undefined || waitedSpuTitleList.length == 0) {
        errorMessage('请保存描述，英语语种的标题必须保存')
        return;
    }

    var  waitedSpuTitle = "";
    for (var i = 0; i < waitedSpuTitleList.length; i++) {
        // 取英语的来翻译
        if (waitedSpuTitleList[i].languageId == 1) {
            waitedSpuTitle = waitedSpuTitleList[i];
            break;
        }
    }

    var waitedSpuDesc = '';
    for (var i = 0; i < spuDescList.length; i++) {
        // 英文
        if (spuDescList[i].languageId == 1) {
            waitedSpuDesc = JSON.stringify(spuDescList[i]);
            break;
        }
    }

    var translatedResult = undefined;
    $.ajax({
        url: '/product/editor/oneClickTranslation.do',
        // type: 'POST',
        data: {languageIds: languageIds, waitedSpuTitle: JSON.stringify(waitedSpuTitle), waitedSpuDesc: waitedSpuDesc},
        dataType: 'json',
        async: false,
        success: function (result) {
            if (result.code == 200) {
                translatedResult = result;
            } else {
                result = undefined;
                errorMessage('翻译出错');
            }
        }
    });
    return translatedResult;
}

function inputNewSku(inputObj) {
}

function getUrlParam_2(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]);
    return null;
}

function getUploadInfoBypriceTypeAndSpuForEbay(priceType) {
    $.ajax({
        url: '/product/editor/getEbayAdsInfo.do',
        dataType: 'json',
        data: {spu: productObj.spuCode, picType: priceType},
        success: function (result) {
            productObj.vueObj.productInfo = result;
            for (var siteId in productObj.siteEditor) {
                productObj.siteEditor[siteId].remove();
            }

            if (productObj.vueObj.productInfo.picType == 1) {
                productObj.vueObj.durationTimeList = [];
                productObj.vueObj.durationTimeList.push('Days_3');
                productObj.vueObj.durationTimeList.push('Days_5');
                productObj.vueObj.durationTimeList.push('Days_7');
                productObj.vueObj.durationTimeList.push('Days_10');
                productObj.vueObj.durationTimeList.push('Days_30');
                productObj.vueObj.durationTimeList.push('GTC');
            }
            ebayAdsInfo = productObj.vueObj.productInfo;

            // 显示问题
            var uploadSiteInfoList = productObj.vueObj.productInfo.uploadSiteInfoList;
            var siteIds = [];
            for (var i = 0; i < uploadSiteInfoList.length; i++) {
                var accountList = uploadSiteInfoList[i].accountList;
                if (accountList != null && accountList.length > 0) {
                    siteIds.push(uploadSiteInfoList[i].siteId);
                }
            }
            var enCategoryList = productObj.vueObj.enCategoryList;
            var isHasCheckedSite = false;
            for (var i = 0; i < enCategoryList.length; i++) {
                // ebay平台
                if (enCategoryList[i].platformId == 1) {
                    for (var j = 0; j < enCategoryList[i].siteCategoryList.length; j++) {
                        var siteId = enCategoryList[i].siteCategoryList[j].siteId;
                        if (siteId != undefined && siteIds.indexOf(siteId) != -1) {
                            enCategoryList[i].siteCategoryList[j].checked = true;
                            enCategoryList[i].siteCategoryList[j].isLayuiThis = false;
                            if (!isHasCheckedSite) {
                                isHasCheckedSite = true;
                                enCategoryList[i].siteCategoryList[j].isLayuiThis = true;
                            }
                        } else {
                            enCategoryList[i].siteCategoryList[j].checked = false;
                            enCategoryList[i].siteCategoryList[j].isLayuiThis = false;
                        }
                    }
                }
            }

            productObj.vueObj.$nextTick(function () {
                tabInitSiteDescEditor();
                //reloadSiteDescEditor();
            });
            //reloadSiteDescEditor();
        }
        ,
        error: function () {
            // errorMessage('');
            productObj.vueObj.productInfo.uploadSiteInfoList = [];
            var enCategoryList = productObj.vueObj.enCategoryList;
            for (var i = 0; i < enCategoryList.length; i++) {
                // ebay平台
                if (enCategoryList[i].platformId == 1) {
                    for (var j = 0; j < enCategoryList[i].siteCategoryList.length; j++) {
                        enCategoryList[i].siteCategoryList[j].checked = false;
                        enCategoryList[i].siteCategoryList[j].isLayuiThis = false;
                    }
                }
            }
        }
    });
}

function getProductLineAccountInfo() {
    var type = 'FixedPriceItem';
    if (productObj.vueObj.productInfo.picType == 1) {
        type = 'Chinese';
    }

    $.ajax({
        url: '/features/productLine/getProductLineAccountInfo.do',
        data: {productLineId: productObj.productLineId, spu: productObj.spuCode, type: type},
        dataType: 'json',
        success: function (result) {
            var ebaySiteAccountList = result[productObj.ebayKey];
            if (ebaySiteAccountList != undefined) {
                productObj.vueObj.ebaySiteList = [];
                for (var i = 0; i < ebaySiteAccountList.length; i++) {
                    productObj.vueObj.ebaySiteList.push(ebaySiteAccountList[i]);
                }
                productObj.vueObj.$nextTick(function () {
                    productObj.form.render('checkbox');
                });
            }

        }
    });
}

function selectSuggestCategory(spanObj, index) {
    if (productObj.layer != undefined) {
        productObj.layer.close(index);
    }
    var $spanObj = $(spanObj);
    // 赋值
    for (var i = 0; i < productObj.vueObj.ebaySiteList.length; i++) {
        // ebay平台
        if (productObj.vueObj.enCategoryList[i].platformId == 1) {
            productObj.vueObj.enCategoryList[i].mainCategoryName = $spanObj.text();
            productObj.vueObj.enCategoryList[i].mainCategoryId = $spanObj.attr('category-id');
            break;
        }
    }

    $.ajax({
        url: '/features/productLine/getOtherPlatCategoryByMainCategory.do',
        dataType: 'json',
        data: {categoryId: $spanObj.attr('category-id')}, // TODO 需要替换类目 node.id
        success: function (result) {
            var enCategoryList = productObj.vueObj.enCategoryList;
            var recommendEbayCategoryForSite = result['Ebay'];
            if (recommendEbayCategoryForSite != null && recommendEbayCategoryForSite.length > 0) {
                var recommendEbayCategoryMap = {};
                for (var i = 0; i < recommendEbayCategoryForSite.length; i++) {
                    var siteId = recommendEbayCategoryForSite[i].siteId;
                    recommendEbayCategoryMap[siteId] = recommendEbayCategoryForSite[i];
                }

                // 给相应站点赋值
                for (var i = 0; i < enCategoryList.length; i++) {
                    // ebay平台
                    if (enCategoryList[i].platformId == 1) {
                        for (var j = 0; j < enCategoryList[i].siteCategoryList.length; j++) {
                            var siteId = enCategoryList[i].siteCategoryList[j].siteId;
                            if (recommendEbayCategoryMap[siteId]) {
                                var recommendEbayCategory = recommendEbayCategoryMap[siteId];
                                enCategoryList[i].siteCategoryList[j].categoryName = recommendEbayCategory.categoryName;
                                enCategoryList[i].siteCategoryList[j].categoryId = recommendEbayCategory.categoryId;
                                enCategoryList[i].siteCategoryList[j].categoryAttributeList = recommendEbayCategory.categoryAttributeList;

                                var currentSiteCategory = enCategoryList[i].siteCategoryList[j];
                                enCategoryList[i].siteCategoryList.splice(j, 1);
                                enCategoryList[i].siteCategoryList.splice(j, 0, currentSiteCategory);
                            } else {
                                enCategoryList[i].siteCategoryList[j].categoryName = '';
                                enCategoryList[i].siteCategoryList[j].categoryId = 0;
                                enCategoryList[i].siteCategoryList[j].categoryAttributeList = [];
                            }
                        }
                        productObj.vueObj.$nextTick(function () {
                            productObj.formSelects.render();
                            productObj.form.render('select', 'singleSelect');
                            $("#ebayCategoryAttribute").find('input').removeAttr("readonly");
                        });
                        break;
                    }
                }
            } else {
                for (var i = 0; i < enCategoryList.length; i++) {
                    // ebay平台
                    if (enCategoryList[i].platformId == 1) {
                        for (var j = 0; j < enCategoryList[i].siteCategoryList.length; j++) {
                            enCategoryList[i].siteCategoryList[j].categoryName = '';
                            enCategoryList[i].siteCategoryList[j].categoryId = 0;
                            enCategoryList[i].siteCategoryList[j].categoryAttributeList = [];
                        }
                        break;
                    }
                }
            }
        }
    })
}

function initSiteDescEditor(descId, specificationsId, packageIncludedId, noteId) {
    KindEditor.ready(function(K) {
        if (productObj.siteEditor[descId]) {
            productObj.siteEditor[descId].remove();
        }
        productObj.siteEditor[descId] = K.create('#' + descId, {
            items: ['justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'fontsize', 'forecolor', 'hilitecolor', 'bold', 'italic','clearhtml'],
            id: descId,
            afterChange: function () {
                for (var i = 0; i < productObj.vueObj.productInfo.uploadSiteInfoList.length; i++) {
                    var uploadSiteInfo = productObj.vueObj.productInfo.uploadSiteInfoList[i];
                    if (this.id == productObj.siteDesc.descForSite + uploadSiteInfo.siteId) {
                        uploadSiteInfo.description = this.html();
                        break;
                    }
                }
            }
        });

        if (productObj.siteEditor[specificationsId]) {
            productObj.siteEditor[specificationsId].remove();
        }

        productObj.siteEditor[specificationsId] = K.create('#' + specificationsId, {
            items: ['justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'fontsize', 'forecolor', 'hilitecolor', 'bold', 'italic','clearhtml'],
            id: specificationsId,
            afterChange: function () {
                for (var i = 0; i < productObj.vueObj.productInfo.uploadSiteInfoList.length; i++) {
                    var uploadSiteInfo = productObj.vueObj.productInfo.uploadSiteInfoList[i];
                    if (this.id == productObj.siteDesc.specificationsForSite + uploadSiteInfo.siteId) {
                        uploadSiteInfo.specifications = this.html();
                        break;
                    }
                }
            }
        });

        if (productObj.siteEditor[packageIncludedId]) {
            productObj.siteEditor[packageIncludedId].remove();
        }

        productObj.siteEditor[packageIncludedId] = K.create('#' + packageIncludedId, {
            items: ['justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'fontsize', 'forecolor', 'hilitecolor', 'bold', 'italic','clearhtml'],
            id: packageIncludedId,
            afterChange: function () {
                for (var i = 0; i < productObj.vueObj.productInfo.uploadSiteInfoList.length; i++) {
                    var uploadSiteInfo = productObj.vueObj.productInfo.uploadSiteInfoList[i];
                    if (this.id == productObj.siteDesc.packageIncludedForSite + uploadSiteInfo.siteId) {
                        uploadSiteInfo.packageIncluded = this.html();
                        break;
                    }
                }
            }
        });

        if (productObj.siteEditor[noteId]) {
            productObj.siteEditor[noteId].remove();
        }

        productObj.siteEditor[noteId] = K.create('#' + noteId, {
            items: ['justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'fontsize', 'forecolor', 'hilitecolor', 'bold', 'italic','clearhtml'],
            id: noteId,
            afterChange: function () {
                for (var i = 0; i < productObj.vueObj.productInfo.uploadSiteInfoList.length; i++) {
                    var uploadSiteInfo = productObj.vueObj.productInfo.uploadSiteInfoList[i];
                    if (this.id == productObj.siteDesc.noteForSite + uploadSiteInfo.siteId) {
                        uploadSiteInfo.note = this.html();
                        break;
                    }
                }
            }
        });
    });
}

function tabInitSiteDescEditor() {
    KindEditor.ready(function(K) {
        for (var i = 0; i < productObj.vueObj.productInfo.uploadSiteInfoList.length; i++) {
            var uploadSiteInfo = productObj.vueObj.productInfo.uploadSiteInfoList[i];
            var descId = productObj.siteDesc.descForSite + uploadSiteInfo.siteId;
            var specificationsId = productObj.siteDesc.specificationsForSite + uploadSiteInfo.siteId;
            var packageIncludedId = productObj.siteDesc.packageIncludedForSite + uploadSiteInfo.siteId;
            var noteId = productObj.siteDesc.noteForSite + uploadSiteInfo.siteId;
            initSiteDescEditor(descId, specificationsId, packageIncludedId, noteId) ;
        }
    });
}

function reloadSiteDescEditor() {
    KindEditor.ready(function(K) {
        for (var i = 0; i < productObj.vueObj.productInfo.uploadSiteInfoList.length; i++) {
            var uploadSiteInfo = productObj.vueObj.productInfo.uploadSiteInfoList[i];
            var descId = productObj.siteDesc.descForSite + uploadSiteInfo.siteId;
            var specificationsId = productObj.siteDesc.specificationsForSite + uploadSiteInfo.siteId;
            var packageIncludedId = productObj.siteDesc.packageIncludedForSite + uploadSiteInfo.siteId;
            var noteId = productObj.siteDesc.noteForSite + uploadSiteInfo.siteId;
            if (productObj.siteEditor[descId]) {
                productObj.siteEditor[descId].html(uploadSiteInfo.description);
            }

            if (productObj.siteEditor[specificationsId]) {
                productObj.siteEditor[specificationsId].html(uploadSiteInfo.specifications);
            }

            if (productObj.siteEditor[packageIncludedId]) {
                productObj.siteEditor[packageIncludedId].html(uploadSiteInfo.packageIncluded);
            }

            if (productObj.siteEditor[noteId]) {
                productObj.siteEditor[noteId].html(uploadSiteInfo.note);
            }
        }
    });
}

/**
 * 计算售价
 * @param skuInfoList
 */
function computeProfitAndSalePrice(skuInfoList) {
    var uploadSiteInfoList = productObj.vueObj.productInfo.uploadSiteInfoList;
    $.ajax({
        url: '/product/editor/getEbaySkuPriceByProfitRate.do',
        data: {skuInfoList: JSON.stringify(skuInfoList)},
        dataType: 'json',
        type: 'POST',
        success: function (result) {
            if (result.code == 200) {
                var resultData = result.data;
                if (resultData != null && resultData.length > 0) {
                    for (var z = 0; z < resultData.length; z++) {
                        for (var i = 0; i < uploadSiteInfoList.length; i++) {
                            if (uploadSiteInfoList[i].siteId == resultData[z].siteId) {
                                for (var j = 0; j < uploadSiteInfoList[i].accountList.length; j++) {
                                    if (uploadSiteInfoList[i].accountList[j].accountId == resultData[z].accountId) {
                                        var account = uploadSiteInfoList[i].accountList[j];
                                        var skuList = uploadSiteInfoList[i].accountList[j].uploadSkuList;
                                        for (var m = 0; m < skuList.length; m++) {
                                            if (skuList[m].skuId == resultData[z].skuId) {
                                                skuList[m].logisticsChannelName = resultData[z].logisticsChannelName;
                                                skuList[m].logisticsChannel = resultData[z].logisticsChannel;
                                                skuList[m].lowestPrice = resultData[z].lowestPrice;
                                                skuList[m].profitRate = resultData[z].profitRate;
                                                skuList[m].salePrice = resultData[z].salePrice;
                                                skuList[m].salePrice = resultData[z].salePrice;

                                                break;
                                            }
                                        }
                                        uploadSiteInfoList[i].accountList.splice(j, 1);
                                        uploadSiteInfoList[i].accountList.splice(j, 0, account);
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            } else {
                errorMessage(title + '根据利润率计算售价出错');
            }
        }
    });
}

function getContinuteTime() {
    if ( productObj.vueObj.productInfo.picType == 0) {
        var ebay_itemListingType = 'FixedPriceItem';
        if (ebay_itemListingType != null) {
            $.ajax({
                url:'/ebayitem/getDurations.do',
                data:{'listingType': ebay_itemListingType },
                success:function(result){
                    var ebay_itemDuration = $("#ebay_itemDuration");
                    ebay_itemDuration.empty();
                    productObj.form.render('select');
                    var resultJSON = $.parseJSON( result);
                    if (resultJSON != null && resultJSON.data != null) {
                        for (var i = 0; i < resultJSON.data.length; i++) {
                            if (resultJSON.data[i] == 'GTC') {
                                productObj.vueObj.productInfo.continuTime = 'GTC';
                                ebay_itemDuration.append('<option selected value="'+ resultJSON.data[i] +'">' + resultJSON.data[i] + '</option>');
                            } else {
                                ebay_itemDuration.append('<option value="'+ resultJSON.data[i] +'">' + resultJSON.data[i] + '</option>');
                            }
                        }
                    }
                    productObj.form.render('select');
                },
                error:function(response){
                    productObj.layer.msg(response, {icon: 5});
                }
            });
        }
    }
}

// 截取
function subStr(str, languageId, maxlengh) {
    // 标题大于80个字符，就截取，直至小于等于80个字符,而且不能直接截取，截去完整的单词
    if (str.length > maxlengh) {
        var strList = str.split(" ");
        for (var j = strList.length - 1; j >= 0; j--) {
            if (languageId != productObj.jpLanguageId) {
                str = str.substring(0, str.length - strList[j].length - 1);
                if (str.length <= maxlengh) {
                    break;
                }
            } else {
                str = str.substring(0, maxlengh);
            }
        }
    }

    return str;
}
