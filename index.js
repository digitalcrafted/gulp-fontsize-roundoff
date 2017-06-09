
var fs = require('fs');
var readline  = require('readline');
var cssinput_file = 'input.css';
var cssoutput_file = 'output.css';
var line_marker = "font-size:";
var cssoutput = fs.createWriteStream(cssoutput_file, 'utf-8');

var rl = readline.createInterface({
    input     : fs.createReadStream(cssinput_file).setEncoding('utf8'),
    output    : process.stdout,
    terminal  : false,
}).on('line', function(line) {
    var idx = line.indexOf(line_marker);
    /*match the numbers before px
     either one or more digits optionally followed by a dot and zero or more digits or a dot followed by one or more digits*/
    if (idx !== -1 && /[\d.\d](?=[px; | px\s])/.test(line)) {
        line = line.replace(/(\.\d+)+/,'');
    }
    cssoutput.write(line+"\n");
}).on('close', function() {
    console.log('done');
    cssoutput.end();
});