$(function() {
    
        //回到顶部实现
        var backtop = $("#login .row div:eq(2)");
        clickSimulation(backtop, function() {
            $("html, body").animate({scrollTop: 0}, 500);
        });
    
        // 移动端单击事件模拟
        function clickSimulation(ele, fn) {
            var isMove = false;
    
            ele.on("touchstart", function() {});
    
            ele.on("touchmove", function() {
                isMove = true;
            });
    
            ele.on("touchend", function() {
                if(!isMove) {
                    fn();
                }
    
                isMove = false;
            })
        }
    })