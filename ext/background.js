chrome.runtime.onInstalled.addListener(function () {
	console.log("installed mmplus");

	// only show the mmplus button on these pages

	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostContains: 'sn-online.de' }}),
				new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostContains: 'neuepresse.de' } }),
				new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostContains: 'paz-online.de' } }),
				new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostContains: 'waz-online.de' } }),
				new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostContains: 'goettinger-tageblatt.de' } }),
				new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostContains: 'ln-online.de' } }),
				new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostContains: 'ostsee-zeitung.de' } }),
				new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostContains: 'maz-online.de' } }),
				new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostContains: 'dnn.de' } }),
				new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostContains: 'lvz.de' } })
			],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});	
});