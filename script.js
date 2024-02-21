function generoiQRKoodi() {
    const tyyppi = document.getElementById("tyyppi").value;
    const sisalto = document.getElementById("sisalto").value;
    const koko = parseInt(document.getElementById("koko").value);

    if (sisalto.trim() !== "") {
        const qrcodeElement = document.getElementById("qrcode");
        qrcodeElement.innerHTML = "";

        const qrKoodiArvo = getQRKoodiArvo(tyyppi, sisalto);
        const qrKoodiUrl = "https://api.qrserver.com/v1/create-qr-code/?size=" + koko + "x" + koko + "&data=" + encodeURIComponent(qrKoodiArvo);

        const img = document.createElement("img");
        img.src = qrKoodiUrl;
        qrcodeElement.appendChild(img);

        const tallennaButton = document.createElement("button");
        tallennaButton.innerText = "Tallenna kuva";
        tallennaButton.addEventListener("click", function() {
            tallennaKuva(qrKoodiUrl);
        });
        qrcodeElement.appendChild(tallennaButton);

        const merkkienMaara = sisalto.length;
        document.getElementById("merkkienMaara").innerText = "Kirjoitettuja merkkejä: " + merkkienMaara;
    } else {
        alert("Syötä teksti ennen QR-koodin generoimista.");
    }
}

document.getElementById("koko").addEventListener("input", function() {
    document.getElementById("koko-arvo").innerText = this.value;
});

function getQRKoodiArvo(tyyppi, sisalto) {
    switch (tyyppi) {
        case "teksti":
            return sisalto;
        case "url":
            return sisalto;
        case "email":
            return "mailto:" + sisalto;
        case "puhelin":
            return "tel:" + sisalto;
        default:
            return sisalto;
    }
}

function laskeMerkkienMaara() {
    const sisalto = document.getElementById("sisalto").value;
    const merkkienMaaraElement = document.getElementById("merkkienMaara");
    const merkkienMaara = sisalto.length;
    merkkienMaaraElement.innerText = "Kirjoitettuja merkkejä: " + merkkienMaara;
}

document.getElementById("sisalto").addEventListener("input", laskeMerkkienMaara);

function tallennaKuva(url) {
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-koodi.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
