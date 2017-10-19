module.exports = {
    absoluteUrls: absoluteUrls,
    findUrls: findUrls, 
    sort_unique: sort_unique
};

// ----------------
// helper functions
// ----------------

// this is a quick-fix for sites that use relative links 
// it basically prepends the source URL (minus the index.html)
// so you get an absolute url
function absoluteUrls(urls, base)
{
	base = base.substring(0, base.lastIndexOf( "/" ) + 1);
	for (var index = 0; index < urls.length; index++) {
		url = urls[index];
		if(url.substring(0,4) != "http")
		{
			url = base + url;
		}
		urls[index] = url;
	}
	return urls;
}

// find urls through regex matching of 'href'
// cobbled together from a bunch of stackoverflows
// https://stackoverflow.com/questions/4504853/how-do-i-extract-a-url-from-plain-text-using-jquery
function findUrls(text)
{
    var source = (text || '').toString();
    var urlArray = [];
    var url;
    var matchArray;

    // Regular expression to find HREF values
	var regexToken = /href=\"([^\'\"]+)/g;
	
    // Iterate through any URLs in the text.
    while( (matchArray = regexToken.exec( source )) !== null )
    {
        var token = matchArray[1];	// 0 is the whole match, including href, but we just want the juice!
		urlArray.push(token);
    }

    return urlArray;
}

// sort an array, and remove duplicates
// found here ttps://stackoverflow.com/questions/4833651/javascript-array-sort-and-unique
function sort_unique(arr) {
    if (arr.length === 0) return arr;
    arr = arr.sort(function (a, b) { return (a < b) ? -1 : (a > b) ? 1 : 0;});
    var ret = [arr[0]];
    for (var i = 1; i < arr.length; i++) { // start loop at 1 as element 0 can never be a duplicate
        if (arr[i-1] !== arr[i]) {
            ret.push(arr[i]);
        }
    }
    return ret;
}