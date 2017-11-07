$(function () {

    //点击回到顶部实现
    var backtop = $("#login .row div:eq(2) a");
    clickSimulation(backtop, function() {
        $("html, body").animate({scrollTop: 0}, 500);
    });


    // 移动端模拟点击事件封装
    function clickSimulation(ele, fn) {
        var isMove = false;

        // 在移动端 点击事件会有300ms左右的延迟 使用touch事件来模拟
        ele.on("touchstart", function () {});
        ele.on("touchmove", function () {
            // 只有触发移动事件, 变量就改为真
            isMove = true;
        });
        ele.on("touchend", function () {
            if (!isMove) {
                fn();
            }
            isMove = false;
        });
    }
})