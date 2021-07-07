const wiki = require('wikipedia');

(async () => {
	try {
		const page = await wiki.page('nodejs');
		console.log(page);
		// Response of type @Page object
		// const summary = await page.summary();
		// console.log(summary.extract);
        //  const intro = await page.intro();
        // console.log(intro);

        // const image = await page.images();

        // console.log(image[1].url);

        // const langlinks = await page.langLinks();
        // langlinks.forEach(element => {
        //     if (element.lang == "hi") {
        //         console.log(element.url);
                
        //     }
        // });
        // console.log(langlinks);
        
		//Response of type @wikiSummary - contains the intro and the main image
	} catch (error) {
		console.log(error);
		//=> Typeof wikiError
	}
})();