window.addEventListener("DOMContentLoaded", async () => 
{
	const img = document.getElementById("msg_pic");
	// obtain load filename with data_filename
	const fileName = img.dataset.filename; 
	const { data, error } = supabase
		.storage
		.from('msgpic')
		.getPublicUrl(fileName);

	if (error) 
	{
		console.error("Error when loading picture: ", error.message);
	} 
	else 
	{
		img.src = data.publicUrl;
	}
});