-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-06-2025 a las 17:25:15
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tec_store_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `tipo` enum('Accesorio','Repuesto') NOT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `imagen`, `tipo`, `activo`) VALUES
(10, 'Cargador Rápido USB-C 25W', 'Cargador compatible con carga rápida para dispositivos Samsung y Android.', 4999.99, 15, 'https://imgs.search.brave.com/KEe50-WF_s8jhfZ0pTxGRk-uuHldvRva0jJsSu4BZmk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjEwZlo0aHVwLUwu/anBn', 'Accesorio', 1),
(11, 'Auriculares Bluetooth Inalámbricos', 'Auriculares estéreo con micrófono y estuche de carga.', 7999.00, 10, 'https://imgs.search.brave.com/f_g79VaL7fagdER3zMdhG2tRfn-qX2EfLkLtvYWqpCU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFMWEtaQjZpWUwu/anBn', 'Accesorio', 1),
(12, 'Protector de Pantalla Vidrio Templado', 'Vidrio templado 9H anti-rayaduras para iPhone 13.', 1500.00, 30, 'https://imgs.search.brave.com/iVMJcbpvBsZPB0GRNDGJSSFGRExmIVyx6ZM92idswQc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDF5UExLaFdhV0wu/anBn', 'Accesorio', 1),
(13, 'Soporte para Auto con Ventosa', 'Soporte universal para móviles con rotación 360°.', 2999.00, 12, 'https://imgs.search.brave.com/zCG9dS9SrhzTY5DVrb95gw-2WciwR9CTb4_FSXgZIVQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9hc3IvOTc0/NTM4YzYtMjEwZC00/NTcxLWJkY2UtMTU5/ZGMzMjYxYTcxLmY2/ODRhNDdiM2UwNWQ3/ODY0MzFjYmFkNTE0/Nzk2ODc2LmpwZWc_/b2RuSG', 'Accesorio', 0),
(14, 'Funda Silicona Samsung A32', 'Funda protectora antishock para Samsung Galaxy A32.', 1899.00, 20, 'https://imgs.search.brave.com/-hVM9G8PbJ05S1PaR9WbcVs69OxHiq9pp9zCVYfRLvQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFnMWNjUE9YLUwu/anBn', 'Accesorio', 1),
(15, 'Pantalla Repuesto iPhone X', 'Pantalla LCD + táctil para iPhone X, repuesto de alta calidad.', 22999.00, 5, 'https://imgs.search.brave.com/jIFjTp4nKMQyZCm55nvnYk958LblEmwAA9nd1d7Z6yk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFmK1V4SDhhbEwu/anBn', 'Repuesto', 1),
(16, 'Batería Interna Samsung J7', 'Batería original para Samsung Galaxy J7 3000mAh.', 6999.00, 8, 'https://imgs.search.brave.com/pw6geLU6Ek7T-M4d_aW2ODCkgNWQudgzf9bNDwx93Zg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzk1NjA2NS1NTEE3/ODM2NjQyMjcyMF8w/ODIwMjQtVi53ZWJw', 'Repuesto', 1),
(17, 'Cámara Trasera Moto G6', 'Repuesto de cámara principal compatible con Moto G6.', 4999.00, 6, 'https://m.media-amazon.com/images/I/517OPiLgv4L._AC_SX679_.jpg', 'Repuesto', 1),
(18, 'Flex de carga Xiaomi Redmi Note 8', 'Módulo de carga USB tipo C para Redmi Note 8.', 2599.00, 10, 'https://imgs.search.brave.com/t9hJgBNU7T4f9amEO0e6wPEXHD2EdcmGParKmPwQTMU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudGNkbi5jb20u/YnIvaW1nL2ltZ19w/cm9kLzEwNjQ0MjQv/MTgwX2NhYm9fZmxl/eF9tYWluX3N1Yl9k/ZV9jYXJnYV94aWFv/bWlfcmVkbWlfbm90/ZV8xM180Z18yOTMw/XzJfOD', 'Repuesto', 0),
(19, 'Micrófono Interno Huawei P30', 'Repuesto de micrófono compatible con Huawei P30.', 3499.00, 4, 'https://imgs.search.brave.com/jhucaNgQ_tQRa7JnJkRn6e863MzR3Xgy0THOXzozIes/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hZS1w/aWMtYTEuYWxpZXhw/cmVzcy1tZWRpYS5j/b20va2YvUzU2MDI4/NzVkNTE3MTRmYjU5/NjI1ZDc4NDBhYWZi/YzNmMi5qcGdfNDgw/eDQ4MHE3NS5qcGdf/LndlYnA', 'Repuesto', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_ventas`
--

CREATE TABLE `productos_ventas` (
  `id` int(11) NOT NULL,
  `ventas_id` int(11) NOT NULL,
  `productos_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`) VALUES
(1, 'tecStoreAdmin', 'securepass1234xd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `nombreUsuario` varchar(50) NOT NULL DEFAULT '',
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `total` decimal(11,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos_ventas`
--
ALTER TABLE `productos_ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ventas_id` (`ventas_id`),
  ADD KEY `fk_productos_id` (`productos_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `productos_ventas`
--
ALTER TABLE `productos_ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos_ventas`
--
ALTER TABLE `productos_ventas`
  ADD CONSTRAINT `fk_productos_id` FOREIGN KEY (`productos_id`) REFERENCES `productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ventas_id` FOREIGN KEY (`ventas_id`) REFERENCES `ventas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
