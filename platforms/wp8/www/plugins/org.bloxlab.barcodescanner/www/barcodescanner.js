cordova.define("org.bloxlab.barcodescanner.BarcodeScanner", function(require, exports, module) { var cordova = require('cordova');

var barcodeScanner = {
    scan : function(onSuccess, onFail) {
        cordova.exec(onSuccess, onFail, "BarcodeScanner", "Scan", []);
    }
}

// Register the plugin
module.exports = barcodeScanner;
});
