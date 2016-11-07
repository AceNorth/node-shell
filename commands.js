var fs = require('fs');

module.exports.pwd = function(file) {
	process.stdout.write(process.cwd() + newPrompt());
}

module.exports.date = function(file) {
	var date = new Date();
  	var day = date.getDate().toString();
  	if (day.length === 1) {
  		day = "0" + day; 
  	}
  	var dateStr = "";
  	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  	dateStr += days[date.getDay()] + " " + months[date.getMonth()] + " " + day + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();
  	process.stdout.write(dateStr + newPrompt());
}

var newPrompt = function(file) {
	return '\nprompt > ';
}

module.exports.ls = function(file) {
	fs.readdir('.', function(err, files) {
  		if (err) throw err;
  			files.forEach(function(file) {
    			process.stdout.write(file.toString() + "\n");
  				});
  			process.stdout.write(newPrompt());
	});
}

module.exports.echo = function(file) {
	var args = Array.from(arguments);
	process.stdout.write(args.join(" ") + newPrompt());
}

module.exports.cat = function(file) {
	fs.readFile(file, function(err, data) {
		if (err) throw err;
		process.stdout.write(data);
		process.stdout.write(newPrompt());
	})
}

function countLines(data, n) {
	fs.readFile(data, function(err, data) {
			var allData = data;
			var counter = 0;
			for (let i = 0; i < allData.length; i++) {
				if (allData[i] + allData[i+1] === "\n") {
					counter++;
				}
				if (counter === n) {
					process.stdout.write(allData.slice(0, i));
					process.stdout.write(newPrompt());
					break;
				}
				else if (i === allData.length - 1) {
					process.stdout.write(allData);
					process.stdout.write(newPrompt());
				} 	
			}
		})
}

module.exports.head = function(file) {
	if (arguments[1]) {
		countLines(file, arguments[1]);
	}
	else {
		countLines(file, 5);
	}
}