const supabase = window.supabase.createClient(
	"https://egrpteffoyaajqxgaepx.supabase.co", 
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncnB0ZWZmb3lhYWpxeGdhZXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjExMzcsImV4cCI6MjA1ODczNzEzN30.uYSZ-yINbOVQMqHY4FXswSCPRMvSAFTbiwhWHFdQ6jc"
)

async function signin() 
{
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
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
	closeSigninModal();closeSignupWindow()
	location.reload();
}