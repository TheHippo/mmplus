
console.log('mmplus contentScript');

function prepareHTML(body) {
	// make ticker more readable they are split by date-times in this format 26.01.21 22:04
	// this splits by the dateformat using a look-ahead regex
	parts = body.split(/(?=\d{2}\.\d{2}\.\d{2}\s\d{2}:\d{2})/g)
	return parts.join('<br>')
}
const ldScriptIndex = 2;
var ld = document.querySelectorAll('script[type="application/ld+json"]')
// the first elements are usually some generic json ld data, we need the third one
if (ld[ldScriptIndex]) {
	// ld json for document is there
	content = JSON.parse(ld[ldScriptIndex].innerText);
	// the console is noisy as fuck anyway...
	console.log(content);

	if (!content.isAccessibleForFree) {
		// we don't need to do all of this if the article is free anyway
		
		// remove the intro text
		var intro = document.querySelector('header > :last-child');
		if (intro) {
			intro.remove();
		}

		// remove the buy Abo section
		var paywall = document.querySelector('header + *');
		if (paywall) {
			paywall.remove();
		}

		var header = document.querySelector('header');
		var div = document.createElement('div');

		var date = new Date(Date.parse(content.datePublished));
		
		// id for styling
		div.id = "mmouter";
		div.innerHTML = 
			content.description +
			"<hr/>" + 
			prepareHTML(content.articleBody) + 
			"<hr/>" + 
			content.author.name + ' / ' + content.publisher.name + ' ' + date.toLocaleTimeString('de-de') + ' ' + date.toLocaleDateString('de-de');

		header.insertAdjacentElement('afterend', div);

		// remove other stuff

		document.querySelector('#mmouter + div').remove();
		document.querySelector('#mmouter + svg').remove();

		
	}
}
