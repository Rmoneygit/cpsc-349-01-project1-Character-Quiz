(function(window) {
    var url = new URL(window.location.href);
    var query = url.searchParams.get("result");
    var str = "<span class='result-text'>Your answer is: " + query + "</span>";
    

    $("#result").html(str);
})(window);
