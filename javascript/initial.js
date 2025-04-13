// initialize supabase
const supabase = window.supabase.createClient(
	"https://egrpteffoyaajqxgaepx.supabase.co", 
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncnB0ZWZmb3lhYWpxeGdhZXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjExMzcsImV4cCI6MjA1ODczNzEzN30.uYSZ-yINbOVQMqHY4FXswSCPRMvSAFTbiwhWHFdQ6jc"
)

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
				script.src = 'javascript/icon_load.js';
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
			
			if (page === "board")
			{
				script.src = 'javascript/board.js';
				script.defer = true;
				document.body.appendChild(script);
			}
		})
		.catch(error => console.error("Loading Error:", error));
}

const w = window.screen.width * 0.3;
const h = window.screen.height * 0.4;

function openSignupWindow() 
{
	const signupUrl = "pages/signup.html";
	window.open(signupUrl, "Sign up", 'width=${w},height=${h},noopener');
}

function openSigninWindow() 
{
	const loginUrl = "pages/signin.html";
	window.open(loginUrl, "Sign in", 'width=${w},height=${h},noopener');
}

function getCurrentPage() 
{
	const params = new URLSearchParams(window.location.search);
	return params.get("p");
}

function updateUserDisplay(username) 
{
	document.getElementById("user-display").innerText = `Logged in as: ${username}`;
}

function logout() 
{
	localStorage.removeItem("currentUser");
	updateUserDisplay("Guest");
	document.getElementById("chat").style.display = "none";
	document.getElementById("status").style.display = "none";
	alert("You have been signed out!");
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

window.addEventListener("DOMContentLoaded", () => 
{
	const currentUser = localStorage.getItem("currentUser");
	const chatConfig = document.getElementById("chat");
	const statusConfig = document.getElementById("status");
	const userDisplay = document.getElementById("user-display");

	if (currentUser) 
	{
		const { username } = JSON.parse(currentUser);
		updateUserDisplay(username);
		chatConfig.style.display = "inline-block";
		statusConfig.style.display = "inline-block";
	} 
	else 
	{
		updateUserDisplay("Guest");
		chatConfig.style.display = "none";
		statusConfig.style.display = "none";
	}
});