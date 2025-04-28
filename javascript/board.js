document.addEventListener("DOMContentLoaded", async function() {
	const { data: currentUser, error: userError } = await supabase.auth.getUser();

	if (userError)
	{
		alert("Please sign in to access this page.");
		return;
	}
	else
	{
		document.getElementById("send").addEventListener("click", async () => 
		{
			const content = document.getElementById("message-content").value.trim();
			
			if (!content) 
			{
				alert("Please write something!");
				return;
			}
			else if (content.length > 500) 
			{
				alert("Message must be less than 500 characters.");
				return;
			}

			const { error } = await supabase
				.from("messages")
				.insert
				([{ 
					user: currentUser.id,
					message: content,
				}]);
			
			if (error)
			{		
				alert("Error when uploading message：" + error.message);
				return;
			}

			const statusDiv = document.getElementById("send-status");
			statusDiv.innerText = "Successfully sent!";
			
			document.getElementById("message-content").value = "";
		});

		document.getElementById("refresh").addEventListener("click", async () => 
		{
			if (currentUser.id)
			{
				const msgDiv = document.getElementById("messages");
				msgDiv.innerHTML = "";

				const { data: messages, error } = await supabase
					.from("messages")
					.select("*")
					.order("created_at", { ascending: false });

				if (error) 
				{
					console.error("Error when loading message: ", error);
					return;
				}

				for (const msg of messages) 
				{
					const { data: userData, error: userError } = await supabase
						.from("profiles")
						.select("username")
						.eq("id", msg.user)
						.single();
					
					const { data: iconData } = await supabase.storage
						.from("usericons")
						.createSignedUrl(`${msg.user}.jpg`, 600);
					
					const iconUrl = iconData?.signedUrl || "default.jpg";
					
					let html = `
						<div class="message-row" style="display: flex; align-items: flex-start; margin-bottom: 16px;">
							<img class="user-icon" src="${iconUrl}" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 12px;" />
							
							<div class="message-content" style="flex: 1;">
								<div style="font-weight: bold; color: #ffffff; font-size: 20px;">${userData.username}</div>
								<div style="color: #ffffff; font-size: 16px;">${escapeHTML(msg.message)}</div>
								<div class="message-time" style="color: #ffffff; font-size: 14px;">${new Date(msg.created_at).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>`;

					if (msg.user === currentUser.user.id) 
					{
						html += `<button style="width: 120px; height: 35px;" onclick="deleteMessage(${msg.id})" style="margin-top: 5px;">Delete Message</button>`;
					}

					html += `</div></div>`;
					msgDiv.innerHTML += html;
				}
			}
			else
			{
				alert("Please sign in to access this page");
			}
		});

		async function deleteMessage(id) 
		{
			if (!confirm("Are you sure to delete this message?")) 
			{
				return;
			}
			
			const { error } = await supabase
				.from("messages")
				.delete()
				.match({ id: id, user: currentUser.id })
			
			if (error) 
			{	
				alert("Delete failed!");
				return;
			}
			
			alert("Delete successful!");
			document.getElementById("refresh").click();
		}

		function escapeHTML(str) 
		{
			const div = document.createElement("div");
			div.innerText = str;
			return div.innerHTML;
		}
	}
});