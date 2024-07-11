const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.get('/', auth, role(['admin']), getAllUsers);
router.get('/:id', auth, role(['admin']), getUserById);
router.put('/:id', auth, role(['admin']), updateUser);
router.delete('/:id', auth, role(['admin']), deleteUser);

module.exports = router;
