/* by @joonturbo */

var fs = require('fs');

// read source
var source = fs.readFileSync(__dirname +"/../input/source.txt", "utf8");

// split into array
var lines = source.split('\n');

// create empty objects to push results in
var dictionary = {};
var character = "empty";

// loop over lines
for (var index = 0; index < lines.length; index++) {
	var line = lines[index];

	// if we can split on ":", start a  character entry;
	var split = line.split(":");

	if(split.length > 1)
	{
		character = split[0];

		// clean up some garbled character names
		character = character.replace(/[^a-z0-9]/gi, '_').substr(0,30);	
	}

	// make sure an empty dictionary exists before pushign to it
	if(!dictionary[character])
		dictionary[character] = [];

	// add line to character
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
