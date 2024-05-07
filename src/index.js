import { chromium } from "playwright";
import * as fs from 'fs';
const medias = [
    {
        newspaper: 'El Confidencial',
        url: 'https://www.elconfidencial.com/',
        checkTitles: async ({ page }) => {
            const title = await page.textContent("article:first-of-type div a")
            return title
        }
    },
    {
        newspaper: 'El País',
        url: 'https://elpais.com/',
        checkTitles: async ({ page }) => {
            const title = await page.textContent("header:first-of-type h2 a")
            return title
        }
    }
];

(async () => {
    const browser = await chromium.launch(
        { headless: true }
    )
    
    const titles = []
    
    for (const media of medias) {
        const { checkTitles, newspaper, url } = media

        const page = await browser.newPage()
        await page.goto(url)

        const titleResults = await checkTitles({ page })
        const newspaperObject = {
            media: newspaper,
            title: titleResults.trim(),
        }
        titles.push(newspaperObject);

        await page.close()
    }
    
    console.log(titles)
      //writing async data
        let newsJSON = await JSON.stringify(titles, null, 2);
        await fs.promises.writeFile("news.json", newsJSON);
})();

