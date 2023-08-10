import {readFileSync} from 'fs'
import * as url from 'url';
import TerminalController from './terminalController.js';
import Person from './person.js';

const __dirname = url.fileURLToPath(new URL('../', import.meta.url));
const database = JSON.parse(readFileSync(__dirname.concat('database.json')));

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, "usa");

const STOP_TERM = ":q";

async function mainLoop() {
    try {
        const answer = await terminalController.question('What??')
        if (answer === STOP_TERM) return terminalController.terminalClose()

        const person = Person.generateInstanceFromString(answer);
        console.log('person', person)
        return mainLoop()
    } catch (error) {
        console.log("Error: ", error)
        mainLoop();
    }
}

await mainLoop();