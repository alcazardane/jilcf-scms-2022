const Announcement = require("../models/announcementModel");

exports.createAnnouncement  = async (req, res) => {
  try {
    const newAnnouncement = new Announcement({
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      date: req.body.date,
      time: req.body.time,
      place: req.body.place,
    });
    const announcement = await newAnnouncement.save();
    res.status(201).json(announcement);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create event', error: err });
  }
};

exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (err) {
    res.status(400).json({ message: 'Failed to get events', error: err });
  }
};

exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      res.json(announcement);
    }
  } catch (err) {
    res.status(400).json({ message: 'Failed to get event', error: err });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!announcement) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      res.json(event);
    }
  } catch (err) {
    res.status(400).json({ message: 'Failed to update event', error: err });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      res.json({ message: 'Successfully deleted event' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete event', error: err });
  }
};