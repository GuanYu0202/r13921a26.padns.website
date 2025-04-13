// Part 2: visitor counter (update to supabase)
async function updateViewCount() 
{
	let { data, error: countError } = await supabase
		.from("view")
		.select("count")
		.eq("id", 1)
		.single();

	if (countError) 
	{
		console.error("Error when obtain view count：", error);
		return;
	}

	// check "count" exists in table "visitor"
	let view_cnt = data?.count || 0;
	view_cnt++;

	// update count
	const { error: updateError } = await supabase
		.from("view")
		.update({ count: view_cnt })
		.eq("id", 1);

	if (updateError) 
	{
		console.error("Error when update view count：", updateError);
		return;
	}

	// update new number in page
	document.getElementById("view_cnt").innerText = view_cnt;
}
