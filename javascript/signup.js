async function signup() 
{
	const username = document.getElementById("signupUsername").value;
	const email = document.getElementById("signupEmail").value;
	const password = document.getElementById("signupPassword").value;
	const confirmPassword = document.getElementById("signupConfirmPassword").value;
	const errorMsg = document.getElementById("signUpError");

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
	
	// is email available?
	 const { data: existingUser, error: checkError } = await supabase
		.from("users")
		.select("email")
		.eq("email", email)
		.single();

	if (existingUser) 
	{
		errorMsg.innerText = "Email has already been registered.";
		return;
	}
	
	// no auth method (temporary)
	// update data to table
	const { data, error: updateError } = await supabase
		.from("users")
		.insert([
		{
			username: username,
			email: email,
			password: password,
		},
		]);
	
	if (updateError) 
	{
		errorMsg.innerText = updateError.message;
        console.error("Sign-up error: ", updateError);
        return;
	}

	alert("Sign up successful!");
	location.reload();
}