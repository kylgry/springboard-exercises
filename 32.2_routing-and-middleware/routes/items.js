const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const items = require("../fakeDb")

router.get("/", function(req,res){
  res.json(items)
})

router.post("/", function (req, res) {
  const item = { name: req.body.name, price: req.body.price }
  console.log(item)
  items.push(item)
  res.status(201).json({added: item})
})

router.get("/:name", function (req, res) {
  const item = items.find(item => item.name === req.params.name)
  if(item === undefined) throw new ExpressError("Item not found", 404)
  res.json({item})
})

router.patch("/:name", function (req, res) {
  const item = items.find(item => item.name === req.params.name)
  if(item === undefined) throw new ExpressError("Item not found", 404)
  item.name = req.body.name
  item.price = req.body.price
  res.json({updated: item})
})

router.delete("/:name", function (req, res) {
  const item = items.findIndex(item => item.name === req.params.name)
  if (item === -1) throw new ExpressError("Item not found", 404)
  items.splice(item, 1)
  res.json({message: "Deleted"})
})

module.exports = router;
