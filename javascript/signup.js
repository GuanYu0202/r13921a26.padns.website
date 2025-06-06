async function signup() 
{
	const username = document.getElementById("signupUsername").value;
	const email = document.getElementById("signupEmail").value;
	const password = document.getElementById("signupPassword").value;
	const confirmPassword = document.getElementById("signupConfirmPassword").value;
	const errorMsg = document.getElementById("signupError");

	if (!username || !email) 
	{
		errorMsg.innerText = "Username and email cannot be empty.";
		return;
	}
	
	if (!password || !confirmPassword) 
	{
		errorMsg.innerText = "Password cannot be empty.";
		return;
	}
	
	if (password !== confirmPassword) 
	{
		errorMsg.innerText = "Passwords do not match.";
		return;
	}
	
	// auth method
	const { data: signupData, error: checkError } = await supabase
        .auth
        .signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username
                }
            }
        });
	
	if (checkError) 
	{
		errorMsg.innerText = "Sign up error! Please check your email format and password format, or the email has been registered!";
        return;
	}
	
	const userId = signupData.user?.id;
	if (userId) 
	{
		const { error: profileError } = await supabase
			.from("profiles")
			.insert
			([
				{ id: userId, username: username }
			]);

		if (profileError) 
		{
			console.error("Error inserting profile:", profileError);
			errorMsg.innerText = "Sign up failed at profile creation. Please contact admin.";
			return;
		}
	}

	alert("Sign up successful!");
	loadPage("main");
}