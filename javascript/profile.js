document.getElementById("upload-btn").addEventListener("click", async () => 
{
	const fileInput = document.getElementById("icon-input");
	const file = fileInput.files[0];
	const username = localStorage.getItem("currentUser");
	
	if (username)
	{
				if (!file || !username) 
		{
			alert("Choose one picture to upload!");
			return;
		}

		const fileExt = file.name.split('.').pop();
		const fileName = `${username}.jpg`;
		const { error } = await supabase
			.storage
			.from("usericons")
			.upload(fileName, file, 
			{
				upsert: true,
				contentType: file.type
			});

		const statusDiv = document.getElementById("upload-status");
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
	}
	else
	{
		alert("Please sign in to access this page");
	}
});