import OpenAI from "openai";

// Open AI

/**@type {OpenAI} */
let openai;

export async function initOpenAI() {
    openai = new OpenAI();
}

async function getOpenAIPrompt(content) {        
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { "role": "user", "content": content }
        ]
    });
    
    return completion.choices[0].message.content ?? "";
}

export async function generateHTMLFromArticle(content) {
    const promptText = `        
        Przekształć poniższą treść artykułu do formatu HTML, używając odpowiednich tagów do strukturyzacji. 
        Wstaw znaczniki <img> tam, gdzie można dodać ilustracje, atrybut src="image_placeholder.jpg" i 
        alt opisujący ilustrację. Użyj tagów <figcaption> do podpisów pod grafikami.
        Wygenerowany kod HTML ma być później wklejony do sekcji body strony internetowej.
        Nie dodawaj do kodu HTML stylów CSS ani skryptów JavaScript.        
        Artykuł: ${content}
    `;

    const prompt =  await getOpenAIPrompt(promptText);   

    const cleanedPrompt = prompt.replace(/^\s*```html\s*/, '').replace(/\s*```\s*$/, '');
    return cleanedPrompt;
}

export function placeArticleInHTMLTemplate(template, articleContent) {
    return template.replace(/<body>.*<\/body>/s, `<body>\n${articleContent}\n</body>`);
}