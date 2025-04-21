async function signin() 
{
	const email = document.getElementById("signinEmail").value;
	const password = document.getElementById("signinPassword").value;
	const errorMsg = document.getElementById("signinError");

	if (!email || !password) 
	{
		errorMsg.innerText = "User email and password cannot be empty.";
		return;
	}
	
	// auth method
	const { data, error: checkError } = await supabase
		.auth
		.signInWithPassword
		({
			email: email,
			password: password,
		});
	
	if (checkError) 
	{
		errorMsg.innerText = "Sign in error! Please retry!";
		return;
	}
	
	const sessionCheck = await supabase.auth.getSession();
	if (!sessionCheck.data.session) 
	{
		alert("Session lost! Please sign in again.");
		return;
	}
	
	alert("Sign in successful!");
	loadPage("main");
}