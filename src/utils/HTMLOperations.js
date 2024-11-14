import OpenAI from "openai";

// Open AI
const openai = new OpenAI();

async function getOpenAIPrompt(content) {    
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { "role": "user", "content": content }
        ]
    });

    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
}
export async function generateHTMLFromArticle(content) {
    // const prompt = `        
    //     Przekształć poniższą treść artykułu do formatu HTML, używając odpowiednich tagów do strukturyzacji. 
    //     Wstaw znaczniki <img> tam, gdzie można dodać ilustracje, atrybut src="image_placeholder.jpg" i 
    //     alt opisujący ilustrację. Użyj tagów <figcaption> do podpisów pod grafikami.
    //     Wygenerowany kod HTML ma być później wklejony do sekcji body strony internetowej.
    //     Nie dodawaj do kodu HTML stylów CSS ani skryptów JavaScript.        
    //     Artykuł: ${content}
    // `;
    // return await getOpenAIPrompt(prompt);
    const prompt = `
    \`\`\`html
<article>
    <h1>Sztuczna inteligencja: wpływ i wyzwania</h1>
    
    <p>Sztuczna inteligencja to dziedzina nauki i technologii zajmująca się tworzeniem maszyn i programów zdolnych do wykonywania zadań wymagających ludzkiej inteligencji, takich jak uczenie się, rozumienie języka naturalnego i podejmowanie decyzji. AI stała się integralną częścią naszego codziennego życia, od asystentów głosowych w smartfonach, jak Siri czy Google Assistant, po systemy rekomendacyjne na platformach streamingowych, takich jak Netflix czy Spotify. Wspiera nas w planowaniu tras, automatyzacji domowych urządzeń oraz w komunikacji. Obecnie jest o niej bardzo głośno chociażby za sprawą dużych modeli językowych, jak ChatGPT.</p>

    <figure>
        <img src="image_placeholder.jpg" alt="Ilustracja przedstawiająca rozwój technologii AI">
        <figcaption>Ilustracja przedstawiająca rozwój technologii AI</figcaption>
    </figure>

    <h2>Rozwój uczenia maszynowego i głębokiego uczenia</h2>
    <p>Rozwój uczenia maszynowego i głębokiego uczenia umożliwił tworzenie zaawansowanych modeli, które potrafią samodzielnie rozwiązywać skomplikowane problemy. Sieci neuronowe analizują ogromne ilości danych w obszarach takich jak rozpoznawanie obrazów czy przetwarzanie języka naturalnego. Dzięki temu AI nie tylko przetwarza dane, ale także podejmuje decyzje, wcześniej zarezerwowane dla ludzi.</p>

    <figure>
        <img src="image_placeholder.jpg" alt="Sieć neuronowa wizualizacja">
        <figcaption>Sieć neuronowa wizualizacja</figcaption>
    </figure>

    <h3>Wyzwania etyczne i społeczne</h3>
    <p>Kluczowym wyzwaniem jest zapewnienie etycznego i odpowiedzialnego rozwoju AI. Należy zwracać uwagę na uprzedzenia w danych treningowych, które mogą prowadzić do dyskryminacji, oraz na wpływ AI na prywatność i nierówności społeczne. Ważne jest opracowanie ram etycznych i mechanizmów nadzoru regulujących rozwój i wdrażanie AI, a także włączanie różnych grup społecznych w ten proces. Transparentność działań firm i instytucji może pomóc w budowaniu zaufania do technologii.</p>
    
    <p>Badacze pracują nad rozwiązaniami umożliwiającymi harmonijne współistnienie ludzi i AI, koncentrując się na tworzeniu systemów wspierających człowieka, a nie go zastępujących. Istotne jest opracowywanie mechanizmów współpracy między człowiekiem a maszyną, co sprzyja synergii i skutecznej komunikacji.</p>

    <figure>
        <img src="image_placeholder.jpg" alt="Grafika przedstawiająca współpracę człowieka i maszyny">
        <figcaption>Grafika przedstawiająca współpracę człowieka i maszyny</figcaption>
    </figure>

    <h3>Automatyzacja i przyszłość rynku pracy</h3>
    <p>Automatyzacja procesów dzięki AI przynosi korzyści w postaci zwiększonej efektywności i redukcji kosztów. Jednak istnieją obawy dotyczące wpływu na rynek pracy i potencjalnego zastąpienia ludzi przez maszyny. Kluczowe jest przemyślane podejście do transformacji rynku pracy, inwestycja w edukację i przekwalifikowanie pracowników, aby mogli oni znaleźć nowe role w gospodarce przyszłości.</p>

    <p>Specjaliści powinni być gotowi na ciągłe doskonalenie swoich umiejętności, ucząc się m.in. zasad działania algorytmów AI. Przyszłość pracy będzie wymagać nie tylko umiejętności technicznych, ale także kompetencji miękkich, takich jak kreatywność i zdolność rozwiązywania problemów.</p>
 
    <p>Nasza zdolność do adaptacji i innowacji zdecyduje o tym, jak AI wpłynie na przyszłość ludzkości. Wspólnie możemy kształtować tę przyszłość, wykorzystując AI dla dobra wszystkich.</p>

    <footer>
        <p><em>*Tekst opracowany przez AI. W Oxido nie mamy aż tak cukierkowego spojrzenia na sztuczną inteligencję... ;) </em></p>
    </footer>
</article>
\`\`\`
    `;

    const cleanedPrompt = prompt.replace(/^\s*```html\s*/, '').replace(/\s*```\s*$/, '');
    return cleanedPrompt;
}

export function placeArticleInHTMLTemplate(template, articleContent) {
    return template.replace(/<body>.*<\/body>/s, `<body>\n${articleContent}\n</body>`);
}