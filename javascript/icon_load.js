window.addEventListener("DOMContentLoaded", async () => 
{
	const img = document.getElementById("user-icon");
	// obtain load filename with data_filename
	const fileName = img.dataset.filename; 
	const { data, error } = supabase
		.storage
		.from('usericons')
		.getPublicUrl(fileName);

	if (error) 
	{
		console.error("Error when loading picture: ", error.message);
	}
	else 
	{
		img.src = data.publicUrl;
		console.log("Successful read icon!");
	}
});