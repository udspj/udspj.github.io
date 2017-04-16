function mangaListView() {
    this.init();
}

mangaListView.prototype = {
    init: function() {
        var x, m, touchx, touchm;
        document.getElementById('buttonscontainer').style.left = "200px";
        document.getElementById('buttonscontainer').style.width = String(MangaList.length * 150) + "px";
        document.getElementById('mangaimg').src = MangaList[0]["url"];
        document.getElementById('buttonscontainer').style.left = "200px";
        for (var i = 0; i < MangaList.length; i++) {
            var para = document.createElement("div");
            // para.style.left = String(i * 100)+"px";
            para.style.top = "0px";
            para.style.width = "130px";
            para.style.height = "130px";
            para.style.background = "#ffffff";
            para.style.float = "left";
            para.style.margin = "10px";
            para.id = MangaList[i]["url"];
            para.innerHTML = MangaList[i]["title"];
            para.align = "center";
            para.onclick = function() {
                var imgcon = document.getElementById("mangaimg");
                imgcon.src = this.id;
                document.getElementById('imgdiv').scroll(0, 0);
            };


            para.addEventListener("touchend", function(e) {
                var imgcon = document.getElementById("mangaimg");
                imgcon.src = this.id;
                document.getElementById('imgdiv').scroll(0, 0);
            })


            var paraimg = document.createElement("img");
            paraimg.src = "manga/defaultimg.jpg";
            paraimg.ondragstart = function() {
                return false;
            };
            para.appendChild(paraimg);

            var div = document.getElementById("buttonscontainer");
            div.appendChild(para);
        }
        var isopenlist = true;
        imgbtn.onclick = function() {
            var btncontainer = document.getElementById("buttonscontainer");
            btncontainer.hidden = isopenlist;
            var btnbk = document.getElementById("imageselector");
            if (isopenlist) {
                btnbk.style.width = "200px";
            } else {
                btnbk.style.width = "100%";
            }
            isopenlist = !isopenlist;
        };

        var imgcon = document.getElementById("mangaimg");
        imgcon.onload = function() {}

        this.events();
    },
    events: function() {
        document.getElementById("imgbtn").ondragstart = function() {
            return false
        };
        document.getElementById('buttonscontainer').onselectstart = function() {
            return false
        };
        document.getElementById('buttonscontainer').onmousedown = function(e) {
            e = e || window.event;
            e.which = e.which || e.button;
            e.pageX = e.pageX || e.x;
            if (e.which == 1) {
                m = true;
                x = e.pageX - parseInt(this.offsetLeft);
            }
        }

        document.onmousemove = function(e) {
            e = e || window.event;
            e.which = e.which || e.button;
            e.pageX = e.pageX || e.x;
            if (m) {
                document.getElementById('buttonscontainer').style.left = e.pageX - x + 'px';
                if (parseInt(document.getElementById('buttonscontainer').style.left) > parseInt(200)) {
                    document.getElementById('buttonscontainer').style.left = "200px";
                }
                if (parseInt(document.getElementById('buttonscontainer').style.left) < parseInt(document.body.clientWidth - MangaList.length * 150 - 10)) {
                    document.getElementById('buttonscontainer').style.left = String(document.body.clientWidth - MangaList.length * 150 - 10) + "px";
                }
            }
        }
        document.onmouseup = function() { m = false; }



        var btncon = document.getElementById("buttonscontainer");
        btncon.addEventListener("touchstart", function(e) {
            var e = e || window.event;
            e.preventDefault();
            touchx = e.touches[0].clientX - parseInt(this.offsetLeft);
            touchm = true;
        })
        btncon.addEventListener("touchmove", function(e) {
            var e = e || window.event;
            e.preventDefault();
            document.getElementById('buttonscontainer').style.left = e.touches[0].clientX - touchx + 'px';
            if (parseInt(document.getElementById('buttonscontainer').style.left) > parseInt(200)) {
                document.getElementById('buttonscontainer').style.left = "200px";
            }
            if (parseInt(document.getElementById('buttonscontainer').style.left) < parseInt(document.body.clientWidth - MangaList.length * 150 - 10)) {
                document.getElementById('buttonscontainer').style.left = String(document.body.clientWidth - MangaList.length * 150 - 10) + "px";
            }
        })
        btncon.addEventListener("touchend", function(e) {
            touchm = false;
        })

    }
}

new mangaListView();
