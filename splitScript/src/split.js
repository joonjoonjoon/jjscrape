/* by @joonturbo */

var fs = require('fs');

// grab urls from sources.json
var source = fs.readFileSync(__dirname +"/../input/source.txt", "utf8");
var lines = source.split('\n');
var getCharacterRegex = /\w+(?=:)/g;
var dictionary = {};
var character = "empty";

for (var index = 0; index < lines.length; index++) {
	var line = lines[index];
	var split = line.split(":");

	// if we can split on ":", start a new character entry;
	if(split.length > 1)
	{
		character = split[0];

		// clean up some garbled character names
		character = character.replace(/[^a-z0-9]/gi, '_').substr(0,30);	
	}

	// make sure an empty dictionary exists before pushign to it
	if(!dictionary[character])
	dictionary[character] = [];

	dictionary[character].push(line);
}


// export
for(var key in dictionary) {
	var value = dictionary[key];
	console.log(key + ": " + value.length + " entries");

	var output = "";
	for(var index in value) {
		output += value[index] + "\n";
	}

	fs.writeFileSync(__dirname +"/../output/" + key + ".txt", output);
}
