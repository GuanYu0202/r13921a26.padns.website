// Part 1: message board
// boardcastchannel to implement the instant message board
const board = new BroadcastChannel("chat_channel");

// eavesdrop message event
board.onmessage = (event) => 
{displayMessage(event.data.name, event.data.message);};

// func of adding message 
function addMessage() 
{
	// enter name&message
    const name = document.getElementById("name_input").value.trim();
    const message = document.getElementById("message_input").value.trim();
	
	// check all data is ready on!
    if (!name || !message) return alert("Please enter your name and message!");
	
	// post the message
    board.postMessage({ name, message });
	
	// show the message
    displayMessage(name, message);
	
	// clear the frame of message
    document.getElementById("message_input").value = "";
}

// func of showing message
function displayMessage(name, message) 
{
	// create <p> to place the message
    const msg_emt = document.createElement("p");
	
	// post the message to <div> board
    msg_emt.classList.add("message");
    msg_emt.innerHTML = `<em>${name}:</em> ${message}`; // Italic 
    document.getElementById("board").appendChild(msg_emt);
}

// Part 2: visitor counter
// utilize localStorage to store the number of visitors
let visitor_cnt = localStorage.getItem("visitorCount") || 0;
visitor_cnt++;
sessionStorage.setItem("visitorCount", visitor_cnt);

// update number
document.addEventListener("DOMContentLoaded", () => 
{document.getElementById("visitorCount").innerText = visitor_cnt;});
