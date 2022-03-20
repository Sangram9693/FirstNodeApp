'use strict';

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/StudentController')

router.post('/create', studentController.createStudent);
router.put('/update/:id', studentController.updateStudent);
router.get('/all', studentController.getAllStudent);
router.get('/:id', studentController.getByStudentId);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;