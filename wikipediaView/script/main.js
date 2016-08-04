function getWiki(val) {
    if(val) {
        $.getJSON("http://zh.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+
             encodeURIComponent(val)+"&callback=?",function (data) {
                showWiki(data.query.pages);
                console.log(data.query.pages);
            });
    }
}
    function showWiki (wikiList) {
        var uri = 'http://zh.wikipedia.org/?curid=';
        var wiki_ul = $("<ul></ul>");
        for(var item in wikiList) {
            var wiki_li = $("<li></li>"),
            wiki_a = $("<a></a>"),
            wiki_h1 = $("<h1></h1>"),
            wiki_p = $("<p></p>");
            wiki_li.addClass("animated once bounceInRight row");
            wiki_h1.addClass("wiki-title col-md-12");
            wiki_p.addClass("wiki-content col-md-12");
            wiki_a.attr({"href":uri+wikiList[item].pageid,"target":"_blank"});
            wiki_h1.text(wikiList[item].title);
            wiki_p.text(wikiList[item].extract||"该词条暂无简介，点击了解更多");
            wiki_a.append(wiki_h1);
            wiki_a.append(wiki_p);
            wiki_li.append(wiki_a);
            wiki_ul.append(wiki_li);
        }
        $(".contentArea").append(wiki_ul);
    }
$(document).ready(function() {
    $(".searchButton").click(function() {
        var searchText = $(".searchText").val();
        if(searchText) {
            $(".contentArea").empty();
            getWiki(searchText);
        } else {
            alert("请输入有效内容");
        }
        $(".searchText").val("");
    });
});