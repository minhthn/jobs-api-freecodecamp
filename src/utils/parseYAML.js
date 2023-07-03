import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';

const parseYAML = (filePath) => {
    try {
        const doc = yaml.load(readFileSync(filePath, 'utf8'));
        return doc;
    } catch (err) {
        console.log(">> err.stack:", err.stack);
        throw err;
    }
}

export default parseYAML;
