window.addEventListener("DOMContentLoaded", async () => 
{
	const img = document.getElementById("user-icon");
	// obtain load filename with data_filename
	const fileName = img.dataset.filename; 
	
	alert(`icon name: ${fileName}`);
	
	const { data, error } = await supabase
		.storage
		.from('usericons')
		.createSignedUrl(fileName, 600); // 10 mins
		
	alert(`URL: ${data.signedUrl}`);
	
	if (error) 
	{
		console.error("Error when loading picture: ", error.message);
		alert("Error when loading picture");
	}
	else 
	{
		img.src = data.signedUrl;
	}
});