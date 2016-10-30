function History() {
    this.texts = [];

    self.historydiv = document.createElement("div");
    historydiv.style.backgroundColor = "rgba(0,0,0,0.5)";
    historydiv.style.width = "100%";
    historydiv.style.height = "100%";
    historydiv.style.position = "fixed";
    document.body.appendChild(self.historydiv);

    self.historytext = document.createElement("p");
    historytext.style.margin = "0px 150px 0px 150px";
    historytext.style.height = "100%";
    historytext.style.color = "#fff";
    historytext.style.fontSize = "150%";
    historytext.style.overflow = "scroll";
    historydiv.appendChild(self.historytext);

    self.historydiv.style.display = "none";

    self.historydiv.onclick = function() {
        self.historydiv.style.display = "none";
    }
}
History.prototype.addHistory = function(text) {
    this.texts[this.texts.length] = text;
}
History.prototype.showHistory = function() {
    self.historydiv.style.display = "";

    var historytexts = "";
    for (var i = 0; i < this.texts.length; i++) {
        historytexts += "\n" + this.texts[i] + "\n";
    }
    historytexts += "\n";
    self.historytext.innerText = historytexts;
}
