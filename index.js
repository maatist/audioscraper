const playwright = require('playwright');



const text = (async () => {

    
    const browser = await playwright.chromium.launch( { headless: false } );
    const page = await browser.newPage();
    
    await page.goto('https://www.audiomusica.com/guitarras.html');

    
    while (true) {

        
        const LAST_ITEM = 'li.product:last-child > div:nth-child(1) > div:nth-child(4) > strong:nth-child(2) > a:nth-child(1'
        await page.waitForSelector(LAST_ITEM)
    
        
        const LAST_ITEM_RESULT = await page.$(LAST_ITEM)
        const LAST_ITEM_TITLE = await LAST_ITEM_RESULT.evaluate(element => element.innerText)
        console.log(LAST_ITEM_TITLE)
    
    
        for (var i = 1; i<22; i++) {
    
    
            const TITULO_ITEM_SELECTOR = `li.product:nth-child(${i}) > div:nth-child(1) > div:nth-child(4) > strong:nth-child(2) > a:nth-child(1)`
            const PRECIO_ITEM_SELECTOR = `//html/body/div[1]/main/div[2]/div[1]/div[4]/div[3]/ol/li[${i}]/div/div[3]/div[2]/div[1]/div/span/span/span`
    
    
            await page.waitForSelector(TITULO_ITEM_SELECTOR)
    
        
            // dentro de la pagina sacar info
    
            let result = await page.$(TITULO_ITEM_SELECTOR);
            
            let titulo = await result.evaluate(element => element.innerText)
            
        
            result = await page.$(PRECIO_ITEM_SELECTOR);
            let precio = await result.evaluate(element => element.innerText)
        
            
            if (precio == 'Precio especial') {
                const PRECIO_ESPECIAL_SELECTOR = `//html/body/div[1]/main/div[2]/div[1]/div[4]/div[3]/ol/li[${i}]/div/div[3]/div[2]/div[1]/div/span[1]/span/span[2]/span`
                result = await page.$(PRECIO_ESPECIAL_SELECTOR);
                let precioEspecial = await result.evaluate(element => element.innerText)
    
                console.log(`Titulo: ${titulo}`)
                console.log(`Precio oferta: ${precioEspecial}`)
                console.log('-----------------------------')
            } else {
                console.log(`Titulo: ${titulo}`)
                console.log(`Precio: ${precio}`)
                console.log('-----------------------------')
            }
    
            
            if(titulo == LAST_ITEM_TITLE) {
                break;
            }
        }

        // Despues de scrapear la pagina hacer click en siguente

        const NEXT_SELECTOR = 'div.toolbar:nth-child(5) > div:nth-child(3) > ul:nth-child(2) > li:nth-child(7) > a:nth-child(1)'
        const NEXT_SELECTOR_RESULT = await page.$(NEXT_SELECTOR)

        if (NEXT_SELECTOR_RESULT !== null) {
            await page.click(NEXT_SELECTOR)
            page.waitForTimeout(500)
        } else {
            break
        }

    } 
    
    
    await browser.close()
    

})();

