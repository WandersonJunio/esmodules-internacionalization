import DraftLog from 'draftlog'
import readLine from 'readline'

import chalk from 'chalk';
import chalkTable from 'chalk-table';
import Person from './person.js';

export default class TerminalController {
    constructor() {
        this.print = {}
        this.data = {}
    }

    initializeTerminal(database, language){
        DraftLog(console).addLineListener(process.stdin)

        this.terminal = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        this.initializeTable(database, language);
    }

    terminalClose() {
        this.terminal.close()
    }

    initializeTable(database, language) {
        const data = database.map(item => new Person(item).fromatted(language))
        const table = chalkTable(this.getTableOptions(), data)
        this.print = console.draft(table)
        this.data = data
    }

    question(msg = '') {
       return new Promise(resolve => this.terminal.question(msg, resolve))
    }

    getTableOptions() {
        return {
            leftPad: 2,
            columns: [
                {field: "id", name: chalk.cyan("ID")},
                {field: "vehicles", name: chalk.magenta("Vehicles")},
                {field: "kmTraveled", name: chalk.cyan("KmTraveled")},
                {field: "from", name: chalk.cyan("From")},
                {field: "to", name: chalk.cyan("TO")},
            ]
        }
    }
}