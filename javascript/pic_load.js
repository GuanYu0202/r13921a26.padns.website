// Part 2: visitor counter (update to supabase)
document.addEventListener("DOMContentLoaded", async () => 
{
	let { data, error: countError } = await supabase
		.from("visitor")
		.select("count")
		.single();

	if (countError) 
	{
		console.error("Error when obtain visitor count：", error);
		return;
	}

	// check "count" exists in table "visitor"
	let visitor_cnt = data?.count || 0;
	visitor_cnt++;

	// update count
	const { error: updateError } = await supabase
		.from("visitor")
		.update({ count: visitor_cnt })
		.eq("id", 1);

	if (updateError) 
	{
		console.error("Error when update visitor count：", updateError);
		return;
	}

	// show a new number in pages
	document.getElementById("visitor_cnt").innerText = visitor_cnt;
});
