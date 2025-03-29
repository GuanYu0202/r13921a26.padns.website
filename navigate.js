function loadPage(page) 
{
	// utilize Fetch API to load content dynamically
	fetch(`pages/${page}.html`)
		.then(response => response.text())
		.then(html => {
			document.getElementById("content").innerHTML = html;
			// do not reload the whole page
			window.history.pushState({}, "", "#" + page);
		})
		.catch(error => console.error("Loading Error:", error));
}

window.addEventListener("popstate", function() {
	let page = location.hash.substring(1);
    if (page) {loadPage(page);} 
	else {
        // the content of my initial page
        document.getElementById("content").innerHTML = `
            <h1 class="title"><b>Welcome to r13921a26's Website!!</b></h1>
            <p>Click on the menu above to navigate through the different pages!</p>
            <time class="currentTime"></time>
        `;
    }
});

document.addEventListener("DOMContentLoaded", function() {
	let page = location.hash.substring(1);
    if (page) {loadPage(page);}
});