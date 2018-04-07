// portfolio
// dbInterfacer.js

// File description:
// Methods to fetch data back from data store

var fs = require("fs");
var content = fs.readFileSync(__dirname + "/../../fakeDb.json");
var contentJSON = JSON.parse(content);

function find(arrOfFormFields) {
  let matchingItems = [];

  contentJSON.todo.forEach((el, ind) => {
    if (el.id == arrOfFormFields[0]) {
      matchingItems.push(el);
    }
  });

  return matchingItems;
}

module.exports = {
  find
}
