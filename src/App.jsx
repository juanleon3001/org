import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
import Formulario from './componentes/Formulario/Formulario';
import Header from './componentes/Header/Header.jsx';
import MiOrg from './componentes/MiOrg';
import Equipo from './componentes/Equipo/Equipo';
import Colaborador from './componentes/Colaborador/Colaborador';
import Footer from './componentes/Footer/Footer';

function App() {
	const [mostrarFormulario, actualizarMostrar] = useState(false);
	const [colaboradores, actualizarColaboradores] = useState([
		{
			id: uuid(),
			equipo: 'Front End',
			foto: 'https://github.com/harlandlohora.png',
			nombre: 'Harland Lohora',
			puesto: 'Instructor',
			fav: true,
		},
		{
			id: uuid(),
			equipo: 'UX y Diseño',
			foto: 'https://github.com/JeanmarieAluraLatam.png',
			nombre: 'Jeanmarie Quijada',
			puesto: 'Instructora en Alura Latam',
			fav: true,
		},
		{
			id: uuid(),
			equipo: 'Programación',
			foto: 'https://github.com/christianpva.png',
			nombre: 'Christian Velasco',
			puesto: 'Head de Alura e Instructor',
			fav: false,
		},
		{
			id: uuid(),
			equipo: 'Innovación y Gestión',
			foto: 'https://github.com/JoseDarioGonzalezCha.png',
			nombre: 'Jose Gonzalez',
			puesto: 'Dev FullStack',
			fav: true,
		},
	]);

	const [equipos, actualizarEquipos] = useState([
		{
			id: uuid(),
			titulo: 'Programación',
			colorPrimario: '#57C278',
			colorSecundario: '#D9F7E9',
		},
		{
			titulo: 'Front End',
			colorPrimario: '#82CFFA',
			colorSecundario: '#E8F8FF',
		},
		{
			id: uuid(),
			titulo: 'Data Science',
			colorPrimario: '#A6D157',
			colorSecundario: '#F0F8E2',
		},
		{
			id: uuid(),
			titulo: 'Devops',
			colorPrimario: '#E06B69',
			colorSecundario: '#FDE7E8',
		},
		{
			id: uuid(),
			titulo: 'UX y Diseño',
			colorPrimario: '#DB6EBF',
			colorSecundario: '#FAE9F5',
		},
		{
			id: uuid(),
			titulo: 'Móvil',
			colorPrimario: '#FFBA05',
			colorSecundario: '#FFF5D9',
		},
		{
			id: uuid(),
			titulo: 'Innovación y Gestión',
			colorPrimario: '#FF8A29',
			colorSecundario: '#FFEEDF',
		},
	]);

	const cambiarMostrar = () => {
		actualizarMostrar(!mostrarFormulario);
	};

	//Resitrar Colaborador
	const registrarColaborador = (colaborador) => {
		console.log('Nuevo Colaborador', colaborador);
		//Spread operator
		actualizarColaboradores([...colaboradores, colaborador]);
	};

	//Eliminar colaborador
	const eliminarColaborador = (id) => {
		console.log('Eliminar Colaborador', id);
		const nuevosColaboradores = colaboradores.filter(
			(colaborador) => colaborador.id !== id,
		);
		actualizarColaboradores(nuevosColaboradores);
	};

	//Actualizar Color de Equipo
	const actualizarColorEquipo = (color, id) => {
		console.log('Actualizar: ', color, id);
		const equiposActualizados = equipos.map((equipo) => {
			if (equipo.id === id) {
				equipo.colorPrimario = color;
			}
			return equipo;
		});

		actualizarEquipos(equiposActualizados);
	};

	// crear equipo
	const crearNuevoEquipo = (nuevoEquipo) => {
		console.log(nuevoEquipo);
		actualizarEquipos([...equipos, { ...nuevoEquipo, id: uuid() }]);
	};

	const like = (id) => {
		const colaboradoresActualizados = colaboradores.map((colaborador) => {
			if (colaborador.id === id) {
				colaborador.fav = !colaborador.fav;
			}
			return colaborador;
		});
		actualizarColaboradores(colaboradoresActualizados);
	};

	return (
		<div className="App">
			<Header />
			{mostrarFormulario && (
				<Formulario
					equipos={equipos.map((equipo) => equipo.titulo)}
					registrarColaborador={registrarColaborador}
					crearNuevoEquipo={crearNuevoEquipo}
				/>
			)}

			<MiOrg cambiarMostrar={cambiarMostrar} />

			{equipos.map((equipo) => (
				<Equipo
					datos={equipo}
					key={equipo.titulo}
					colaboradores={colaboradores.filter(
						(colaborador) => colaborador.equipo === equipo.titulo,
					)}
					eliminarColaborador={eliminarColaborador}
					actualizarColorEquipo={actualizarColorEquipo}
					like={like}
				/>
			))}
			<Footer></Footer>
		</div>
	);
}

export default App;
