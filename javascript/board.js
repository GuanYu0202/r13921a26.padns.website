const username = localStorage.getItem("currentUser");

document.getElementById("send").addEventListener("click", async () => 
{
	const content = document.getElementById("message-content").value.trim();
	
	if (!content) 
	{
		return alert("Please write something!");
	}

	const { error } = await supabase
		.from("messages")
		.insert
		([{ 
			name: username,
			message: content,
		}]);
	
	if (error)
	{		
		return alert("Error when uploading message：" + error.message);
	}

	const statusDiv = document.getElementById("send-status");
	statusDiv.innerText = "Successful sent!";
	
	document.getElementById("message-content").value = "";
});

document.getElementById("refresh").addEventListener("click", async () => 
{
	if (username)
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

		alert("obtain message successful!");
		
		//document.getElementById("message-count").innerText = messages.length;

		for (const msg of messages) 
		{
			const { data: iconData } = await supabase.storage
				.from("usericons")
				.createSignedUrl(`${msg.name}.jpg`, 600);
			
			const iconUrl = iconData?.signedUrl || "default.jpg";
			
			let html = `
				<div class="message-row" style="display: flex; align-items: flex-start; margin-bottom: 16px;">
					<img class="user-icon" src="${iconUrl}" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 12px;" />
					
					<div class="message-content" style="flex: 1;">
						<div style="font-weight: bold;">${msg.name}</div>
						<div>${escapeHTML(msg.message)}</div>
						<div class="message-time" style="font-size: 12px; color: gray;">${new Date(msg.created_at).toLocaleString()}</div>`;

			if (msg.name === username) {
				html += `<button onclick="deleteMessage(${msg.id})" style="margin-top: 5px;">Delete Message</button>`;
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
	if (!confirm("確認刪除留言？")) 
	{
		return;
	}
	
	const { error } = await supabase
		.from("messages")
		.delete()
		.eq("id", id);
	
	if (error) 
	{	
		alert("Delete failed!");
	}
	
	alert("Please refresh messages again!");
}

function escapeHTML(str) 
{
	const div = document.createElement("div");
	div.innerText = str;
	return div.innerHTML;
}

/*
// Part 1: message board (update to supabase)
// boardcastchannel to implement the instant message board
const board = new BroadcastChannel("chat_channel");

// eavesdrop message event
board.onmessage = (event) => 
{displayMessage(event.data.name, event.data.message, event.data.create_at);};

// func of adding message 
function addMessage() 
{
	// enter name&message
    const name = document.getElementById("name_input").value.trim();
    const message = document.getElementById("message_input").value.trim();
	const create_at = new Date().toISOString(); // obtain current timestamp
	
	let now = new Date();
    let options = {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Taipei'};
    return new Intl.DateTimeFormat('zh-TW', options).format(now);
	
	// check all data is ready on!
    if (!name || !message) return alert("Please enter your name and message!");
	
	// update message to table
	const { error: messageError } = await supabase
		.from("msg_b")
		.insert([
		{
			name: name,
			message: message,
			create_at: create_at, 
		},
		]);
	
	if (messageError) 
	{
        console.error("Error when  message:", error);
        return alert("Failed to send message!");
    }
	
	// post the message to all opening pages
    board.postMessage({ name, message, create_at });
	
	// clear message frame, but reserve user frame for testing login user
    document.getElementById("message_input").value = "";
}

// func of showing message
function displayMessage(name, message, create_at) 
{
	// create <p> to place the message and derive time
    const msg_emt = document.createElement("p");
	
	// post the message to <div> board
	const currentTime = getFormattedTime();
	msg_emt.style.color = "black";
    msg_emt.classList.add("message");
    msg_emt.innerHTML = `<em>${name}:</em><b>${message}</b>          <span class="time">${msg_time}</span>`; // Italic 
    document.querySelector(".board").appendChild(msg_emt);
}
*/