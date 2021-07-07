const translate = require("translate");

const hindi = translate("I am ashu." , translate("Hello world", { to: "hi", engine: "google", key: "YOUR-KEY-HERE" }));

console.log(hindi);
