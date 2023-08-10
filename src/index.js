import chalk from 'chalk';
import chalkTable from 'chalk-table';
import DraftLog from 'draftlog';
import {readFileSync} from 'fs'
import readLine from 'readline'

import * as url from 'url';
import Person from './person.js';


const __dirname = url.fileURLToPath(new URL('../', import.meta.url));

const database = JSON.parse(readFileSync(__dirname.concat('database.json')));
console.log(database)

DraftLog(console).addLineListener(process.stdin);

const options = {
    leftPad: 2,
    columns: [
        {field: "id", name: chalk.cyan("ID")},
        {field: "vehicles", name: chalk.magenta("Vehicles")},
        {field: "kmTraveled", name: chalk.cyan("KmTraveled")},
        {field: "from", name: chalk.cyan("From")},
        {field: "to", name: chalk.cyan("TO")},
    ]
}

const table = chalkTable(options, database.map(item => new Person(item).fromatted('usa')))
const print = console.draft(table)

const terminal = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})


terminal.question("Whats your name!?   ", msg => {
    console.log("Hi", msg.toString())
})