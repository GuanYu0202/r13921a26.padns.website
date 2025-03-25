function showTime() 
{
    let now = new Date();
    let options = {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Taipei'};
    let formattedTime = new Intl.DateTimeFormat('zh-TW', options).format(now);
    document.querySelector('.currentTime').innerHTML = formattedTime;
}

// for board.js
function getFormattedTime() 
{
    let now = new Date();
    let options = {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Taipei'};
    return new Intl.DateTimeFormat('zh-TW', options).format(now);
}

showTime();
setInterval(showTime, 1000);
