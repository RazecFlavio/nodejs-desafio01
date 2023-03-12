import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes =
    [
        {
            method: 'POST',
            path: buildRoutePath('/tasks'),
            handler: (req, res) => {
                const { title, description } = req.body;
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
            path: buildRoutePath('/tasks'),
            handler: (req, res) => {
                const { id, title, description } = req.body;
                database.update(id, title, description);
                return res.writeHead(200).end();
            }
        },
        {
            method: 'DELETE',
            path: buildRoutePath('/tasks/:id'),
            handler: (req, res) => {
                const { id } = req.params;
                database.delete(id);
                return res.end();
            }
        },
        {
            method: 'PATCH',
            path: buildRoutePath('/tasks/:id'),
            handler: (req, res) => {
                const { id } = req.params;
                database.completed(id);
                return res.end();
            }
        }
    ];