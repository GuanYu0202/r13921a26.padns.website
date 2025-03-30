const supabase = window.supabase.createClient(
	"https://egrpteffoyaajqxgaepx.supabase.co", 
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncnB0ZWZmb3lhYWpxeGdhZXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjExMzcsImV4cCI6MjA1ODczNzEzN30.uYSZ-yINbOVQMqHY4FXswSCPRMvSAFTbiwhWHFdQ6jc"
)

async function verifyEmail() 
{
	const { data: { user }, error } = await supabase.auth.getUser();

	if (error || !user) 
	{
		document.getElementById("message").innerText = "Error fetching user data.";
		document.getElementById("message").classList.add("error");
		return;
	}

	document.getElementById("passwordForm").style.display = "block";
	document.getElementById("message").innerText = "Email verified! Please set your password.";
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
	const { data, error: signUpError } = await supabase.auth.signUp(
	{
		email: email,
		password: password
	});

	if (signUpError) 
	{
		alert("Error signing up: " + signUpError.message);
		return;
	}

	// is user ok?
	const user = data.user;
	if (!user) 
	{
		alert("Error: User not found after signup.");
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
