$(document).ready(function() {
    //获取后台数据
    var ref= new Wilddog("https://fantasydai001.wilddogio.com/");

    //发射弹幕按钮点击事件
    $("#send").click(function(event) {
        var dm_text = $("#dm_content").val();
        event.preventDefault();
        $("#dm_content").val("");
        ref.child("message").push(dm_text);
    });

    //清屏按钮点击事件
    $("#clear").click(function(event) {
        $("#danmu_area").empty();
    });

    //回车键响应事件
    $("#dm_content").keypress(function(event){
        if(event.keyCode === 13) {
            $("#send").trigger("click");
        }
    });

    //监听后台数据变化，实时更新弹幕
    ref.child("message").on("child_added",function(snapshot){
        var dm_text = snapshot.val();
        var newDm = $("<div class='danmu'></div>");
        newDm.text(dm_text);
        newDm.css("color",getRandomColor());
        $("#dm_area").append(newDm);
        scrollDanmu (newDm);
    });

    //获取随机颜色函数
    var getRandomColor = function() {
        return '#' + (function(h) {
          return new Array(7 - h.length).join("0") + h;
        })((Math.random() * 0x1000000 << 0).toString(16));
      };

    //实现弹幕滚动函数
    function scrollDanmu (dm_item) {
        if(dm_item){
            var leftValue = parseInt(dm_item.css("left"));
            var dm_width= parseInt(dm_item.css("width"));
            var time = 10000 + 10000 * Math.random();
            if(parseInt(dm_item.css("top")) ===0){
                dm_item.css("top",Math.random()*370+1);
            }
            dm_item.animate({left:-dm_width},time,'linear',function() {
                dm_item.css("left","100%");
                scrollDanmu (dm_item);
            });
        }
    }
});