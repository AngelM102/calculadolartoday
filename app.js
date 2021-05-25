

// Al cargar el documneto se activa la API
document.addEventListener('DOMContentLoaded', () => {
	dolartoday()
})


// API FETCH de DOLARTODAY
const dolartoday = async () => {
	try {
		res = await fetch('https://s3.amazonaws.com/dolartoday/data.json');
		data = await res.json()

		// Objeto TASA para facilitar la obtención de los datos
		const tasa = {
			dolar: data.USD.dolartoday,
			euro: data.EUR.dolartoday
		}


		// Llama a la función de pintar la Tasa del Dolar usando el objeto TASA
		printTasas(tasa)
		calculadora(tasa)

	} 
	// Ante posible error lo pinta en la consola
	catch(error) {
		console.log(error)
	}

}

// Función que imprime la tasa del día 
const printTasas = (tasa) => {
	const containerDelAviso = document.querySelector('.aviso')
	const fragment = document.createDocumentFragment()
	const template = document.getElementById('tasaDelDia').content
	const clone = template.cloneNode(true)

	clone.querySelector('.alert-success').innerHTML = `<i class="fas fa-search-dollar"></i> Hoy el DOLAR está en <span>${tasa.dolar.toLocaleString("es")} </span><i class="fas fa-coins">`

	fragment.appendChild(clone)
	containerDelAviso.appendChild(fragment)
}

// *********************** //
// ***** Calculadora ***** //
// *********************** //

const calculadora = (tasa) => {
	const cantidadDolares = document.querySelector('.form-control')
	const btn = document.querySelector('.btn-primary')
	const resultadoBs = document.querySelector('h3')
	

	btn.addEventListener('click' , () => {
		const resultado = cantidadDolares.value * tasa.dolar

		resultadoBs.innerHTML = `${resultado.toLocaleString("es")}Bs. <i class="fas fa-coins"></i>`
	})

	cantidadDolares.addEventListener("keyup", function(event) {
		
		if (event.keyCode === 13) {
			document.querySelector(".btn-primary").click()
		}
	})
}