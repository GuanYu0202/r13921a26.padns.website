function loadPage(page) 
{
	// utilize Fetch API to load content dynamically
	fetch(`pages/${page}.html`)
		.then(response => response.text())
		.then(html => {
			document.getElementById("content").innerHTML = html;
			// do not reload the whole page
			window.history.pushState({}, "", "locate?p=" + page);
			
			if (page === "user")
			{
				fetchUsers();
				setTimeout(() => 
				{
                    const refreshButton = document.getElementById("refresh-users");
                    if (refreshButton) 
					{
                        refreshButton.addEventListener("click", fetchUsers);
                    }
                }, 100);
			}
		})
		.catch(error => console.error("Loading Error:", error));
}

function openSignupWindow() 
{
	const signupUrl = "pages/register_temp.html";
	window.open(signupUrl, "Signup", "width=550,height=600,noopener");
}

function getCurrentPage() 
{
	const params = new URLSearchParams(window.location.search);
	return params.get("p");
}

window.addEventListener("popstate", function() 
{
	let page = location.hash.substring(1);
    if (page) {loadPage(page);} 
});

document.addEventListener("DOMContentLoaded", function() 
{
	let page = getCurrentPage();
	if (page) { loadPage(page); }
});