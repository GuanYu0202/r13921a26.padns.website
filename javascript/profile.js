document.getElementById("upload-btn").addEventListener("click", async () => 
{
	const fileInput = document.getElementById("icon-input");
	const file = fileInput.files[0];
	const username = localStorage.getItem("currentUser");

	if (!file || !username) 
	{
		alert("請選擇圖片並登入！");
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
		
		document.getElementById("icon-preview").src = data.signedUrl;
	}
});