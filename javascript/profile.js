document.getElementById("upload-btn").addEventListener("click", async () => 
{
	const fileInput = document.getElementById("icon-input");
	const file = fileInput.files[0];
	const statusDiv = document.getElementById("upload-status");
	
	const { data: session, error: sessionError } = await supabase.auth.getSession();
	const { data, error: authError } = await supabase.auth.getUser();
	
	if (authError || sessionError || !data) 
	{
        alert("Please sign in to access this page.");
        return;
    }
	
	if (data) 
	{
		const userId = data?.user?.id;
	}
	
	if (!file) 
	{
		alert("Choose one picture to upload!");
		return;
	}

	const fileExt = file.name.split('.').pop();
	const fileName = `${userId}.jpg`;
	const { error } = await supabase
		.storage
		.from("usericons")
		.upload(fileName, file, 
		{
			upsert: true,
			contentType: file.type
		});
		.headers
		({
			Authorization: `Bearer ${access_token}`,
		});

	
	if (error) 
	{
		statusDiv.innerText = "Error when uploading: " + error.message;
	}
	else 
	{
		statusDiv.innerText = "Successful uploaded!";
		const { data } = await supabase
			.storage
			.from("usericons")
			.createSignedUrl(fileName, 600);
		
		document.getElementById("preview").style.display = "block";
		document.getElementById("icon-preview").src = data.signedUrl;
	}
});