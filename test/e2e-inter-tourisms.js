const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    console.log("Browser opened.");

    const page = await browser.newPage();
    await page.goto('https://sos2021-03.herokuapp.com/#/');
 
    console.log("Page opened! Taking an screenshot...");

    await page.screenshot({ path: './test/screenshots/inter-tourisms/01.png' });
    
    const [response1] = await Promise.all([
        page.waitForNavigation(),
        page.click("body > main > main > h4 > a"),
      ]);
      
    console.log("Clicked \"aqui\" link, redirecting to principal page...");
      
    await page.waitForTimeout(1000);  

    console.log("Timeout! Taking an screenshot...");

    await page.screenshot({ path: './test/screenshots/inter-tourisms/02.png' });
    const [response2] = await Promise.all([
        page.waitForNavigation(),
        page.click("body > nav > div > ul > li:nth-child(5) > a"),
      ]);
      
    console.log("Clicked \"Turismo Internacional\" link, redirecting to international tourisms page...");
      
    await page.waitForTimeout(1000);  

    console.log("Timeout! Taking an screenshot...");

    await page.click("#borrar"),

    await page.waitForTimeout(1000);

    await page.screenshot({ path: './test/screenshots/inter-tourisms/03.png' });

    var rowCount = ((await page.$$("body > main > main > main > table > tbody > tr")).length)-1;
    
    console.log(`Initial row count = ${rowCount}. It must be 0`);

    await page.click("#cargar");

    page.evaluate('window.alert = () => true');
      
    console.log("Clicked \"Cargar registros\" , uploading registers...");
      
    await page.waitForTimeout(2000);  

    console.log("Timeout! Taking an screenshot...");

    await page.screenshot({ path: './test/screenshots/inter-tourisms/04.png' });

    var rowCount1 = ((await page.$$("body > main > main > main > table > tbody > tr")).length)-1;
    
    console.log(`Initial row count = ${rowCount1}. It must be 10`);

    await page.$eval('#country', el => el.value = 'paula');
    await page.$eval('#year', el => el.value = '2021');
    await page.$eval('#numberofarrivals', el => el.value = '10333');
    await page.$eval('#numberofdepartures', el => el.value = '3333');
    await page.$eval('#expendituresbillion', el => el.value = '2344');

    await page.waitForTimeout(2000); 

    await page.screenshot({ path: './test/screenshots/inter-tourisms/05.png' });

    await page.click('#add');

    page.evaluate('window.alert = () => true');

    await page.waitForTimeout(2000);  

    await page.screenshot({ path: './test/screenshots/inter-tourisms/06.png' });

    //Hasta aqui comprobaciones de datos y ahora comprobamos graficos 

    await page.click('#Volverinfo');

    await page.waitForTimeout(5000);  

    await page.evaluate(() => {
        location.reload(true)
    })

    await page.waitForTimeout(2000);

    await page.screenshot({ path: './test/screenshots/inter-tourisms/07.png' });

    ////Ahora vamos a mostrar las integraciones


    await page.waitForTimeout(2000);

    await page.click('body > main > main > h3:nth-child(7) > a');

    await page.waitForTimeout(2000);

    console.log("We must be at principal page...");

    await page.screenshot({ path: './test/screenshots/inter-tourisms/08.png' });

    await page.click('body > main > main > ul:nth-child(5) > li:nth-child(1) > a');

    await page.waitForTimeout(2000);
   
    
    console.log("We must be at integrations page...");

    await page.screenshot({ path: './test/screenshots/inter-tourisms/09.png' });

    await page.goBack();

    await page.click('body > main > main > ul:nth-child(5) > li:nth-child(1) > a');

    await page.waitForTimeout(2000);

    

    console.log("We must be at nuts integration page...");

    

    await page.goBack();

    await page.click('body > main > main > ul:nth-child(5) > li:nth-child(2) > a');

    

    await page.waitForTimeout(2000);

    console.log("We must be at education integration page...");

    await page.screenshot({ path: './test/screenshots/inter-tourisms/10.png' });

    await page.goBack();

    await page.click('body > main > main > ul:nth-child(5) > li:nth-child(3) > a');

    await page.waitForTimeout(2000);

    console.log("We must be at COVID india integration page...");

    await page.screenshot({ path: './test/screenshots/inter-tourisms/11.png' });

    await page.goBack();

    await page.click('body > main > main > ul:nth-child(5) > li:nth-child(6) > a');

    await page.waitForTimeout(2000);

    await page.evaluate(() => {
        location.reload(true)
    })

    await page.waitForTimeout(2000);

    console.log("We must be at external2 integration page...");

    await page.screenshot({ path: './test/screenshots/inter-tourisms/12.png' });


    await browser.close();

    console.log("Browser closed!");

})();