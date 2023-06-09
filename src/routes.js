import { Database } from './database.js'
import { json } from './middlewares/json.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes =
    [
        {
            method: 'POST',
            path: buildRoutePath('/tasks'),
            handler: (req, res) => {
                const { title, description } = req.body;

                if (!title || !description)
                    return res.writeHead(400).end();

                database.insert({
                    title,
                    description
                });

                return res.writeHead(201).end();
            }
        },
        {
            method: 'GET',
            path: buildRoutePath('/tasks'),
            handler: (req, res) => {
                const tasks = database.select();
                return res.end(JSON.stringify(tasks))
            }
        },
        {
            method: 'PUT',
            path: buildRoutePath('/tasks/:id'),
            handler: (req, res) => {
                const { title, description } = req.body;
                const { id } = req.params;

                if (!id || !title || !description)
                    return res.writeHead(400).end();

                const exists = database.select(id);

                if (!exists)
                    return res.end(JSON.stringify({ message: "Task not found! " }))

                database.update(id, title, description);
                return res.writeHead(200).end();
            }
        },
        {
            method: 'DELETE',
            path: buildRoutePath('/tasks/:id'),
            handler: (req, res) => {
                const { id } = req.params;
                const exists = database.select(id);

                if (!exists)
                    return res.end(JSON.stringify({ message: "Task not found! " }))

                database.delete(id);
                return res.end();
            }
        },
        {
            method: 'PATCH',
            path: buildRoutePath('/tasks/:id/complete'),
            handler: (req, res) => {
                const { id } = req.params;

                const exists = database.select(id);

                if (!exists)
                    return res.end(JSON.stringify({ message: "Task not found! " }))

                database.completed(id);
                return res.end();
            }
        }
    ];