const supabase = window.supabase.createClient(
	"https://egrpteffoyaajqxgaepx.supabase.co", 
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncnB0ZWZmb3lhYWpxeGdhZXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjExMzcsImV4cCI6MjA1ODczNzEzN30.uYSZ-yINbOVQMqHY4FXswSCPRMvSAFTbiwhWHFdQ6jc"
)

async function verifyEmail() 
{
	const urlParams = new URLSearchParams(window.location.search);
	const accessToken = urlParams.get('access_token');
	const refreshToken = urlParams.get('refresh_token');
	const errorCode = urlParams.get('error_code');
	
	if (errorCode) 
	{
		document.getElementById("message").innerText = "Error: Unable to verify your email.";
		document.getElementById("message").classList.add("error");
		return;
	}

	if (accessToken && refreshToken) 
	{
		// Set session with the access and refresh tokens
		const { error } = await supabase.auth.setSession({
			access_token: accessToken,
			refresh_token: refreshToken,
		});

		if (error) 
		{
			document.getElementById("message").innerText = "Error: " + error.message;
			document.getElementById("message").classList.add("error");
		} 
		else 
		{
			document.getElementById("passwordForm").style.display = "block";
			document.getElementById("message").innerText = "Email verified! Please set your password.";
		}
	} 
	else 
	{
		document.getElementById("message").innerText = "Invalid verification link.";
		document.getElementById("message").classList.add("error");
	}
}

async function completeRegistration() 
{
	const password = document.getElementById("password").value;
	const confirmPassword = document.getElementById("confirmPassword").value;
	const username = localStorage.getItem("username");
	const email = localStorage.getItem("email");

	// is password match?
	if (!password || !confirmPassword) 
	{
		document.getElementById("passwordError").innerText = "Password fields cannot be empty!";
		return;
	}

	if (password !== confirmPassword) 
	{
		document.getElementById("passwordError").innerText = "Passwords do not match!";
		return;
	}

	// update supabase auth password
	const { error: updateError } = await supabase.auth.updateUser(
	{
		password: password
	});

	if (updateError) 
	{
		alert("Error updating password: " + signUpError.message);
		return;
	}

	// update data to table
	const { error: insertError } = await supabase
		.from("users")
		.insert([
		{
			username: username,
			email: email,
			password: password,
			user_id: user.id
		}
		]);

	if (insertError) 
	{
		alert("Error saving user data: " + insertError.message);
		return;
	}

	alert("Registration successful!");
	window.close();
}

window.onload = verifyEmail;
