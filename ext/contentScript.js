
console.log('mmplus contentScript');

function prepareHTML(body) {
	// make ticker more readable they are split by date-times in this format 26.01.21 22:04
	// this splits by the dateformat using a look-ahead regex
	parts = body.split(/(?=\d{2}\.\d{2}\.\d{2}\s\d{2}:\d{2})/g)
	return parts.join('<br>')
}

var ld = document.querySelectorAll('script[type="application/ld+json"]')
// the first element is usually some generic json ld data, we need the second one
if (ld[1]) {
	// ld json for document is there
	content = JSON.parse(ld[1].innerText);
	// the console is noisy as fuck anyway...
	console.log(content);

	if (content.isPartOf && content.isPartOf.productID && content.isPartOf.productID.includes('paid')) {
		// we don't need to do all of this if the article is free anyway
		// thats not actually the image, but the expandable caption
		var image = document.getElementsByClassName('pdb-article-caption')[0];
		if (image) {
			var div = document.createElement('div');
			// id for styling
			div.id = "mmouter";
			div.innerHTML = prepareHTML(content.articleBody);
			image.parentNode.insertBefore(div, image.nextElementSibling);

			var preview = document.getElementsByClassName('pdb-article-body')[0];
			if (preview) {
				preview.remove();
			}
		}
	}
}
