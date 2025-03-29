function loadPage(page) 
{
	// utilize Fetch API to load content dynamically
	fetch(`./pages/${page}.html`)
		.then(response => response.text())
		.then(html => {
			document.getElementById("content").innerHTML = html;
			// do not reload the whole page
			window.history.pushState({}, "", "#" + page);
		})
		.catch(error => console.error("Loading Error:", error));
}

window.addEventListener("popstate", function() {
	let page = location.hash.substring(1) || "main";
	loadPage(page);
});

document.addEventListener("DOMContentLoaded", function() {
	let page = location.hash.substring(1) || "main";
	loadPage(page);
});