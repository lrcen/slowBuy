/*
 * @Author: wuzhizhe/chenGuangHui 
 * @Date: 2017-11-05 13:02:44 
 * @Last Modified by: wuzhizhe/chenGuangHui
 * @Last Modified time: 2017-11-06 13:59:04
 */

//  入口函数
$(function () {
    // 获取主体头部的下拉页签;
    var divs = $('.main-header .drop-down .row>div');
    // 商店的下拉列表
    var $dropDownShop = $('#main .drop-down-shop');
    // 地区的下拉列表
    var $dropDownArea = $('#main .drop-down-area');
    // 定义 商店id 地区id 以及点击事件的this保存备用;
    var shopId = null,
        areaId = null,
        self = null;
    // 绑定下拉页签的点击事件
    divs.on('click', function () {
        // 保存this
        self = $(this);
        // 给当前元素的兄弟元素去除 on 类以及内部的字体图标变成向下的
        self.siblings().removeClass('on').find('i').removeClass('glyphicon-triangle-top');
        // 判断当前元素是否有 on 类 ,本来有的话去除,没有的话就添加
        if (self.hasClass('on')) {
            self.removeClass('on');
        } else {
            self.addClass('on');
        }
        // 再次判断当前元素是否有 on 类 , 有的话改变其内部的字体图标为向上的
        if (self.hasClass('on')) {
            // 改变其内部的字体图标为向上的
            $(self).find('i').addClass('glyphicon-triangle-top');
            
            if (self.index() == 0) {
                // 判断是否当前元素的下标是否为0 ( 0 为商店栏);是则显示商品栏,隐藏地区栏
                $dropDownShop.slideDown();
                $dropDownArea.slideUp();
            } else if (self.index() == 1) {
                // 判断是否当前元素的下标是否为1 ( 1 为地区栏);是则显示地区栏,隐藏商品栏
                $dropDownArea.slideDown();
                $dropDownShop.slideUp();
            } else {
                // 价格栏,数据缺失
                alert('抱歉,暂无数据');
                $dropDownArea.slideUp();
                $dropDownShop.slideUp();
            }
        } else {
            if (self.index() == 0) {
                $(self).find('i').removeClass('glyphicon-triangle-top');
                $dropDownShop.slideUp();
            } else if (self.index() == 1) {
                $(self).find('i').removeClass('glyphicon-triangle-top');
                $dropDownArea.slideUp();
            }
        }

        // $dropDownList.slideToggle();
        // $(this).find('i').toggleClass('glyphicon-triangle-top');

        // $.ajax({
        //     url: 'http://157.122.54.189:9090/api/getgsshop',
        //     success: function (backData) {
        //         // console.log(backData);
        //         $('.drop-down-list').html(template('shopListTemp', backData));

        //         $('.drop-down-list li').on('click', function () {
        //             shopId = $(this).data('shop-id');
        //             $('#shopName span').text($(this).find('.pull-left').text());
        //             $(this).parent().hide();

        //             // 调用 获取凑单品商品信息 函数
        //             getCoudanProduct(shopId, areaId);
        //         });
        //     }
        // });
    });

    // 获取 店铺信息
    getMainHeader({
        url: 'http://157.122.54.189:9090/api/getgsshop',
        fn: function (data) {
            $('.drop-down-shop').html(template('shopListTemp', data));

            $('.drop-down-shop li').on('click', function () {

                $(this).siblings().removeClass('active').end().addClass('active');

                shopId = $(this).data('shop-id');
                $('#shopName span').text($(this).find('.pull-left').text());
                $(this).parent().slideUp();
                self.removeClass('on').find('i').removeClass('glyphicon-triangle-top');

                // 调用 获取凑单品商品信息 函数
                getCoudanProduct(shopId, areaId);
            });
        }
    });

    // 获取 地区信息
    getMainHeader({
        url: 'http://157.122.54.189:9090/api/getgsshoparea',
        fn: function (data) {
            $('.drop-down-area').html(template('areaListTemp', data));

            $('.drop-down-area li').on('click', function () {

                $(this).siblings().removeClass('active').end().addClass('active');

                areaId = $(this).data('area-id');
                $('#areaName span').text($(this).find('.pull-left').text().substr(0, 2));
                $(this).parent().slideUp();
                self.removeClass('on').find('i').removeClass('glyphicon-triangle-top');

                // 调用 获取凑单品商品信息 函数
                getCoudanProduct(shopId, areaId);
            });
        }
    });

    // 调用 获取凑单品商品信息 函数
    getCoudanProduct(shopId, areaId);

});

// 获取 店铺或地区信息
function getMainHeader(obj) {
    $.ajax({
        url: obj.url,
        success: function (backData) {
            obj.fn(backData);
        }
    });
}

// 获取 凑单品商品信息
function getCoudanProduct(shopid, areaid) {
    $.ajax({
        url: 'http://157.122.54.189:9090/api/getgsproduct',
        data: {
            shopid: shopid || 0,
            areaid: areaid || 0
        },
        success: function (backData) {
            // console.log(backData);
            $('#main .main-body .row').html(template('coudanProductTemp', backData));
        }
    });
}