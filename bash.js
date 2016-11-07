// Output a prompt
var commands = require('./commands');

process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim();
  cmd = cmd.split(" ");
  if (!commands[cmd[0]]) {
    throw cmd + " is not a valid command"
  } else {
    realCmd = cmd.shift();
    commands[realCmd](...cmd);
  } 
});