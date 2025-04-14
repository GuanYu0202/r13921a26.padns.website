window.addEventListener("DOMContentLoaded", async () => 
{
	const img = document.getElementById("user-icon");
	// obtain load filename with data_filename
	const fileName = img.dataset.filename; 
	console.log("Successful read icon!");
	const { data, error } = await supabase
		.storage
		.from('usericons')
		.createSignedUrl(fileName, 900); // 15 mins
	console.log("URL: ", data.signedUrl);
	
	if (error) 
	{
		console.error("Error when loading picture: ", error.message);
	}
	else 
	{
		img.src = data.signedUrl;
	}
});