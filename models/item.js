const items = require("../fakeDb")

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    // keep track of all items
    items.push(this);
  }
 static getAll(){
    return items
 }

 /** Find & return item with matching name. */

 static find(name) {
    const foundItem = items.find(v => v.name === name);
    if(foundItem === undefined){
      throw { message: "Not Found", status: 404 }
    }
    return foundItem
  }

/** Find & return item with matching name. */
static update(name, item) {
const foundItem = Item.find(name)
if(foundItem === undefined){
  throw { message: "Not Found", status: 404 }
}
foundItem.name = item.name
foundItem.price = item.price
return foundItem
}

 /** Remove item with matching id. */
static remove(name){
  const removedItem =  Item.find(name)
  if(removedItem === -1)  throw {message: "Not Found", status: 404}
  items.splice(removedItem,1) 
}

}


module.exports = Item;