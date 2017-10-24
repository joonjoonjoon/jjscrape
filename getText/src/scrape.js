/* by @joonturbo */

var fs = require('fs');
var Scraper = require('node-scraper');
var htmlToText = require('html-to-text');
var sleep = require('thread-sleep');

// grab urls from sources.json
var sources = JSON.parse(fs.readFileSync(__dirname + "/../input/sources.json", "utf8"));
var corpus = "";
var currenturl = 0;

// scrape loop function
// it's a weird kind of for loop, that is called through an anonymous, asynchronous function 
// apart from the first time
var nextScrape = function() {
	// sleep for 1 second, to prevent getting banned :)
	console.log("(sleeping for 1 s, zzzzZzzzzzz)");
	sleep(1000);

	// detect whether or not we should end
	if(currenturl >= sources.length) 
	{
		// and save out what we have
		exportcorpus();
		return;
	}
	
	//var options = {selectors:".text-center"};		// use this if you want to filter on a div
	var options = {};								// use this if you want to NOT filter on a div

	// main scraping function
	var src = sources[currenturl];

	console.log("SCRAPING: " + src);
	var scraper = new Scraper(src, options);
	scraper.scrape().on('done', function(err, statusCode, content){
		process(err, statusCode, content);
	}, this);	

	// prepare for the next loop
	currenturl++;
};

// save out all the good stuff
var exportcorpus = function () {
	console.log("WRITING CORPUS");
	
	// make folder
	var dir = __dirname + "/../output/";
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	
	// save file
	fs.writeFileSync(dir + "corpus.txt",corpus);			
};
	
// process raw HTML dump
var process = function (err, statusCode, content) {
	if (err){
		console.log("ERROR IN SCRAPE");
		//console.error(err);		// uncomment this to see verbose error
	}
	else {
		if(statusCode == "200") 	// 200 is good!
			console.log("SCRAPE SUCCESSFUL (200)")
		else						// other numbers are bad :(
			console.log("SCRAPE RETURNED WITH " + statusCode);

		// let's try to parse it...
		try 
		{
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			// this might need some massaging...
			// basically 'content' comes back in 
			// a variety of formats, depending on which site you're scraping
			var data = content[0].content[0].html;
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

			// get nice text
			var nicetext = htmlToText.fromString(data, {
				ignoreHref:true,
				ignoreImage:true	
			} );
			
			// throw it on there
			corpus += '\n' + nicetext;
		}
		catch(ex)
		{
			// uh oh...
			console.log("ERRORED... in " + sources[currenturl-1]);		
			console.log(explode(content));  // verbose error!
		}
	}

	nextScrape();
};

// get some!
nextScrape();

// function I made to inspect complex objects
var explode = function(obj, prefix)
{
	if(!prefix) prefix = "+";

	for(var propName in obj) {
		propValue = obj[propName];

		if(typeof propValue == "string")
			console.log(prefix + ":" + propName + ": " + '\t\t' + typeof propValue  + '\t\t' + propValue.substring(0,50)+"...");
		else
			console.log(prefix + ":" + propName + ": " + '\t\t' + typeof propValue);

		if(typeof propValue == "object")
		{
			prefix += ":" + propName;
			explode(propValue, prefix);
		}
	}
}
