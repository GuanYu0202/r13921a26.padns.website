function showTime() 
{
    let now = new Date();
    let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Taipei' };
    let formattedTime = new Intl.DateTimeFormat('zh-TW', options).format(now);
    document.getElementById('currentTime').innerHTML = formattedTime;
}

showTime();
setInterval(showTime, 1000);
