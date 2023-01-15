const express = require('express');
const announcementController = require("../controllers/announcementController");

const router = express.Router();

router.post('/', announcementController.createAnnouncement);
router.get('/', announcementController.getAllAnnouncements);
router.get('/:id', announcementController.getAnnouncementById);
router.put('/:id', announcementController.updateAnnouncement);
router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router;