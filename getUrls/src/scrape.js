/* by @joonturbo */

var fsext = require("./jjFSext.js");  
var util = require("./util.js");  
var fs = require('fs');
var scrape = require('website-scraper');

// grab urls from sources.json
var sources = JSON.parse(fs.readFileSync(__dirname +"/../input/sources.json", "utf8"));
var currenturl = 0;
var foundurls = [];

// scrape loop function
// it's a weird kind of for loop, that is called through an anonymous, asynchronous function 
// apart from the first time
var nextscrape = function() {
	// for some reason, this scraper rudely DEMANDS the output folder to NOT EXIST
	// so I cobbled together a recursive delete function
	// use at own risk
	fsext.deleteFolder("temp");

	// detect whether or not we should end
	if(currenturl >= sources.length) 
	{
		// and save out what we have
		exporturls();
		return;
	}

	// main scraping function
	console.log("SCRAPING: " + sources[currenturl]);
	scrape({
		urls: [sources[currenturl]],
		directory: 'temp',
		maxDepth : '0'	// this ensures we only grab index.html
	}, (error, result) => {
		process(result[0].text, result[0].getUrl());
		nextscrape();
	});	
	
	// prepare for the next loop
	currenturl++;
};

// save out all the good stuff
var exporturls = function() {
	console.log("WRITING FILE");
	foundurls = util.sort_unique(foundurls);
	fs.writeFileSync(__dirname + "/../output/foundurls.json",JSON.stringify(foundurls,null, '\t'));
};

// find urls in the raw HTML code dump
var process = function(data, src) {
	var urls = util.findUrls(data);
	console.log("FOUND URLS: " + urls.length);
	urls = util.absoluteUrls(urls, src);
	foundurls = foundurls.concat(urls)
};

// start the loop!
nextscrape();

