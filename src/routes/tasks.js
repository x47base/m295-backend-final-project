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

const exampledate = new Date();
exampledate.setFullYear(2024, 4, 20);
exampledate.setHours(12, 0, 0);
tasks.push(new Task('Math Homework', 'The math homework by Mr. Timo Reichert have to be done', false, exampledate));

/* Middleware(s) */

/* API Endpoints */
router.get('/', (req, res) => res.status(200).send(tasks));

router.post('/', (req, res) => {
    if (req.body == {}) {
        return res.sendStatus(400);
    }

    const {title, description, done, duedate} = req.body;

    if (!title || !description || !done || !duedate) {
        return res.sendStatus(400);
    }

    const task = new Task(title, description, Boolean(done), Object(duedate));

    if (task == {}) {
        return res.sendStatus(422);
    } else {
        tasks.push(task);
        return res.sendStatus(201);
    }
});

router.get('/:id', (req, res) => {
    if (!req.params.id) {
        return res.sendStatus(400);
    }

    const id = parseInt(req.params.id);

    try {
        const task = tasks.filter(task => task.id === id)[0];

        if (task === undefined) {
            return res.sendStatus(404);
        }

        return res.status(200).json(task);
    } catch (error) {
        console.warn(error);
        return res.sendStatus(500);
    }
});

router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

module.exports = router;
