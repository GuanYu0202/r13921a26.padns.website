const supabase = window.supabase.createClient(
	"https://egrpteffoyaajqxgaepx.supabase.co", 
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncnB0ZWZmb3lhYWpxeGdhZXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjExMzcsImV4cCI6MjA1ODczNzEzN30.uYSZ-yINbOVQMqHY4FXswSCPRMvSAFTbiwhWHFdQ6jc"
)

async function register() 
{
	const username = document.getElementById("username").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const confirmPassword = document.getElementById("confirmPassword").value;
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

	alert("Registration successful! This is a testing Sign Up function.");
	
	if (window.opener) 
	{
		window.close();
	} 
	else 
	{
		window.location.href = "../index.html";
	}
}