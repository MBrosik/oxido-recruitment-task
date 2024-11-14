import fs from 'fs';

export function getFile(fileName) {
   try {
       return fs.readFileSync(fileName, 'utf8');
   } catch (error) {
       console.error("Problem with reading file:", error);
       return null;
   }
}

export function saveHTMLToFile(filename, content) {
    try {
        fs.writeFileSync(filename, content, 'utf8');
        console.log(`File ${filename} was saves successfully!`);
    } catch (error) {
        console.error("Problem with writing file:", error);
    }
}