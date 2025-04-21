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
	
	const { data: session, error: sessionError } = await supabase.auth.refreshSession();
	if (sessionError) 
	{
		alert("Failed to refresh session. Please sign in again.");
		return;
	}
		
	// utilize Fetch API to load content dynamically
	fetch(`./pages/${page}.html`)
		.then(response => response.text())
		.then(html => {
			document.getElementById("content").innerHTML = html;
			// do not reload the whole page
			window.history.pushState({}, "", `?p=${page}`);
			// load js files
			const script = document.createElement('script');
			
			if (page === "main")
			{
				updateViewCount();
			}
			
			if (page === "about")
			{
				script.src = 'javascript/about.js';
				script.defer = true;
				document.body.appendChild(script);
			}
			
			if (page === "board")
			{
				script.src = 'javascript/board.js';
				script.defer = true;
				document.body.appendChild(script);
			}
			
			if (page === "profile")
			{
				script.src = 'javascript/profile.js';
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
	if (username)
	{
		document.getElementById("user-display").innerText = `Welcome ${username}! What a nice day!`;
	}
	else
	{
		document.getElementById("user-display").innerText = `Hello guest! Please sign in!`;
	}
}

async function signout() 
{
	await supabase.auth.signOut();
	alert("You have been signed out!");
	setTimeout( () => {loadPage("main");}, 300 );
}

window.addEventListener("popstate", function() 
{
	let page = location.hash.substring(1);
    if (page) {loadPage(page);} 
});

document.addEventListener("DOMContentLoaded", function() 
{
	let page = getCurrentPage();
	if (page) {loadPage(page);}
});

window.addEventListener("DOMContentLoaded", async () => 
{
	const { data, error } = await supabase.auth.getUser();
	const username = data?.user?.user_metadata?.username
	const chatConfig = document.getElementById("chat");
	const profileConfig = document.getElementById("usr_p");
	const statusConfig = document.getElementById("status");

	if (username) 
	{
		chatConfig.style.display = "inline-block";
		profileConfig.style.display = "inline-block";
		statusConfig.innerHTML = `<a href="#" onclick="signout(); return false;"><b>Sign Out</b></a>`;
	} 
	else 
	{
		chatConfig.style.display = "none";
		profileConfig.style.display = "none";
		statusConfig.innerHTML = `<a href="#" onclick="openSigninModal(); return false;"><b>Sign In</b></a>`;
	}
	
	updateUserDisplay(username);
});