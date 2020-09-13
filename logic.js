const playwright = require('playwright');


const text = (async () => {

    const browser = await playwright.chromium.launch({ headless: false });
    const page = await browser.newPage();

    const DESCRIPTION_SELECTOR = '.description > p:nth-child(2)'

    await page.goto('https://www.yapo.cl/valparaiso/arrendar/departamento__lrl__edificio_mirador_195_par__8230__71658113.htm?ca=6_s&first=1&oa=71658113&xsp=0');

    await page.waitForTimeout(300)

    await page.waitForSelector(DESCRIPTION_SELECTOR)

    const result = await page.$(DESCRIPTION_SELECTOR);
    const text = await result.evaluate(element => element.innerText)

    
    
    await browser.close()
    return(text)


})();

export default text