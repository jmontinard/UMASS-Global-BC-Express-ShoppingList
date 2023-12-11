const express = require("express");
const router = express.Router();
const fs = require("fs");

// Define the JSON file path
const dataFilePath = "data.json";

// Read data from the JSON file
const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

// GET / - Return the data
router.get("/", function (req, res) {
  res.json({ items: data });
});

// POST / - Add new item
router.post("/", function (req, res) {
  const newItem = req.body; // Assuming the request body contains the new item
  data.push(newItem);

  // Write updated data back to the JSON file
  fs.writeFileSync(dataFilePath, JSON.stringify(data));
  res.status(201).json({ item: data })
//   res.json({ items: data });
});

// Other routes and CRUD operations can be similarly defined

router.get("items/:name", function (req, res) {
    const searchedItem = data.find(item => item.name === req.query.name)
    if(searchedItem === undefined) throw new ExpressError('item not found', 404)
    res.json({item: searchedItem});
  });
  
  router.patch("items/:name", function (req, res) {
    const searchedItem = data.find(item => item.name === req.query.name)
    if(searchedItem === undefined) throw new ExpressError('item not found', 404)
    searchedItem.name = req.body.name
    searchedItem.price = req.body.price  
    res.json({item: searchedItem});
  });
  
  
  router.delete("items/:name", function (req, res) {
    const searchedItem = data.find(item => item.name === req.query.name)
    if(searchedItem === -1) throw new ExpressError('item not found', 404)
    items.splice(searchedItem,1) 
    res.json({message:`${searchedItem.name} has been deleted`});
  });
  
module.exports = router;