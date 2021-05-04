tinymce.init({
    selector: '#detalle-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });


// Carga de Ciudades
let ciudades = ['Viña del Mar', 'Quilpué', 'Santiago', 'La Serena'];
const agregar = () => {
    let select = document.querySelector('#ciudad-select');

    for (let i = 0; i < ciudades.length; i++) {
        let ciudad = document.createElement("option");
        ciudad.value = ciudades[i];
        ciudad.text = ciudades[i];
        select.appendChild(ciudad);
    }
};

agregar();



const reos = [];
const cargarTabla = () => {

  let tbody = document.querySelector("#tbody-tabla");
  tbody.innerHTML = "";

  for (let i = 0; i < reos.length; ++i) {
    let r = reos[i];
    let tr = document.createElement("tr");
    let tdNro = document.createElement("td");
    let tdNombre = document.createElement("td");
    let tdDetalle = document.createElement("td");
    let tdCiudad = document.createElement("td");
    let tdGravedad = document.createElement("td");


    tdNro.innerText = i + 1;
    tdNro.classList.add("text-center");
    tdNombre.innerText = r.nombre + ' ' + r.apellido;
    tdDetalle.innerHTML = r.detalle;
    tdCiudad.innerHTML = r.ciudad

    // Iconografía y Cálculo de Gravedad 
    let gravedad = document.createElement("i");
    if (r.crimenes <= 3) {
      //Gravedad Leve <i class="fas fa-user"></i>
      gravedad.classList.add("fas","fa-user","text-primary","fa-2x");
    } else if (r.crimenes <= 6 && r.crimenes >= 4) {
      //Gravedad Grave <i class="fas fa-user-ninja"></i>
      gravedad.classList.add("fas","fa-user-ninja","text-warning","fa-2x");
    } else if (r.crimenes <= 15 && r.crimenes >= 7) {
      //Gravedad Peligroso <i class="fas fa-user-secret"></i>
      gravedad.classList.add("fas","fa-user-secret","text-danger","fa-2x");
    } else {
      //Gravedad Enemigo Social <i class="fas fa-dizzy"></i>
      gravedad.classList.add("fas","fa-dizzy","text-dark","fa-2x");
    }
    tdGravedad.classList.add("text-center");
    tdGravedad.appendChild(gravedad);


    tr.appendChild(tdNro);
    tr.appendChild(tdNombre);
    tr.appendChild(tdDetalle);
    tr.appendChild(tdCiudad);
    tr.appendChild(tdGravedad);
    tbody.appendChild(tr);
  }
};



document.querySelector("#agregar-btn").addEventListener("click", () => {
    let nombre = document.querySelector("#nombre-txt").value;
    let apellido = document.querySelector("#apellido-txt").value;
    let crimenes = document.querySelector("#crimenes-number").value;
    let detalle = tinymce.get("detalle-txt").getContent();
    let ciudad = document.querySelector("#ciudad-select").value;

    let reo = {};

    reo.nombre = nombre;
    reo.apellido = apellido;
    reo.crimenes = crimenes;
    reo.detalle = detalle;
    reo.ciudad = ciudad;

    reos.push(reo);
    cargarTabla();
    Swal.fire("Registro Exitoso!", "Registro de criminal realizado", "info");
  });