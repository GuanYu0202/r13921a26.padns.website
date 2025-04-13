window.addEventListener("DOMContentLoaded", async () => 
{
	const img = document.getElementById("user-icon");
	// obtain load filename with data_filename
	const fileName = img.dataset.filename; 
	const { data, error } = supabase
		.storage
		.from('usericons')
		.createSignedUrl(fileName, 900); // 15 mins

	if (error) 
	{
		console.error("Error when loading picture: ", error.message);
	}
	else 
	{
		console.log("Successful read icon!");
		console.log("URL: ", data.signedUrl);
		img.src = data.signedUrl;
	}
});