async function fetchUsers() 
{
	const userList = document.getElementById("user-list");

	// create user data container
	userList.innerHTML = "";

	try 
	{
		// change showing text
		userList.innerHTML = "<p>Loading...</p>";
		
        const { data, error } = await supabase
            .from("users")
            .select("username");

        if (error) 
		{
            console.error("Get user error:", error);
            userList.innerHTML = "<li style='color: red;'>Cannot get user data.</li>";
            return;
        }
		
		// clear showing text for incoming user names
		userList.innerHTML = "";

        if (data.length > 0) 
		{
            data.forEach(user => 
			{
                const p = document.createElement("p");
                p.textContent = user.username;
                userList.appendChild(p);
            });
        } 
		else 
		{
            userList.innerHTML = "<li>None of user exists.</li>";
        }
    } 
	catch (error) 
	{
        console.error("Error fetching users:", error);
        userList.innerHTML = "<li style='color: red;'>Error when loading users.</li>";
    }
}