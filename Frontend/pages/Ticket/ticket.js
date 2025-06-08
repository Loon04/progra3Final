function iniciarTicket() {
    mostarTicket()
}

function mostarTicket() {
    const uriPDF = sessionStorage.getItem('ticketPDF');
    const contenedorPDF = document.getElementById('contenedor-pdf')

    const divPDF = document.createElement('div');
    divPDF.className = "ratio ratio-4x3 container-fluid bg-light"; 
    divPDF.style="max-width: 400px";
    divPDF.innerHTML = `<iframe src="${uriPDF}" width="100%" height=100%></iframe>`

    const btnDescargar = document.createElement('button');
    btnDescargar.className = "btn btn-primary w-20% center-text d-block mx-auto m-2";
    btnDescargar.textContent = "Descargar Ticket"
    btnDescargar.addEventListener('click',() => {
        const link = document.createElement("a");
        link.href = uriPDF;
        link.download = "ticket.pdf";
        link.click();
    });

    contenedorPDF.appendChild(btnDescargar)
    contenedorPDF.appendChild(divPDF);
}

iniciarTicket();