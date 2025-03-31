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
	userList.innerHTML = "";

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
			li.textContent = user.username;
			userList.appendChild(li);
		});
	} 
	else 
	{
		userList.innerHTML = "<li>None of user exists.</li>";
	}
}

document.addEventListener("DOMContentLoaded", () => 
{
	if (document.getElementById("user-list")) 
	{
		fetchUsers();
	}
});