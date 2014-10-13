var child_process = require("child_process");

child_process.exec("coffee -o www/js -cw www/js/coffee", function(a, b, c) {
	console.log(a, b, c);
});

child_process.exec("python -m SimpleHTTPServer 3000", function(a, b, c) {
	console.log(a, b, c);
});