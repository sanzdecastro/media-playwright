import { chromium } from "playwright";
import * as fs from 'fs';
// Configura el dispositivo móvil que deseas emular
const iPhone12 = devices['iPhone 12'];

const medias = [
    {
        newspaper: 'El Confidencial',
        url: 'https://www.elconfidencial.com/',
        checkTitles: async ({ page }) => {
            try {
                let title = await page.textContent("article h1")
                if (!title) {
                    title = await page.textContent("article h2")
                }
                return title
            }
            catch(error) {
                console.log(error);
                const title = "No se ha podido conseguir el titular"
                return title
            }
            
        }
    },
    {
        newspaper: 'El País',
        url: 'https://elpais.com/?ed=es',
        checkTitles: async ({ page }) => {
            try {
                const title = await page.textContent("article h2 a")
                return title
            }
            
            catch(error) {
                console.log(error);
                const title = "No se ha podido conseguir el titular"
                return title
            }
        }
    },
    {
        newspaper: 'Público',
        url: 'https://www.publico.es/',
        checkTitles: async ({ page }) => {
            try {
                const title = await page.textContent(".title a")
                return title
            }
            
            catch(error) {
                console.log(error);
                const title = "No se ha podido conseguir el titular"
                return title
            }
        }
    },
    {
        newspaper: 'El Diario',
        url: 'https://www.eldiario.es/',
        checkTitles: async ({ page }) => {
            try {
                const title = await page.textContent(".home-content-container h2 a")
                return title
            }
            
            catch(error) {
                console.log(error);
                const title = "No se ha podido conseguir el titular"
                return title
            }
        }
    },
    {
        newspaper: 'Infolibre',
        url: 'https://www.infolibre.es/',
        checkTitles: async ({ page }) => {
            try {
                const title = await page.textContent("h2.bold a")
                return title
            }
           
            catch(error) {
                console.log(error);
                const title = "No se ha podido conseguir el titular"
                return title
            }
        }
    },
    {
        newspaper: 'La Vanguardia',
        url: 'https://www.lavanguardia.com',
        checkTitles: async ({ page }) => {
            try {
                const title = await page.textContent("h2 a")
                return title
            }
            
            catch(error) {
                console.log(error);
                const title = "No se ha podido conseguir el titular"
                return title
            }
        }
    },
    {
        newspaper: 'El Mundo',
        url: 'https://elmundo.es',
        checkTitles: async ({ page }) => {
            try {
                const title = await page.textContent("article a h2")
                return title
            }
            
            catch(error) {
                console.log(error);
                const title = "No se ha podido conseguir el titular"
                return title
            }
        }
    },
    {
        newspaper: 'El Español',
        url: 'https://elespanol.com',
        checkTitles: async ({ page }) => {
            try {
                const title = await page.textContent("h2.art__title a")
                return title
            }
            
            catch(error) {
                console.log(error);
                const title = "No se ha podido conseguir el titular"
                return title
            }
        }
    },
    {
        newspaper: 'OK Diario',
        url: 'https://okdiario.com',
        checkTitles: async ({ page }) => {
            try {
                const title = await page.textContent("h2 a")
                return title
            }
            
            catch(error) {
                console.log(error);
                const title = "No se ha podido conseguir el titular"
                return title
            }
        }
    },
    {
        newspaper: '20 minutos',
        url: 'https://20minutos.es/',
        checkTitles: async ({ page }) => {
            try {
                const title = await page.textContent("h1 a")
                return title
            }
            
            catch(error) {
                console.log(error);
                const title = "No se ha podido conseguir el titular"
                return title
            }
        }
    },
    {
        newspaper: 'La Razón',
        url: 'https://www.larazon.es/',
        checkTitles: async ({ page }) => {
            try {
                const title = await page.textContent(".article__header h2 a")
                return title
            }
            
            catch(error) {
                console.log(error);
                const title = "No se ha podido conseguir el titular"
                return title
            }
        }
    },
    {
        newspaper: 'ABC',
        url: 'https://www.abc.es/',
        checkTitles: async ({ page }) => {
            try {
                const title = await page.textContent(".voc-container h2 a")
                return title
            }
            catch(error) {
                console.log(error);
                const title = "No se ha podido conseguir el titular"
                return title
            }
        }
    }
];

(async () => {
    const browser = await chromium.launch(
        { headless: true }
    )

    const context = await browser.newContext({
        ...iPhone12
    });

    const titles = []
    
    for (const media of medias) {
        const { checkTitles, newspaper, url } = media

        const page = await context.newPage()

        await page.goto(url)

        const titleResults = await checkTitles({ page })
        const newspaperObject = {
            media: newspaper,
            title: titleResults.trim(),
            mediaUrl: url
        }
        titles.push(newspaperObject);

        await page.close()
    }
    
    console.log(titles)

    // crear archivo json con los resultados
    let newsJSON = await JSON.stringify(titles, null, 2);
    await fs.promises.writeFile("./news.json", newsJSON);

    // cerrar proceso
    console.log('Fin de getinfo.');
    process.exit();
})();

