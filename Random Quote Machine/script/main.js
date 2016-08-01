var refs = new Wilddog("https://fantasydai002.wilddogio.com/quote");
        //获取后台名言总数
        var quoteNum,currentQuote="";
        refs.on("value",function (snapshot) {
            quoteNum = snapshot.val().length;
        });
        var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
        //随机获取引言函数
        function getQuote () {
            var quoteIndex =Math.floor(Math.random()*16);
            var ref = new Wilddog("https://fantasydai002.wilddogio.com/quote/"+quoteIndex);
            var newQuote;
            ref.on("value",function (snapshot) {
                newQuote = snapshot.val();
            });
            if(newQuote == currentQuote) {
                getQuote ();
            }
            else {
                currentQuote = newQuote;
                $("#weibo-quote").attr("href","http://service.weibo.com/share/share.php?title="+
                    encodeURIComponent(newQuote.content+"——"+newQuote.author));
                $("#search-quote").attr("href","https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=0&rsv_idx=1&tn=baidu&wd="+
                    encodeURIComponent(newQuote.content));

                //改变引言内容
                $(".quote-content").animate({opacity:0},500,function () {
                    $(this).animate ({opacity:1},500);
                    $(this).text(newQuote.content);
                });

                //改变引言作者
                $(".quote-author").animate({opacity:0},500,function () {
                    $(this).animate ({opacity:1},500);
                    $(this).text("——"+newQuote.author);
                });
                //改变背景颜色
                var newColor = getRandomColor();
                $("html body").animate({
                    backgroundColor: newColor,
                    color: newColor
                }, 1000);
                $(".button").animate({
                    backgroundColor: newColor
                }, 1000);
            }
        }
        //随机生成背景颜色函数
        function getRandomColor() {
            return '#' + (function(h) {
                return new Array(7 - h.length).join("0") + h;
                })((Math.random() * 0x1000000 << 0).toString(16));
        }
$(document).ready(function () {

    $("#new-quote").click(getQuote);
    $("#weibo-quote").attr("href","http://service.weibo.com/share/share.php?title="+
            encodeURIComponent($(".quote-content").text()+"——"+$(".quote-author").text()));
    $("#search-quote").attr("href","https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=0&rsv_idx=1&tn=baidu&wd="+
            encodeURIComponent($(".quote-content").text()));
});