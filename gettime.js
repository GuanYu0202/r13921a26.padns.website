function showTime() {
    let now = new Date();
    now.setHours(now.getHours()+8); // UTC+8 (Taipei)
    document.getElementById('currentTime').innerHTML = now.toISOString().replace('T', ' ').substring(0, 19);
}

showTime();
setInterval(showTime, 1000);
