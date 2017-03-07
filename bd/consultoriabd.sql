-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-03-2017 a las 23:28:21
-- Versión del servidor: 5.5.39
-- Versión de PHP: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `consultoriabd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE IF NOT EXISTS `cliente` (
  `nombreCliente` varchar(30) NOT NULL,
  `apellidoCliente` varchar(30) NOT NULL,
  `dniCliente` varchar(9) NOT NULL,
  `telefonoCliente` int(9) NOT NULL,
  `direccionCliente` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`nombreCliente`, `apellidoCliente`, `dniCliente`, `telefonoCliente`, `direccionCliente`) VALUES
('Juan', 'Lopez', '34563453A', 695216965, 'Pasaje Paraiso'),
('Carlos', 'Rodriguez', '35787643X', 678543677, 'Avenida los Pinos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE IF NOT EXISTS `proyecto` (
`idProyecto` int(5) NOT NULL,
  `nombreProyecto` varchar(30) NOT NULL,
  `idCliente` varchar(9) NOT NULL,
  `precio` double(10,2) NOT NULL,
  `fechaIniProyecto` date NOT NULL,
  `fechaFinProyecto` date NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1302 ;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`idProyecto`, `nombreProyecto`, `idCliente`, `precio`, `fechaIniProyecto`, `fechaFinProyecto`) VALUES
(1300, 'Info,S.A.', '34563453A', 10000.00, '2017-04-18', '2017-05-25'),
(1301, 'Tlami,S.COOP', '35787643X', 60000.00, '2017-03-13', '2017-08-24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE IF NOT EXISTS `tarea` (
  `idTarea` int(5) NOT NULL,
  `idProyecto` int(5) NOT NULL,
  `idTipoTarea` int(5) NOT NULL,
  `idTrabajador` varchar(9) NOT NULL,
  `fechaIniTarea` date NOT NULL,
  `fechaFinTarea` date NOT NULL,
  `estadoTarea` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`idTarea`, `idProyecto`, `idTipoTarea`, `idTrabajador`, `fechaIniTarea`, `fechaFinTarea`, `estadoTarea`) VALUES
(1001, 1300, 1, '34567843C', '2017-06-14', '2017-11-15', 'Empezado'),
(1013, 1301, 2, '67453469V', '2017-05-14', '2017-06-15', 'Casi terminado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_tarea`
--

CREATE TABLE IF NOT EXISTS `tipo_tarea` (
  `idTarea` int(5) NOT NULL,
  `nombreTarea` varchar(30) NOT NULL,
  `descripcionTarea` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_tarea`
--

INSERT INTO `tipo_tarea` (`idTarea`, `nombreTarea`, `descripcionTarea`) VALUES
(1, 'Analisis', 'Evaluar los cambios y realizar un test de comprobación'),
(2, 'Codificación', 'Codificar el código dado para su mejor funcionamiento');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_trabajador`
--

CREATE TABLE IF NOT EXISTS `tipo_trabajador` (
  `id` int(11) NOT NULL,
  `tipo` varchar(22) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_trabajador`
--

INSERT INTO `tipo_trabajador` (`id`, `tipo`) VALUES
(1, 'Analista'),
(2, 'Programador'),
(3, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajador`
--

CREATE TABLE IF NOT EXISTS `trabajador` (
  `nombreTrabajador` varchar(30) NOT NULL,
  `dniTrabajador` varchar(9) NOT NULL,
  `apellidoTrabajador` varchar(30) NOT NULL,
  `direccionTrabajador` varchar(40) NOT NULL,
  `telefonoTrabajador` int(9) NOT NULL,
  `tipoTrabajador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `trabajador`
--

INSERT INTO `trabajador` (`nombreTrabajador`, `dniTrabajador`, `apellidoTrabajador`, `direccionTrabajador`, `telefonoTrabajador`, `tipoTrabajador`) VALUES
('Cristian', '34567843C', 'Ocaña', 'Pasaje Rich', 678945643, 2),
('Francisco', '65553464Z', 'Armesto', 'Avenida de la Paz', 655366666, 1),
('Alejandro', '67453469V', 'Garcia', 'Avenida el Capo', 654367896, 3),
('Lucas', '95153464X', 'Lopez', 'Calle de Esperanza', 659367899, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
 ADD PRIMARY KEY (`dniCliente`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
 ADD PRIMARY KEY (`idProyecto`), ADD KEY `idCliente` (`idCliente`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
 ADD PRIMARY KEY (`idTarea`), ADD KEY `idProyecto` (`idProyecto`), ADD KEY `idTipoTarea` (`idTipoTarea`), ADD KEY `idTrabajador` (`idTrabajador`);

--
-- Indices de la tabla `tipo_tarea`
--
ALTER TABLE `tipo_tarea`
 ADD PRIMARY KEY (`idTarea`);

--
-- Indices de la tabla `tipo_trabajador`
--
ALTER TABLE `tipo_trabajador`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `trabajador`
--
ALTER TABLE `trabajador`
 ADD PRIMARY KEY (`dniTrabajador`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
MODIFY `idProyecto` int(5) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1302;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `proyecto`
--
ALTER TABLE `proyecto`
ADD CONSTRAINT `proyecto_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`dniCliente`);

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
ADD CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`idProyecto`) REFERENCES `proyecto` (`idProyecto`),
ADD CONSTRAINT `tarea_ibfk_2` FOREIGN KEY (`idProyecto`) REFERENCES `proyecto` (`idProyecto`),
ADD CONSTRAINT `tarea_ibfk_3` FOREIGN KEY (`idTipoTarea`) REFERENCES `tipo_tarea` (`idTarea`),
ADD CONSTRAINT `tarea_ibfk_4` FOREIGN KEY (`idTrabajador`) REFERENCES `trabajador` (`dniTrabajador`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
