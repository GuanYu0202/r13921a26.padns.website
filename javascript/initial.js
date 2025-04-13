// initialize supabase
const supabase = window.supabase.createClient(
	"https://egrpteffoyaajqxgaepx.supabase.co", 
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncnB0ZWZmb3lhYWpxeGdhZXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjExMzcsImV4cCI6MjA1ODczNzEzN30.uYSZ-yINbOVQMqHY4FXswSCPRMvSAFTbiwhWHFdQ6jc"
)

function loadPage(page) 
{
	document.getElementById("signupModal").style.display = "none";
	document.getElementById("signinModal").style.display = "none";
	document.getElementById("content").style.display = "block";
	// utilize Fetch API to load content dynamically
	fetch(`./pages/${page}.html`)
		.then(response => response.text())
		.then(html => {
			document.getElementById("content").innerHTML = html;
			// do not reload the whole page
			window.history.pushState({}, "", `?p=${page}`);
			// load js files
			const script = document.createElement('script');
			
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

const w = window.screen.width;
const h = window.screen.height;

function openSignupModal() 
{
	document.getElementById("signupModal").style.display = "block";
	document.getElementById("signinModal").style.display = "none";
	document.getElementById("content").style.display = "none";
}

function openSigninModal() 
{
	document.getElementById("signupModal").style.display = "none";
	document.getElementById("signinModal").style.display = "block";
	document.getElementById("content").style.display = "none";
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

function signout() 
{
	localStorage.removeItem("currentUser");
	alert("You have been signed out!");
	location.reload();
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
		updateUserDisplay(currentUser);
		chatConfig.style.display = "inline-block";
		statusConfig.innerHTML = `<a href="#" onclick="signout(); return false;"><b>Sign Out</b></a>`
	} 
	else 
	{
		updateUserDisplay("Guest");
		chatConfig.style.display = "none";
		statusConfig.innerHTML = `<a href="#" onclick="openSigninModal(); return false;"><b>Sign In</b></a>`;
	}
});