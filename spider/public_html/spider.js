function pentagone()
{
    let canvas = document.getElementById("pointeur");
    let context = canvas.getContext("2d");
    // dessiner un pentagone regulier
    let numberOfSides = 5,
            size = 200,
            Xcenter = 205,
            Ycenter = 205;

    context.beginPath( );
    context.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));
    // TODO tableau des coordonnées des normes
    //      norm_x[i] et norm_y[i]
    //      calculé avec une boucle et les cos et sin ci-dessous
    // TODO tableau des coefficients du patient : à la main (a,b,c,d,e)
    // TODO tableau des coordonnées cibles du patient
    //      target_x[i] et target_y[i]
    //      faire une boucle avec la formule
    // TODO dessiner le pentagone des normes + le polygone du patient
    for(let i = 1; i <= numberOfSides; i += 1)  {
        context.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
    }

    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.stroke();
    }

window.onload = pentagone;

