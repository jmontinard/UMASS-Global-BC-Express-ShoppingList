const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError");
const Item = require('../models/item');
const items = require("../fakeDb");

// GET / - this should render a list of shopping items.
// router.get("/", function (req, res,next) {
//   try {
//     console.log(items);
//    return res.json({ items });
//   } catch (e) {
//     return next(e)
//   }
// }); 

//ORM
router.get("/", function (req, res,next) {
  try {
    console.log(items);
   return res.json({ items: Item.getAll() });
  } catch (e) {
    return next(e)
  }
}); 

/** POST / {name, price} => new-item */

// router.post("/", (req, res, next) => {
//   console.log("Received POST request:", req.body);
//   try {
//     const newItem = { name: req.body.name, price: req.body.price };
//     items.push(newItem);
//     return res.json({ item: newItem });
//   } catch (err) {
//     console.error("Error:", err);
//     return next(err);
//   }
// });

// Orm
router.post("/", (req, res, next) => {
  try {
    // const newItem = { name: req.body.name, price: req.body.price };
    const {name, price} = req.body
    const newItem = new Item(name, price)
    return res.json({ item: newItem });
  } catch (err) {
    return next(err);
  }
});


/** GET /[name] => item */
// router.get('/:name', (req, res, next) => {
//   try {
//     const { name } = req.params;
//     console.log('Received GET request for:', name);
//     const foundItem = items.find(i => i.name === name);
//     console.log(foundItem);
//     if(foundItem === undefined){
//       throw { message: "Not Found", status: 404 }
//     }
//     return res.json({ item: foundItem });
//   } catch (err) {
//     return next(err);
//   }
// });



/** GET /[name] => item ORM */ 
router.get('/:name',(req,res,next)=>{
try {
  const {name} = req.params
  const foundItem = Item.find(name)
  return res.json({item: foundItem})  
} catch (e) {
  return next(e)
}
})



/** PATCH /[name] => item */

// router.patch("/:name", function (req, res) {

//   try {
//     const foundItem = items.find(item => item.name === req.params.name)
//     if(foundItem === undefined) throw new ExpressError('item not found', 404)
//     foundItem.name = req.body.name
//     foundItem.price = req.body.price  
//     res.json({item: foundItem});
//   } catch (err) {
//         return next(err);
//       }
 
// });


// ORM
router.patch("/:name", function (req, res) {

  try {
    const foundItem = Item.find(req.params.name, req.body) 
    res.json({item: foundItem});
  } catch (err) {
        return next(err);
      }
 
});

 
 /** Remove item with matching id. */

// router.delete("/:name", function (req, res) {
//   try {
//   const foundItem = items.find(item => item.name === req.params.name)
//   if(foundItem === -1) throw new ExpressError('item not found', 404)
//   items.splice(foundItem,1) 
//   res.json({message:`${foundItem.name} has been deleted`});
//   } catch (err) {
//     return next(err);
//   }
// });

// ORM
router.delete("/:name", function (req, res) {
  try {
    Item.remove(req.params.name);
    return res.json({message:'Deleted'});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
