function pentagone()
{
    let canvas = document.getElementById("pointeur");
    let context = canvas.getContext("2d");

    let numberOfSides = 5;
    let size = 200;
    let Xcenter = 205;
    let Ycenter = 205;

    // Compute norm coordinates
    let norm_x = [];
    let norm_y = [];
    for (let i = 0; i <= numberOfSides; i += 1) {
        norm_x[i] = Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides);
        norm_y[i] = Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides);
    }

    // TODO DEFINIR LE TABLEAU DES COEFFICIENTS a,b,c,d,e

    // TODO CALCULER LES COORDONNÉES DU PATIENT DANS UNE BOUCLE
    //      target_x[i] , target_y[i]
    //      UTILISER LA FORMULE
    //      xa - xO = k * (xA - xO)
    //      ya - yO = k * (yA - yO)

    // Draw pentagon of norms
    context.beginPath();
    context.moveTo(norm_x[0], norm_y[0]);
    for (let i = 1; i <= numberOfSides; i += 1) {
        context.lineTo(norm_x[i], norm_y[i]);
    }
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.stroke();

    // TODO DESSINER LE PENTAGONE DU PATIENT

    // Draw center
    context.beginPath();
    context.fillStyle = "black";
    context.arc(Xcenter, Ycenter, 2, 0, 2 * Math.PI);
    context.fill();
}

window.onload = pentagone;
