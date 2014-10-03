var child_process = require("child_process");

child_process.exec("coffee -o js/ -cw js/coffee", function(a, b, c) {
	console.log(a, b, c);
});

<<<<<<< HEAD
child_process.exec("python -m SimpleHTTPServer 3000", function(a, b, c) {
=======
child_process.exec("python -m http.server 3000", function(a, b, c) {
>>>>>>> 750332b5396d43dc1acd9edb8023695054b5f58c
	console.log(a, b, c);
});