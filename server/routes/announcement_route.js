const express = require('express');
const announcementController = require("../controllers/announcementController");

const router = express.Router();

router.post('/create-announcement', announcementController.createAnnouncement);
router.get('/', announcementController.getAllAnnouncements);
router.get('/:id', announcementController.getAnnouncementById);
router.patch('/:id', announcementController.updateAnnouncement);
router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router;