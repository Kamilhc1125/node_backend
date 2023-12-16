const express = require('express');
const router = express.Router();
const Subsciber = require('../models/subscriber');

// Get All
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscibe.find();
    res.json(subscribers);
  } catch {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get('/:id', getSubscriber, (req, res) => {
  res.send(res.subscriber.name)
});

// Creating One
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message:err.message })
  }
});

// Update One
router.patch('/', getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subsciber.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.subsciber.subscribedToChannel = req.body.subscribedToChannel;
  }

  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }

});

// Delete One
router.delete('/', async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: 'Deleted Subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

async function getSubscriber(req, res, next) {

  let subscriber;

  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subsciber'})
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber;
  next();
}

module.exports = router;