import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export class DataProvider {

    static getTestDataFromJson(filePath) {

        let data = JSON.parse(
            fs.readFileSync(filePath, 'utf8')
        );

        return data;
    }

    static getTestDataFromCsv(filePath) {

        const absolutePath = path.resolve(filePath);

        let data = parse(
            fs.readFileSync(absolutePath, 'utf8'),
            {
                columns: true,
                skip_empty_lines: true
            }
        );

        return data;
    }
}