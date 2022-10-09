function Characters() {

}
Characters.prototype.showCharacters = function(charas) {
    if(charas.length == 1) {
        if (!document.getElementById('character1')) {
            var charadiv = document.createElement("div");
            charadiv.setAttribute("class", "character");
            charadiv.setAttribute("id", "character1");
            var container = document.getElementById("characontainer");
            container.appendChild(charadiv);

            var expdiv = document.createElement("div");
            expdiv.setAttribute("class", "expression");
            expdiv.setAttribute("id", "expression1");
            charadiv.appendChild(expdiv);
        }
        if (document.getElementById('character2')) {
            var container = document.getElementById("characontainer");
            var chara2 = document.getElementById('character2');
            container.removeChild(chara2);
        }
        var chara1 = document.getElementById('character1');
        var exp1 = document.getElementById('expression1');
        chara1.style.backgroundImage = "url('" + charas[0]["body"] + ".png')";
        exp1.style.backgroundImage = "url('" + charas[0]["face"] + ".png')";
    }else if(charas.length == 2) {
        if (!document.getElementById('character1')) {
            var charadiv = document.createElement("div");
            charadiv.setAttribute("class", "character");
            charadiv.setAttribute("id", "character1");
            var container = document.getElementById("characontainer");
            container.appendChild(charadiv);

            var expdiv = document.createElement("div");
            expdiv.setAttribute("class", "expression");
            expdiv.setAttribute("id", "expression1");
            charadiv.appendChild(expdiv);
        }
        if (!document.getElementById('character2')) {
            var charadiv = document.createElement("div");
            charadiv.setAttribute("class", "character");
            charadiv.setAttribute("id", "character2");

            var container = document.getElementById("characontainer");
            container.appendChild(charadiv);

            var expdiv = document.createElement("div");
            expdiv.setAttribute("class", "expression");
            expdiv.setAttribute("id", "expression2");
            charadiv.appendChild(expdiv);
        }
        var chara1 = document.getElementById('character1');
        var exp1 = document.getElementById('expression1');
        var chara2 = document.getElementById('character2');
        var exp2 = document.getElementById('expression2');

        chara1.style.backgroundImage = "url('" + charas[0]["body"] + ".png')";
        chara2.style.backgroundImage = "url('" + charas[1]["body"] + ".png')";
        exp1.style.backgroundImage = "url('" + charas[0]["face"] + ".png')";
        exp2.style.backgroundImage = "url('" + charas[1]["face"] + ".png')";
    }else if(charas.length == 0) {
        if (document.getElementById('character1')) {
            var container = document.getElementById("characontainer");
            var chara1 = document.getElementById('character1');
            container.removeChild(chara1);
        }
        if (document.getElementById('character2')) {
            var container = document.getElementById("characontainer");
            var chara2 = document.getElementById('character2');
            container.removeChild(chara2);
        }
    }
}
