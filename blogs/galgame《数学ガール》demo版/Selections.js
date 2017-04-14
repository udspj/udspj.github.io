function SelectionBranch() {
    this.startDetectHeightChange;
    this.docheight;

    self.selectdiv = document.createElement("div");
    selectdiv.style.backgroundColor = "rgba(0,0,0,0.5)";
    selectdiv.style.width = "100%";
    selectdiv.style.height = "100%";
    selectdiv.style.position = "fixed";
    selectdiv.style.textAlign = "center";
    document.body.appendChild(self.selectdiv);

    self.selectdiv.style.display = "none";
}
SelectionBranch.prototype.showSelections = function(selects) {
    var obj = this;

    self.selectdiv.style.display = "";

    var selectcount = selects.length;

    var selectcontainer = document.createElement("div");
    selectcontainer.style.width = "50%";
    selectcontainer.style.height = String(selectcount * 15) + "%";
    selectcontainer.style.margin = String(10 / (selectcount - 1)) + "% 0% 0% 0%";
    selectcontainer.style.display = "inline-block";
    self.selectdiv.appendChild(selectcontainer);
    obj.docheight = document.body.clientHeight;

    for (var i = 0; i < selectcount; i++) {
        var select = document.createElement("div");
        select.style.backgroundColor = "rgba(0,0,0,0.5)";
        select.style.border = "2px solid rgba(255,255,255,0.45)";
        select.style.width = "100%";
        select.style.height = String(100 / selectcount - 10 / (selectcount - 1)) + "%";
        select.style.marginBottom = String(10 / (selectcount - 1)) + "%";
        var hei = document.body.clientHeight * parseInt(selectcontainer.style.height.replace("%", "")) / 100 * parseInt(select.style.height.replace("%", "")) / 100;
        select.style.lineHeight = String(hei) + "px";
        select.style.textAlign = "center";
        select.style.color = "white";
        select.style.fontSize = "15px";
        select.id = selects[i]["toindex"];
        select.innerHTML = selects[i]["choice"];
        selectcontainer.appendChild(select);
        select.onclick = function() {
            console.log(this.id);
            // document.body.removeChild(self.selectdiv);
            self.selectdiv.removeChild(selectcontainer);
            self.selectdiv.style.display = "none";
            var selectEvent = new CustomEvent('onSelectClick', { detail: this.id });
            window.dispatchEvent(selectEvent);
            clearInterval(obj.startDetectHeightChange);
        }
    }

    obj.startDetectHeightChange = setInterval(DetectHeightChange, 20);

    function DetectHeightChange() {
        if (obj.docheight == document.body.clientHeight) {
            return
        }
        var hei = document.body.clientHeight * parseInt(selectcontainer.style.height.replace("%", "")) / 100 * parseInt(select.style.height.replace("%", "")) / 100;
        obj.docheight = document.body.clientHeight;
        for (var i = 0; i < selectcontainer.childNodes.length; ++i) {
            selectcontainer.childNodes[i].style.lineHeight = String(hei) + "px";
        }
    }
}
