const supabase = window.supabase.createClient(
	"https://egrpteffoyaajqxgaepx.supabase.co", 
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncnB0ZWZmb3lhYWpxeGdhZXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjExMzcsImV4cCI6MjA1ODczNzEzN30.uYSZ-yINbOVQMqHY4FXswSCPRMvSAFTbiwhWHFdQ6jc"
)

async function fetchUsers() 
{
	const userList = document.getElementById("user-list");
	if (!userList)
	{
		return;
	}

	// create user data container
	userList.innerHTML = "<li>Loading...</li>";

	try
	{
		const { data, error } = await supabase
			.from("users")
			.select("username");

		if (error) 
		{
			console.error("Get user error:", error);
			userList.innerHTML = "<li style='color: red;'>Cannot get user data.</li>";
			return;
		}

		if (data.length > 0) 
		{
			data.forEach(user => 
			{
				const li = document.createElement("li");
				li.textContent = "User: " + user.username;
				userList.appendChild(li);
			});
		} 
		else 
		{
			userList.innerHTML = "<li>None of user exists.</li>";
		}
	}
}

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