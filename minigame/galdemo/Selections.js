function SelectionBranch() {
    // this.selects = selects;
}
SelectionBranch.prototype.showSelections = function(selects) {
    self.selectdiv = document.createElement("div");
    selectdiv.style.backgroundColor = "rgba(0,0,0,0.5)";
    selectdiv.style.width = "100%";
    selectdiv.style.height = "100%";
    selectdiv.style.position = "fixed";
    selectdiv.style.textAlign = "center";
    // selectdiv.style.verticalAlign = "middle";
    document.body.appendChild(self.selectdiv);

    var selectcount = selects.length;

    var selectcontainer = document.createElement("div");
    selectcontainer.style.backgroundColor = "#ccff00";
    selectcontainer.style.width = "50%";
    selectcontainer.style.height = String(selectcount * 15) + "%";
    selectcontainer.style.margin = String(10 / (selectcount - 1)) + "% 0% 0% 0%";
    selectcontainer.style.display = "inline-block";
    self.selectdiv.appendChild(selectcontainer);

    for (var i = 0; i < selectcount; i++) {
        var select = document.createElement("div");
        select.style.backgroundColor = "rgba(0,0,0,0.5)";
        select.style.border = "2px solid rgba(255,255,255,0.45)";
        select.style.width = "100%";
        select.style.height = String(100 / selectcount - 10 / (selectcount - 1)) + "%";
        select.style.marginBottom = String(10 / (selectcount - 1)) + "%";
        select.style.lineHeight = "60px";
        select.style.textAlign = "center";
        select.style.color = "white";
        select.style.fontSize = "16px";
        select.id = selects[i]["toindex"];
        select.innerHTML = selects[i]["choice"];
        selectcontainer.appendChild(select);
        select.onclick = function() {
            console.log(this.id);
            document.body.removeChild(self.selectdiv);
            var selectEvent = new CustomEvent('onSelectClick', { detail: this.id });
            window.dispatchEvent(selectEvent);
        }
    }
}
