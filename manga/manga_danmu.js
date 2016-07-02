var responseRes;
var danmuarray = new Array();

var vx = -5;
var danmucount;
var maxscreencount = 5;
var screendanmu = new Array();
var danmuindex = 0

function showDanmus() {
    danmucount = danmuarray.length;
    createDanmus();
    runDanmus();
}

function createDanmus() {
    if (screendanmu.length < maxscreencount && danmuindex < danmucount) {
        var para = document.createElement("p");
        var danmutext = document.createTextNode(danmuarray[danmuindex]);
        para.setAttribute("class", "danmu");
        para.style.left = String(document.body.clientWidth) + "px";
        para.style.top = String(Math.ceil(Math.random() * 100)) + "px";
        para.appendChild(danmutext);
        var div = document.getElementById("danmaku");
        div.appendChild(para);
        screendanmu[screendanmu.length] = para;
        danmuindex++;
    }

    setTimeout(createDanmus, 5000)
}

function runDanmus() {
    if (screendanmu.length > 0) {
        for (var i = 0; i < screendanmu.length; i++) {
            screendanmu[i].style.left = String(parseInt(screendanmu[i].style.left) + vx) + "px"
        }

        // 此处把屏幕外弹幕remove
        if (parseInt(screendanmu[0].style.left) < -parseInt(screendanmu[0].offsetWidth)) {
            screendanmu[0].remove();
            screendanmu.splice(0, 1);
        }
    }

    setTimeout(runDanmus, 50)
}
//https://disqus.com/api/docs/posts/list/
var urlreq = new XMLHttpRequest()
urlreq.open('GET', 'https://disqus.com/api/3.0/posts/list.json?api_key=fDv3hhNLuouP8ZPpiptoPE1OPU0pq9qtohiIx2GDbSLVWaNkOB6V3X1RnZMsuINF&forum=udspj&limit=100')
var self = this
urlreq.onload = function() {
    responseRes = JSON.parse(urlreq.responseText).response;
    for (j = 0; j < responseRes.length; j++) {
        danmuarray[j] = responseRes[j].raw_message;
    }
    showDanmus();
    var title = document.getElementById("title");
    title.innerHTML = "";
}
urlreq.send()
