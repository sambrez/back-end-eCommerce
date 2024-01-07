const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{model: Product}]
  })
    .then(categories => res.json(categories))
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  Category.findOne({
    where: {id: req.params.id},
    include: [{model: Product}]
  })
    .then(singleCategory => {
      if (!singleCategory) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      res.json(singleCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then((newCategory) => res.json(newCategory))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {id: req.params.id}
  })
    .then(updatedCategory => {
      if (!updatedCategory[0]) {
        res.status(404).json({ message: 'Category not found'});
        return;
      }
      res.json(updatedCategory);
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {id: req.params.id}
  })
    .then(deletedCategory => {
      if (!deletedCategory) {
        res.status(404).json({ message: 'Category not found'});
        return;
      }
      res.json(deletedCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;
