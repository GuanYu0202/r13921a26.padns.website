async function signin() 
{
	const email = document.getElementById("signinEmail").value;
	const password = document.getElementById("signinPassword").value;
	const errorMsg = document.getElementById("signInError");

	const { data: existedUser, error: checkError } = await supabase
		.from("users")
		.select("*")
		.eq("email", email)
		.single();

	if (checkError || !existedUser) 
	{
		errorMsg.innerText = "Email not found!";
		return;
	}

	if (!email || !password) 
	{
		errorMsg.innerText = "User email and password cannot be empty.";
		return;
	}
	
	if (existedUser.password !== password) 
	{
		errorMsg.innerText = "Password incorrect!";
		return;
	}
	
	alert("Sign in successful!");
	localStorage.setItem("currentUser", existedUser.username);
	location.reload();
}