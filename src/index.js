import dotenv from 'dotenv';
import { reportMissingEnvVars } from "./utils/reportMissingEnvVars.js";
import { generateHTMLFromArticle, initOpenAI, placeArticleInHTMLTemplate } from "./utils/HTMLOperations.js";
import { getFile, saveHTMLToFile } from './utils/fileOperations.js';

// .env file
dotenv.config();
dotenv.config({ path: `.env.local`, override: true });
reportMissingEnvVars();

initOpenAI();

async function main(){
    const articleContent = getFile('./data/article.txt');
    const htmlTemplate = getFile('./templates/szablon.html');
    const generatedHTML = await generateHTMLFromArticle(articleContent);
    const finalHTML = placeArticleInHTMLTemplate(htmlTemplate, generatedHTML);

    saveHTMLToFile('./output/artykul.html', generatedHTML);
    saveHTMLToFile('./output/podglad.html', finalHTML);
}

main();