document.getElementById("upload-btn").addEventListener("click", async () => 
{
	const fileInput = document.getElementById("icon-input");
	const file = fileInput.files[0];
	const statusDiv = document.getElementById("upload-status");
	
	const { data, error: authError } = await supabase.auth.getUser();
	
	if (authError || !data) 
	{
        alert("Please sign in to access this page.");
        return;
    }
	
	if (!file) 
	{
		alert("Choose one picture to upload!");
		return;
	}

	const fileExt = file.name.split('.').pop();
	const userId = data.id;
	const fileName = `${userId}.jpg`;
	const { error } = await supabase
		.storage
		.from("usericons")
		.upload(fileName, file, 
		{
			upsert: true,
			contentType: file.type
		});
	
	if (error) 
	{
		statusDiv.textContent = "Error when uploading: " + error.message;
	}
	else 
	{
		statusDiv.textContent = "Successful uploaded!";
		const { data: signedUrlData } = await supabase
			.storage
			.from("usericons")
			.createSignedUrl(fileName, 600);
		
		document.getElementById("preview").style.display = "block";
		document.getElementById("icon-preview").src = signedUrlData.signedUrl;
	}
});