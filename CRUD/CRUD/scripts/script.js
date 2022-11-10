const url = "https://6369965d15219b84961ac878.mockapi.io/users/";
const btnBuscar = document.querySelector("#btnGet1");
const inputBuscar = document.querySelector("#inputGet1Id");
const resultsBox = document.querySelector("#results");

const btnAgregar = document.querySelector("#btnPost");
const inpNombre = document.querySelector("#inputPostNombre");
const inpApellido = document.querySelector("#inputPostApellido");

const inpModificar = document.querySelector("#inputPutId");
const btnModificar = document.querySelector("#btnPut");
const btnGuardarCambios = document.querySelector("#btnSendChanges");
const inpPutNombre = document.querySelector("#inputPutNombre");
const inpPutApellido = document.querySelector("#inputPutApellido");

const inpEliminar = document.querySelector("#inputDelete");
const btnEliminar = document.querySelector("#btnDelete");

const alertaError = document.querySelector("#alert-error");

const myModal = new bootstrap.Modal(document.getElementById("dataModal"), {
  keyboard: false,
});

function traerID(url, id) {
  return traerURL(url + id);
}

async function traerURL(url) {
  const listado = await fetch(url);
  if (listado.ok === true) {
    document.querySelector("#alert-error").classList.remove("show");
    return listado.json();
  } else {
    document.querySelector("#alert-error").classList.add("show");
  }
}

async function getData(url = "", data = {}, method) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  if (response.ok === true) {
    document.querySelector("#alert-error").classList.remove("show");
    return response.json(); // parses JSON response into native JavaScript objects
  } else {
    document.querySelector("#alert-error").classList.add("show");
  }
}

function agregarUsuario(objeto) {
  return `<li>
    <div class="user">
        <h5>ID: <span>${objeto.id}</span></h5>
        <h5>NAME: <span>${objeto.name}</span></h5>
        <h5>LASTNAME: <span>${objeto.lastname}</span></h5>
    </div>
  </li>`;
}

function mostrarTodos(array) {
  htmlToAppend = "";
  array.forEach((element) => {
    htmlToAppend += agregarUsuario(element);
  });
  resultsBox.innerHTML = htmlToAppend;
}

/* Botones */

btnBuscar.onclick = () => {
  if (inputBuscar.value !== "") {
    traerID(url, inputBuscar.value).then((res) => {
      resultsBox.innerHTML = agregarUsuario(res);
    });
  } else {
    traerURL(url).then((res) => {
      mostrarTodos(res);
    });
  }
};

btnAgregar.onclick = () => {
  getData(url, { name: inpNombre.value, lastname: inpApellido.value }, "POST").then(() => {
    traerURL(url).then((res) => {
      mostrarTodos(res);
    });
  });
};

btnModificar.onclick = () => {
  traerID(url, inpModificar.value).then((res) => {
    console.log(res);
    if (res !== undefined) {
      myModal.toggle();
      inpPutNombre.value = res.name;
      inpPutApellido.value = res.lastname;
    }
  });
};

btnGuardarCambios.onclick = () => {
  getData(
    url + inpModificar.value,
    { name: inpPutNombre.value, lastname: inpPutApellido.value },
    "PUT"
  ).then(() => {
    traerURL(url).then((res) => {
      mostrarTodos(res);
      myModal.toggle();
    });
  });
};

btnEliminar.onclick = () => {
  getData(url + inpEliminar.value, {}, "DELETE").then((data) => {
    if (data !== undefined) {
      traerURL(url).then((res) => {
        mostrarTodos(res);
      });
    }
  });
};

/* ---------------------------------------------------- */

/* Habilitar botones */

inpNombre.onchange = () => {
  if (inpNombre.value !== "") {
    btnAgregar.removeAttribute("disabled");
  } else {
    btnAgregar.setAttribute("disabled", "");
  }
};

inpApellido.onchange = () => {
  if (inpApellido.value !== "") {
    btnAgregar.removeAttribute("disabled");
  } else {
    btnAgregar.setAttribute("disabled", "");
  }
};

inpModificar.onchange = () => {
  if (inpModificar.value !== "") {
    btnModificar.removeAttribute("disabled");
  } else {
    btnModificar.setAttribute("disabled", "");
  }
};

inpPutNombre.onchange = () => {
  if (inpPutNombre.value !== "") {
    btnGuardarCambios.removeAttribute("disabled");
  } else {
    btnGuardarCambios.setAttribute("disabled", "");
  }
};

inpPutApellido.onchange = () => {
  if (inpPutApellido.value !== "") {
    btnGuardarCambios.removeAttribute("disabled");
  } else {
    btnGuardarCambios.setAttribute("disabled", "");
  }
};

inpEliminar.onchange = () => {
  if (inpEliminar.value !== "") {
    btnEliminar.removeAttribute("disabled");
  } else {
    btnEliminar.setAttribute("disabled", "");
  }
};

/* ---------------------------------------------------- */
