async function updateViewCount() 
{
	const { data, error: countError } = await supabase
		.from("view")
		.select("count")

	if (countError) 
	{
		console.error("Error when obtain view count：", countError);
		return;
	}

	// check "count" exists in table "visitor"
	let view_cnt = data.count;
	view_cnt++;

	// update count
	const { error: updateError } = await supabase
		.from("view")
		.update({ count: view_cnt })

	if (updateError) 
	{
		console.error("Error when update view count：", countError);
		return;
	}

	// update new number in page
	document.getElementById("view_cnt").innerText = view_cnt;
}
