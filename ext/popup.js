document.getElementById('version-installed').innerText = chrome.runtime.getManifest().version;

fetch('https://api.github.com/repos/TheHippo/mmplus/releases')
	.then(res => res.json())
	.then((releases) => {
		console.log(releases)
		for (release of releases) {
			console.dir(release)
			if (release.draft || release.prerelease) {
				continue;
			}
			document.getElementById('version-available').innerText = release.tag_name.slice(1);
			for (asset of release.assets) {
				if (asset.name == 'mmplus.zip') {
					document.getElementById('download-button').setAttribute('href', asset.browser_download_url);
					break;
				}
			}
			break;
		}
	}).catch(err => {
		console.error(err)
		document.getElementById('version-available').innerText = 'Could not find newest release';
		document.getElementById('download-button').remove();
	});