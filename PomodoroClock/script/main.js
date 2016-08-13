$(document).ready(function () {
    $('body').bind("selectstart", function () { return false; });
    //点击+/-按钮事件
    $(".button").click(function () {
        var numNode,
            length;
        if ($(this).hasClass("add")){
            numNode =$(this).prev();
            length = parseInt(numNode.text());
            if (length < 30) {
                numNode.text(length + 1);
                if (($(this).hasClass("mission-add")&&$(".mission").length>0)||
                    ($(this).hasClass("break-add")&&$(".break").length>0)){
                    $(".minutes").text(length + 1);
                }
            }
        } else {
            numNode = $(this).next();
            length = parseInt(numNode.text());
            if (length > 1){
                numNode.text(length - 1);
                if (($(this).hasClass("mission-minus")&&$(".mission").length>0)||
                    ($(this).hasClass("break-minus")&&$(".break").length>0)){
                    $(".minutes").text(length - 1);
                }
            }
        }
    });

    //点击番茄
    $(".pomodoro").click(function () {
        $(this).toggleClass("mission").toggleClass("break");
        $(".animate").toggleClass("missionAm").toggleClass("breakAm");
    });
});