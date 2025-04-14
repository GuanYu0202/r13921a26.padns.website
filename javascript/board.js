const username = localStorage.getItem("currentUser");

document.addEventListener("DOMContentLoaded", async () => 
{
	await loadMessages();

	document.getElementById("message-form").addEventListener("submit", async (e) => 
	{
		e.preventDefault();

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

		document.getElementById("message-content").value = "";
		await loadMessages();
	});
});

async function loadMessages() 
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

	document.getElementById("message-count").innerText = messages.length;

	for (const msg of messages) 
	{
		const { data: iconData } = await supabase.storage
			.from("usericons")
			.createSignedUrl(`${msg.username}.jpg`, 600);
		
		const iconUrl = iconData?.signedUrl || "default.png";

		let html = 
		`
		  <div class="message">
			<img class="user-icon" src="${iconUrl}" />
			<div class="message-content">
			  <strong>${msg.username}</strong><br/>${escapeHTML(msg.content)}
			  <div class="message-time">${new Date(msg.created_at).toLocaleString()}</div>`;

		if (msg.image_path) 
		{
			const { data: imgUrl } = await supabase.storage
				.from("usericons")
				.createSignedUrl(msg.image_path, 600);
				
			html += `<img class="message-img" src="${imgUrl.signedUrl}" />`;
		}

		if (msg.username === username) 
		{
			html += `<div class="delete-btn" onclick="deleteMessage(${msg.id})">Delete Message</div>`;
		}

		html += `</div></div>`;
		msgDiv.innerHTML += html;
	}
}

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
	await loadMessages();
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