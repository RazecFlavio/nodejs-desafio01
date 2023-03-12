import fs from 'node:fs/promises'
import { randomUUID } from 'node:crypto'

const databasepath = new URL('../db.json', import.meta.url);

export class Database {
    #database = [];

    constructor() {
        fs.readFile(databasepath, 'utf-8').then(data => {
            this.#database = JSON.parse(data);
        }).catch(() => {
            this.#persist();
        })
    }
    #persist() { fs.writeFile(databasepath, JSON.stringify(this.#database)) }

    insert(data) {
        data.id = randomUUID();
        data.created_at = new Date();
        data.completed_at = null;

        this.#database = [data, ...this.#database];
        this.#persist();
    }

    select() { return this.#database; }

    update(id, title, description) {
        let index = this.#database.findIndex(task => { return task.id === id })
        console.log('idnex', index);
        if (index != -1) {
            console.log('item', this.#database[index])
            this.#database[index] = {
                ...this.#database[index],
                title, description
            };
            this.#persist();
        }
    }

    delete(id) {
        this.#database = this.#database.filter(task => { return task.id != id })
        this.#persist();
    }

    completed(id) {
        let index = this.#database.findIndex(task => { return task.id === id })
        if (index != -1) {
            this.#database[index] = {
                ...this.#database[index],
                completed_at: new Date()
            }
            this.#persist();
        }

    }

    imported(tasks) { this.#database = [...tasks, ...this.#database]; }
}