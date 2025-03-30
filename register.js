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
	const errorMsg = document.getElementById("signupError");

	if (password !== confirmPassword) 
	{
		errorMsg.innerText = "Passwords do not match.";
		return;
	}

	// email available
	const { user, error } = await supabase.auth.signUp(
	{
		email: email,
		password: password,
	});

	if (error) 
	{
		errorMsg.innerText = error.message;
		return;
	}
	alert("Registration successful, please check the verification letter.");
	
	// update data to database table
	const { error: insertError } = await supabase
		.from("users")
		.insert([
		{
			id: user.id,
			username: username,
			email: email,
			user_id: user.id
		}
		]);

	if (insertError) 
	{
		errorMsg.innerText = insertError.message;
		return;
	}
	
	if (user) 
	{
		await supabase.from("profiles").insert([{ id: user.id, username: username }]);
	}

	if (window.opener) 
	{
		window.close();
	} 
	else 
	{
		window.location.href = "index.html";
	}
}