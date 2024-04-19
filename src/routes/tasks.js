const express = require('express');

const router = new express.Router();

/* Variables, Constants, Functions, Classes */
const tasks = [

];

class Task {
    constructor(title, description, done, duedate) {
        this.id = tasks.length + 1;
        this.title = title;
        this.description = description;
        this.done = done;
        this.duedate = duedate;
        this.createdAt = Date.now();
    }
}

/* Middleware(s) */

/* API Endpoints */
router.get('/', (req, res) => {});

router.post('/', (req, res) => {});

router.get('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

module.exports = router;
