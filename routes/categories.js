const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get("/", async (request, response) => {
  const categoryList = await Category.find();
  response.status(200).send(categoryList);
});

router.get("/:id", async (request, response) => {
  const category = await Category.findById(request.params.id);
  response.status(200).send(category);
});

router.post("/", async (request, response) => {
  let cateogry = new Category({
    name: request.body.name,
    icon: request.body.icon,
    color: request.body.color,
  });
  category = await cateogry.save();
  response.send(cateogry).status(201);
});

router.put("/:id", async (request, response) => {
  let category = await Category.findByIdAndUpdate(request.params.id, {
    name: request.body.name,
    icon: request.body.icon,
    color: request.body.color
  });
  response.send(category);
});

router.delete("/:id", async (request, response) => {
  await Category.findByIdAndDelete(request.params.id).then((category) => {
    if (category) {
      return response
        .status(200)
        .json({ success: true, message: "Deleted successfully.." });
    }
  });
});

module.exports = router;
