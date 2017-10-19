# jjscrape
Scrape websites for words.

## setup
run `npm install` inside of the folder

## to grab urls
- update `sources.json` inside the input folder of getUrls
- run `node src/scrape.js` inside the project getUrls folder
- a list of urls will appear inside the `output/foundurls.json` file
- **you probably want to clean up the list**, but it's easy since it's sorted and duplicates removed!

## to get body/article text
- update `sources.json` inside the input folder of getText
- run `node src/scrape.js` inside the project getText folder
- it will either work, or give you the lay-out of what the scraper returns. 
- if it didn't work, check scrape.js for more info, or contact me

