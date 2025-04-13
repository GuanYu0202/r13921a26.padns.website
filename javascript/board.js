const supabase = window.supabase.createClient(
	"https://egrpteffoyaajqxgaepx.supabase.co", 
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncnB0ZWZmb3lhYWpxeGdhZXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjExMzcsImV4cCI6MjA1ODczNzEzN30.uYSZ-yINbOVQMqHY4FXswSCPRMvSAFTbiwhWHFdQ6jc"
)

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
