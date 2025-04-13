// initialize supabase
const supabase = window.supabase.createClient(
	"https://egrpteffoyaajqxgaepx.supabase.co", 
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncnB0ZWZmb3lhYWpxeGdhZXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjExMzcsImV4cCI6MjA1ODczNzEzN30.uYSZ-yINbOVQMqHY4FXswSCPRMvSAFTbiwhWHFdQ6jc"
)

/* --- navigate.js start ---*/
function loadPage(page) 
{
	// utilize Fetch API to load content dynamically
	fetch(`pages/${page}.html`)
		.then(response => response.text())
		.then(html => {
			document.getElementById("content").innerHTML = html;
			// do not reload the whole page
			window.history.pushState({}, "", "locate?p=" + page);
			// load js files
			const script = document.createElement('script');
			
			if (page === "main")
			{
				script.src = 'javascript/visitor.js';
				script.defer = true;
				document.body.appendChild(script);
			}
			
			if (page === "about")
			{
				script.src = 'javascript/pic_load.js';
				script.defer = true;
				document.body.appendChild(script);
			}
			
			if (page === "user")
			{
				script.src = 'javascript/user.js';
				script.defer = true;
				document.body.appendChild(script);
				
				const refresh_button = document.getElementById("refresh-users");
				if (refresh_button)
				{
					refresh_button.addEventListener("click", fetchUsers);
				}
				
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
	window.open(signupUrl, "Signup", "width=470,height=370,noopener");
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
/* --- navigate.js end ---*/