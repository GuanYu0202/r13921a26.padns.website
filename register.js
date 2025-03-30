const supabase = window.supabase.createClient(
	"https://egrpteffoyaajqxgaepx.supabase.co", 
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncnB0ZWZmb3lhYWpxeGdhZXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjExMzcsImV4cCI6MjA1ODczNzEzN30.uYSZ-yINbOVQMqHY4FXswSCPRMvSAFTbiwhWHFdQ6jc"
)

async function register() 
{
	const username = document.getElementById("username").value;
	const email = document.getElementById("email").value;
	const errorMsg = document.getElementById("signupError");

	if (!username || !email) 
	{
		errorMsg.innerText = "Username and email cannot be empty.";
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
	
	// signup auth
	const { data, error: signUpError } = await supabase.auth.signUp(
	{
		email: email
	});
	
	if (signupError) 
	{
		errorMsg.innerText = error.message;
		return;
	}

	console.log("Sign-up successful, proceeding with alert.");
	
	localStorage.setItem("username", username);
	localStorage.setItem("email", email);

	alert("Almost done! Please check the verification page.");
	
	if (window.opener) 
	{
		window.close();
	} 
	else 
	{
		window.location.href = "index.html";
	}
}