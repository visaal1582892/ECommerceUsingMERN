const express = require('express');
const multer = require('multer');
const path = require('path');

// Configure multer storage (files will be saved in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;
