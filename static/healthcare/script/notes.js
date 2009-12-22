//source: http://rockmanx.wordpress.com/2008/10/03/get-url-parameters-using-javascript/
function gup(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
      return "";
    else
      return results[1];
}

$(function() {
    var beginIndex = null;
    if(window.location.hash.length > 0) {
        beginIndex = parseInt(window.location.hash.substring(1));
    }
    
    if(beginIndex != null) {
        var toParam = gup('to');
        if(toParam.length > 0) {
            var endIndex = parseInt(toParam);
        } else {
            var endIndex = beginIndex;
        }
        
        for(var i=beginIndex; i<=endIndex; i++) {
            $('a[name=' + i + ']').addClass('highlighted');
        }
    }
});