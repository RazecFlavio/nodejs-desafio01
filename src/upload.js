import { parse } from 'csv-parse';
import fs from 'node:fs'

const file = new URL('../tasks.csv', import.meta.url);

const stream = fs.createReadStream(file);

const parser = parse({
    delimiter: ',',
    fromLine: 2
});

async function execute() {
    const lines = stream.pipe(parser);
    for await (const line of lines) {
        await fetch('http://localhost:3333/tasks', {
            method: 'POST',
            body: JSON.stringify({
                title: line[0],
                description: line[1]
            })
        })
    }
}

execute();