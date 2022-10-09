function DialogueText() {
    this.isTextShowed = true;
    this.startAdd;
    this.isclicked = false;
}
DialogueText.prototype.showDialogueText = function(text) {
    var obj = this;
    obj.isTextShowed = false;
    var textword = text;
    var textbox = document.getElementById("textbox");
    if (obj.isclicked) {
        textbox.innerText = textword;
        obj.isclicked = false;
        next(textword);
        return;
    }
    var textlength = 1;

    function textwordAdd() {
        document.getElementById("nexttext").style.display = "none";
        textbox.innerText = textword.substring(0, textlength);
        if (textlength <= textword.length) {
            textlength++;
        } else {
            next(textword);
        };
    }
    obj.startAdd = setInterval(textwordAdd, 20);

    function next(text) {
        clearInterval(obj.startAdd);
        obj.isTextShowed = true;
        document.getElementById("nexttext").style.display = "";

        var selectEvent = new CustomEvent('onAutoTextFinished', { detail:text });
        window.dispatchEvent(selectEvent);
    }
}
