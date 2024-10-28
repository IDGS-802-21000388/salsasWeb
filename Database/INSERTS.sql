--INSERTS TABLA Direccion
INSERT INTO Direccion (estado, municipio, codigoPostal, colonia, calle, numExt, numInt, referencia) VALUES 
('Ciudad de México', 'Coyoacán', '04100', 'Del Carmen', 'Avenida México', '123', NULL, 'Cerca del Parque Centenario'),  -- ID 1
('Jalisco', 'Guadalajara', '44100', 'Americana', 'Avenida Vallarta', '456', 'B', 'Frente a la Glorieta Minerva'),         -- ID 2
('Nuevo León', 'Monterrey', '64000', 'Centro', 'Morelos', '789', '2', 'A un lado del Palacio Municipal'),                 -- ID 3
('Estado de México', 'Toluca', '50090', 'Centro', 'Independencia', '321', 'A', 'Cerca de la Catedral de Toluca'),         -- ID 4
('Puebla', 'Puebla', '72000', 'Centro Histórico', 'Avenida Reforma', '654', '4', 'A unos pasos del Zócalo de Puebla'),    -- ID 5
('Querétaro', 'Santiago de Querétaro', '76000', 'Centro', 'Juárez', '987', 'B', 'Cerca del Teatro de la República'),      -- ID 6
('Yucatán', 'Mérida', '97000', 'Centro', 'Paseo de Montejo', '159', NULL, 'Frente al Monumento a la Patria'),             -- ID 7
('Veracruz', 'Veracruz', '91700', 'Centro', 'Zaragoza', '753', '2', 'Cerca del malecón'),                                 -- ID 8
('Guanajuato', 'León', '37000', 'Centro', 'Madero', '456', NULL, 'A un lado de la Plaza Principal'),                     -- ID 9
('Chihuahua', 'Chihuahua', '31000', 'Centro', 'Victoria', '258', '1', 'Frente al Palacio de Gobierno'),                  -- ID 10
('Tamaulipas', 'Tampico', '89000', 'Centro', 'Hidalgo', '345', 'A', 'Cerca de la Laguna del Carpintero'),                -- ID 11
('Sonora', 'Hermosillo', '83000', 'Centro', 'Pino Suárez', '567', 'B', 'Frente al Mercado Municipal'),                   -- ID 12
('Baja California', 'Tijuana', '22000', 'Zona Río', 'Reforma', '789', 'C', 'Cerca de la Plaza Río Tijuana'),             -- ID 13
('Oaxaca', 'Oaxaca', '68000', 'Centro', 'Independencia', '234', NULL, 'A unos pasos del Templo de Santo Domingo'),       -- ID 14
('Chiapas', 'Tuxtla Gutiérrez', '29000', 'Centro', 'Belisario Domínguez', '456', NULL, 'Cerca del Parque de la Marimba'),-- ID 15
('Coahuila', 'Saltillo', '25000', 'Centro', 'Aldama', '123', '1', 'A un lado del Museo del Desierto');                   -- ID 16

--INSERTS TABLA Usuario
INSERT INTO Usuario (nombre, nombreUsuario, correo, contrasenia, rol, telefono, idDireccion) VALUES 
-- Administradores
('Juan Pérez', 'jperez', 'juan.perez@mail.com', '$2a$11$PlInTff2WM/vTuAooijdquKkpgkBIatVgFVvyvy4YJp7MOThb/eUa', 'admin', '5551234567', 1),
('Luis Martínez', 'lmartinez', 'luis.martinez@mail.com', '$2a$11$PlInTff2WM/vTuAooijdquKkpgkBIatVgFVvyvy4YJp7MOThb/eUa', 'admin', '5553456789', 5),

-- Repartidores
('Carlos López', 'clopez', 'carlos.lopez@mail.com', '$2a$11$PlInTff2WM/vTuAooijdquKkpgkBIatVgFVvyvy4YJp7MOThb/eUa', 'repartidor', '5552345678', 3),
('Jorge Ramírez', 'jramirez', 'jorge.ramirez@mail.com', '$2a$11$PlInTff2WM/vTuAooijdquKkpgkBIatVgFVvyvy4YJp7MOThb/eUa', 'repartidor', '5557890123', 7),

-- Empleados
('María García', 'mgarcia', 'maria.garcia@mail.com', '$2a$11$PlInTff2WM/vTuAooijdquKkpgkBIatVgFVvyvy4YJp7MOThb/eUa', 'empleado', '5557654321', 2),
('Sofía Rodríguez', 'srodriguez', 'sofia.rodriguez@mail.com', '$2a$11$PlInTff2WM/vTuAooijdquKkpgkBIatVgFVvyvy4YJp7MOThb/eUa', 'empleado', '5556543210', 6),

-- Clientes
('Ana Hernández', 'ahernandez', 'ana.hernandez@mail.com', '$2a$11$PlInTff2WM/vTuAooijdquKkpgkBIatVgFVvyvy4YJp7MOThb/eUa', 'cliente', '5558765432', 4),
('Fernanda Morales', 'fmorales', 'fernanda.morales@mail.com', '$2a$11$PlInTff2WM/vTuAooijdquKkpgkBIatVgFVvyvy4YJp7MOThb/eUa', 'cliente', '5558901234', 8),
('Diego Torres', 'dtorres', 'diego.torres@mail.com', '$2a$11$PlInTff2WM/vTuAooijdquKkpgkBIatVgFVvyvy4YJp7MOThb/eUa', 'cliente', '5559012345', 9),
('Lucía Gómez', 'lgomez', 'lucia.gomez@mail.com', '$2a$11$PlInTff2WM/vTuAooijdquKkpgkBIatVgFVvyvy4YJp7MOThb/eUa', 'cliente', '5550123456', 10),
('Javier Ortega', 'jortega', 'javier.ortega@mail.com', '$2a$11$PlInTff2WM/vTuAooijdquKkpgkBIatVgFVvyvy4YJp7MOThb/eUa', 'cliente', '5551236789', 11),
('Elena Flores', 'eflores', 'elena.flores@mail.com', '$2a$11$PlInTff2WM/vTuAooijdquKkpgkBIatVgFVvyvy4YJp7MOThb/eUa', 'cliente', '5558763451', 12),
('Ricardo Sánchez', 'rsanchez', 'ricardo.sanchez@mail.com', '$2a$11$PlInTff2WM/vTuAooijdquKkpgkBIatVgFVvyvy4YJp7MOThb/eUa', 'cliente', '5557659874', 13),
('Verónica Díaz', 'vdiaz', 'veronica.diaz@mail.com', '$2a$11$PlInTff2WM/vTuAooijdquKkpgkBIatVgFVvyvy4YJp7MOThb/eUa', 'cliente', '5559871234', 14),
('Patricia Ruiz', 'pruiz', 'patricia.ruiz@mail.com', '$2a$11$PlInTff2WM/vTuAooijdquKkpgkBIatVgFVvyvy4YJp7MOThb/eUa', 'cliente', '5556548791', 15),
('Esteban Mora', 'emora', 'esteban.mora@mail.com', '$2a$11$PlInTff2WM/vTuAooijdquKkpgkBIatVgFVvyvy4YJp7MOThb/eUa', 'cliente', '5553219876', 16);


--INSERTS TABLA Medida
INSERT INTO Medida (tipoMedida) VALUES ('gramos');
INSERT INTO Medida (tipoMedida) VALUES ('mililitros');
INSERT INTO Medida (tipoMedida) VALUES ('unidades');

--INSERTS TABLA Proveedor
INSERT INTO Proveedor (nombreProveedor, direccion, telefono, nombreAtiende) VALUES 
('Verduras Frescas del Campo', 'Calle Falsa 123', '555-1234', 'Juan Pérez'),
('Conservadores y Aditivos MX', 'Avenida Siempre Viva 742', '555-5678', 'Ana García'),
('Agua Pura y Más', 'Boulevard del Sol 100', '555-8765', 'Pedro Martínez'),
('Aceites y Grasas Gourmet', 'Calle Luna 456', '555-4321', 'María López'),
('Envases y Empaques de México', 'Avenida Estrella 789', '555-3456', 'Carlos Sánchez');

--INSERTS TABLA MateriaPrima
INSERT INTO MateriaPrima (nombreMateria, precioCompra, idMedida, idProveedor) VALUES 
('Tomatillo', 20.5, 1, 1),
('Chile serrano', 25.0, 1, 2),
('Cebolla blanca', 18.0, 1, 3),
('Ajo', 50.0, 1, 4),
('Cilantro fresco', 15.0, 1, 5),
('Sal', 10.0, 1, 1),
('Agua', 1.0, 2, 2),
('Jugo de limón', 30.0, 2, 3),
('Sorbato de potasio', 200.0, 1, 4),
('Tomate rojo', 22.0, 1, 5),
('Chile de árbol seco', 35.0, 1, 1),
('Aceite vegetal', 50.0, 2, 2),
('Ácido cítrico', 40.0, 1, 3),
('Crema agria', 25.0, 2, 4),
('Chipotle en adobo', 45.0, 2, 5),
('Ajo en polvo', 60.0, 1, 1),
('Mango maduro', 30.0, 1, 2),
('Chile habanero', 40.0, 1, 3),
('Cebolla', 18.0, 1, 4),
('Albahaca fresca', 50.0, 1, 5),
('Aceite de oliva', 80.0, 2, 1),
('Envase 250g', 5.0, 3, 2),
('Envase 600g', 10.0, 3, 3),
('Envase 1500g', 15.0, 3, 4),
('Envase 3000g', 20.0, 3, 5);

--INSERTS TABLA Detalle_materia_prima
INSERT INTO Detalle_materia_prima (fechaCompra, fechaVencimiento, cantidadExistentes, idMateriaPrima) VALUES 
('2024-05-01', '2025-05-01', 0, 1),
('2024-06-15', '2025-06-15', 0, 2),
('2024-07-20', '2025-07-20', 0, 3),
('2024-05-10', '2025-05-10', 0, 4),
('2024-08-01', '2025-08-01', 0, 5),
('2024-05-25', '2025-05-25', 0, 6),
('2024-06-05', '2025-06-05', 0, 7),
('2024-07-25', '2025-07-25', 0, 8),
('2024-06-20', '2025-06-20', 0, 9),
('2024-07-10', '2025-07-10', 0, 10),
('2024-08-05', '2025-08-05', 0, 11),
('2024-05-30', '2025-05-30', 0, 12),
('2024-06-25', '2025-06-25', 0, 13),
('2024-07-15', '2025-07-15', 0, 14),
('2024-08-10', '2025-08-10', 0, 15),
('2024-05-15', '2025-05-15', 0, 16),
('2024-06-10', '2025-06-10', 0, 17),
('2024-07-05', '2025-07-05', 0, 18),
('2024-08-15', '2025-08-15', 0, 19),
('2024-05-05', '2025-05-05', 0, 20),
('2024-06-30', '2025-06-30', 0, 21),
('2024-07-30', '2025-07-30', 0, 22),
('2024-08-20', '2025-08-20', 0, 23),
('2024-05-20', '2025-05-20', 0, 24),
('2024-06-15', '2025-06-15', 0, 25);

--INSERTS TABLA Producto
INSERT INTO Producto (nombreProducto, precioVenta, precioProduccion, cantidad, idMedida, fotografia) VALUES 
('Salsa Verde Casera 250g', 50.0, 30.0, 250, 1, 'foto_salsa_verde_250.jpg'),
('Salsa Verde Casera 600g', 100.0, 60.0, 600, 1, 'foto_salsa_verde_600.jpg'),
('Salsa Verde Casera 1500g', 200.0, 120.0, 1500, 1, 'foto_salsa_verde_1500.jpg'),
('Salsa Verde Casera 3000g', 400.0, 240.0, 3000, 1, 'foto_salsa_verde_3000.jpg'),
('Salsa Roja Asada 250g', 55.0, 35.0, 250, 1, 'foto_salsa_roja_250.jpg'),
('Salsa Roja Asada 600g', 110.0, 70.0, 600, 1, 'foto_salsa_roja_600.jpg'),
('Salsa Roja Asada 1500g', 220.0, 140.0, 1500, 1, 'foto_salsa_roja_1500.jpg'),
('Salsa Roja Asada 3000g', 440.0, 280.0, 3000, 1, 'foto_salsa_roja_3000.jpg'),
('Salsa de Chipotle Cremosa 250g', 60.0, 40.0, 250, 1, 'foto_chipotle_cremosa_250.jpg'),
('Salsa de Chipotle Cremosa 600g', 120.0, 80.0, 600, 1, 'foto_chipotle_cremosa_600.jpg'),
('Salsa de Chipotle Cremosa 1500g', 240.0, 160.0, 1500, 1, 'foto_chipotle_cremosa_1500.jpg'),
('Salsa de Chipotle Cremosa 3000g', 480.0, 320.0, 3000, 1, 'foto_chipotle_cremosa_3000.jpg'),
('Salsa de Mango Habanero 250g', 65.0, 45.0, 250, 1, 'foto_mango_habanero_250.jpg'),
('Salsa de Mango Habanero 600g', 130.0, 90.0, 600, 1, 'foto_mango_habanero_600.jpg'),
('Salsa de Mango Habanero 1500g', 260.0, 180.0, 1500, 1, 'foto_mango_habanero_1500.jpg'),
('Salsa de Mango Habanero 3000g', 520.0, 360.0, 3000, 1, 'foto_mango_habanero_3000.jpg'),
('Salsa de Tomate Albahaca 250g', 70.0, 50.0, 250, 1, 'foto_tomate_albahaca_250.jpg'),
('Salsa de Tomate Albahaca 600g', 140.0, 100.0, 600, 1, 'foto_tomate_albahaca_600.jpg'),
('Salsa de Tomate Albahaca 1500g', 280.0, 200.0, 1500, 1, 'foto_tomate_albahaca_1500.jpg'),
('Salsa de Tomate Albahaca 3000g', 560.0, 400.0, 3000, 1, 'foto_tomate_albahaca_3000.jpg');

--INSERTS TABLA Detalle_producto
INSERT INTO Detalle_producto (fechaVencimiento, cantidadExistentes, idProducto) VALUES 
('2025-05-15', 0, 1),
('2025-05-18', 0, 2),
('2025-06-01', 0, 3),
('2025-06-05', 0, 4),
('2025-06-10', 0, 5),
('2025-06-20', 0, 6),
('2025-06-25', 0, 7),
('2025-07-01', 0, 8),
('2025-07-05', 0, 9),
('2025-07-10', 0, 10),
('2025-07-15', 0, 11),
('2025-07-20', 0, 12),
('2025-07-25', 0, 13),
('2025-08-01', 0, 14),
('2025-08-05', 0, 15),
('2025-08-10', 0, 16),
('2025-08-15', 0, 17),
('2025-08-20', 0, 18),
('2025-08-25', 0, 19),
('2025-08-30', 0, 20);

--INSERTS TABLA Receta
INSERT INTO Receta (idMedida, idProducto) VALUES 
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 8),
(3, 9),
(3, 10),
(3, 11),
(3, 12),
(3, 13),
(3, 14),
(3, 15),
(3, 16),
(3, 17),
(3, 18),
(3, 19),
(3, 20);

--INSERTS TABLA Detalle_receta

-- Salsa Verde Casera 250g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(200, 1, 1, 1),
(20, 1, 2, 1),
(20, 1, 3, 1),
(4, 1, 4, 1),
(12, 1, 5, 1),
(4, 1, 6, 1),
(40, 2, 7, 1),
(8, 2, 8, 1),
(2.5, 1, 9, 1),
(1, 3, 21, 1);

-- Salsa Verde Casera 600g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(480, 1, 1, 2),
(48, 1, 2, 2),
(48, 1, 3, 2),
(9.6, 1, 4, 2),
(28.8, 1, 5, 2),
(9.6, 1, 6, 2),
(96, 2, 7, 2),
(19.2, 2, 8, 2),
(6, 1, 9, 2),
(1, 3, 22, 2);

-- Salsa Verde Casera 1500g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(1200, 1, 1, 3),
(120, 1, 2, 3),
(120, 1, 3, 3),
(24, 1, 4, 3),
(72, 1, 5, 3),
(24, 1, 6, 3),
(240, 2, 7, 3),
(48, 2, 8, 3),
(15, 1, 9, 3),
(1, 3, 23, 3);

-- Salsa Verde Casera 3000g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(2400, 1, 1, 4),
(240, 1, 2, 4),
(240, 1, 3, 4),
(48, 1, 4, 4),
(144, 1, 5, 4),
(48, 1, 6, 4),
(480, 2, 7, 4),
(96, 2, 8, 4),
(30, 1, 9, 4),
(1, 3, 24, 4);

-- Salsa Roja Asada 250g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(160, 1, 10, 5),
(8, 1, 11, 5),
(4, 1, 4, 5),
(20, 1, 19, 5),
(4, 1, 6, 5),
(6, 2, 12, 5),
(20, 2, 7, 5),
(1.25, 1, 13, 5),
(1, 3, 21, 5);

-- Salsa Roja Asada 600g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(384, 1, 10, 6),
(19.2, 1, 11, 6),
(9.6, 1, 4, 6),
(48, 1, 19, 6),
(9.6, 1, 6, 6),
(14.4, 2, 12, 6),
(48, 2, 7, 6),
(3, 1, 13, 6),
(1, 3, 22, 6);

-- Salsa Roja Asada 1500g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(960, 1, 10, 7),
(48, 1, 11, 7),
(24, 1, 4, 7),
(120, 1, 19, 7),
(24, 1, 6, 7),
(36, 2, 12, 7),
(120, 2, 7, 7),
(7.5, 1, 13, 7),
(1, 3, 23, 7);

-- Salsa Roja Asada 3000g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(1920, 1, 10, 8),
(96, 1, 11, 8),
(48, 1, 4, 8),
(240, 1, 19, 8),
(48, 1, 6, 8),
(72, 2, 12, 8),
(240, 2, 7, 8),
(15, 1, 13, 8),
(1, 3, 24, 8);

-- Salsa de Chipotle Cremosa 250g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(100, 1, 14, 9),
(20, 1, 15, 9),
(2, 1, 16, 9),
(2, 1, 6, 9),
(8, 2, 8, 9),
(1, 3, 21, 9);

-- Salsa de Chipotle Cremosa 600g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(240, 1, 14, 10),
(48, 1, 15, 10),
(4.8, 1, 16, 10),
(4.8, 1, 6, 10),
(19.2, 2, 8, 10),
(1, 3, 22, 10);

-- Salsa de Chipotle Cremosa 1500g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(600, 1, 14, 11),
(120, 1, 15, 11),
(12, 1, 16, 11),
(12, 1, 6, 11),
(48, 2, 8, 11),
(1, 3, 23, 11);

-- Salsa de Chipotle Cremosa 3000g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(1200, 1, 14, 12),
(240, 1, 15, 12),
(24, 1, 16, 12),
(24, 1, 6, 12),
(96, 2, 8, 12),
(1, 3, 24, 12);

-- Salsa de Mango y Habanero 250g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(100, 1, 17, 13),
(10, 1, 18, 13),
(20, 2, 8, 13),
(10, 1, 19, 13),
(4, 1, 4, 13),
(4, 1, 6, 13),
(20, 2, 7, 13),
(2.5, 1, 9, 13),
(1, 3, 21, 13);

-- Salsa de Mango y Habanero 600g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(240, 1, 17, 14),
(24, 1, 18, 14),
(48, 2, 8, 14),
(24, 1, 19, 14),
(9.6, 1, 4, 14),
(9.6, 1, 6, 14),
(48, 2, 7, 14),
(6, 1, 9, 14),
(1, 3, 22, 14);

-- Salsa de Mango y Habanero 1500g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(600, 1, 17, 15),
(60, 1, 18, 15),
(120, 2, 8, 15),
(60, 1, 19, 15),
(24, 1, 4, 15),
(24, 1, 6, 15),
(120, 2, 7, 15),
(15, 1, 9, 15),
(1, 3, 23, 15);

-- Salsa de Mango y Habanero 3000g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(1200, 1, 17, 16),
(120, 1, 18, 16),
(240, 2, 8, 16),
(120, 1, 19, 16),
(48, 1, 4, 16),
(48, 1, 6, 16),
(240, 2, 7, 16),
(30, 1, 9, 16),
(1, 3, 24, 16);

-- Salsa de Tomate y Albahaca 250g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(180, 1, 10, 17),
(20, 1, 20, 17),
(4, 1, 4, 17),
(10, 2, 21, 17),
(4, 1, 6, 17),
(1.25, 1, 13, 17),
(1, 3, 21, 17);

-- Salsa de Tomate y Albahaca 600g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(432, 1, 10, 18),
(48, 1, 20, 18),
(9.6, 1, 4, 18),
(24, 2, 21, 18),
(9.6, 1, 6, 18),
(3, 1, 13, 18),
(1, 3, 22, 18);

-- Salsa de Tomate y Albahaca 1500g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(1080, 1, 10, 19),
(120, 1, 20, 19),
(24, 1, 4, 19),
(60, 2, 21, 19),
(24, 1, 6, 19),
(7.5, 1, 13, 19),
(1, 3, 23, 19);

-- Salsa de Tomate y Albahaca 3000g
INSERT INTO Detalle_receta (cantidadMateriaPrima, medidaIngrediente, idMateriaPrima, idReceta) VALUES 
(2160, 1, 10, 20),
(240, 1, 20, 20),
(48, 1, 4, 20),
(120, 2, 21, 20),
(48, 1, 6, 20),
(15, 1, 13, 20),
(1, 3, 24, 20);

DROP PROCEDURE GenerarVentasPorMes;

CREATE PROCEDURE GenerarVentasPorMes
    @FechaInicio DATE,
    @FechaFin DATE,
    @TotalVentas INT
AS
BEGIN
    DECLARE @VentaFecha DATETIME, @ClienteID INT, @ProductoID INT, @Cantidad FLOAT, @Subtotal FLOAT, @Total FLOAT;
    DECLARE @DiaInicio INT, @DiaFin INT, @VentaID INT, @SolicitudID INT;
    SET @DiaInicio = DAY(@FechaInicio);
    SET @DiaFin = DAY(@FechaFin);

    DECLARE @Productos TABLE (
        ProductoID INT,
        PrecioVenta FLOAT
    );

    -- Obtener los productos con sus precios
    INSERT INTO @Productos (ProductoID, PrecioVenta)
    SELECT idProducto, precioVenta FROM Producto;

    DECLARE @Clientes TABLE (
        ClienteID INT
    );

    -- Obtener todos los clientes
    INSERT INTO @Clientes (ClienteID)
    SELECT idUsuario FROM Usuario WHERE rol = 'cliente';

    DECLARE @Empleados TABLE (
        EmpleadoID INT
    );

    -- Obtener todos los empleados
    INSERT INTO @Empleados (EmpleadoID)
    SELECT idUsuario FROM Usuario WHERE rol = 'empleado';

    DECLARE @TotalClientes INT = (SELECT COUNT(*) FROM @Clientes);
    DECLARE @TotalProductos INT = (SELECT COUNT(*) FROM @Productos);
    DECLARE @TotalEmpleados INT = (SELECT COUNT(*) FROM @Empleados);
    DECLARE @RandomCliente INT, @RandomProducto INT, @RandomEmpleado INT;

    -- Generar ventas
    DECLARE @Counter INT = 0;
    WHILE @Counter < @TotalVentas
    BEGIN
        -- Fecha de la venta
        SET @VentaFecha = DATEADD(DAY, FLOOR(RAND() * (@DiaFin - @DiaInicio + 1)), @FechaInicio);

        -- Seleccionar un cliente aleatorio
        SET @RandomCliente = FLOOR(RAND() * @TotalClientes) + 1;
        SELECT @ClienteID = ClienteID FROM (SELECT ROW_NUMBER() OVER (ORDER BY ClienteID) AS RowNum, * FROM @Clientes) AS T WHERE RowNum = @RandomCliente;

        -- Calcular el total de la venta
        SET @Total = 0;

        -- Insertar la venta
        INSERT INTO Venta (fechaVenta, total, idUsuario) 
        VALUES (@VentaFecha, 0, @ClienteID);
        SET @VentaID = SCOPE_IDENTITY();

        -- Generar los detalles de la venta
        DECLARE @NumDetalles INT = FLOOR(RAND() * 3) + 1;  -- Cada venta puede tener entre 1 y 3 productos

        DECLARE @DetalleCounter INT = 0;
        WHILE @DetalleCounter < @NumDetalles
        BEGIN
            -- Seleccionar un producto aleatorio
            SET @RandomProducto = FLOOR(RAND() * @TotalProductos) + 1;
            SELECT @ProductoID = ProductoID, @Subtotal = PrecioVenta FROM (SELECT ROW_NUMBER() OVER (ORDER BY ProductoID) AS RowNum, * FROM @Productos) AS T WHERE RowNum = @RandomProducto;

            -- Generar cantidad y subtotal
            SET @Cantidad = FLOOR(RAND() * 5) + 1;
            SET @Subtotal = @Subtotal * @Cantidad;

            -- Insertar detalle de venta
            INSERT INTO DetalleVenta (cantidad, subtotal, idVenta, idProducto)
            VALUES (@Cantidad, @Subtotal, @VentaID, @ProductoID);

            -- Incrementar el total de la venta
            SET @Total = @Total + @Subtotal;

            SET @DetalleCounter = @DetalleCounter + 1;
        END;

        -- Actualizar el total de la venta
        UPDATE Venta SET total = @Total WHERE idVenta = @VentaID;

        -- Insertar en SolicitudProduccion
        INSERT INTO SolicitudProduccion (fechaSolicitud, estatus, idVenta, idUsuario)
        VALUES (@VentaFecha, 1, @VentaID, @ClienteID);
        SET @SolicitudID = SCOPE_IDENTITY();

        -- Generar detalle de solicitud
        SET @RandomEmpleado = FLOOR(RAND() * @TotalEmpleados) + 1;
        SELECT @RandomEmpleado = EmpleadoID FROM (SELECT ROW_NUMBER() OVER (ORDER BY EmpleadoID) AS RowNum, * FROM @Empleados) AS T WHERE RowNum = @RandomEmpleado;

        INSERT INTO detalle_solicitud (idSolicitud, fechaInicio, fechaFin, idUsuario, estatus, numeroPaso)
        VALUES (@SolicitudID, @VentaFecha, DATEADD(DAY, 1, @VentaFecha), @RandomEmpleado, 1, 1);

        SET @Counter = @Counter + 1;
    END;
END;

-- Configuraciones iniciales
DECLARE @FechaInicio DATE, @FechaFin DATE;
DECLARE @TotalVentas INT = 40;

-- Inserción de ventas en junio 2024
SET @FechaInicio = '2024-06-01';
SET @FechaFin = '2024-06-30';
EXEC GenerarVentasPorMes @FechaInicio, @FechaFin, @TotalVentas;

-- Inserción de ventas en julio 2024
SET @FechaInicio = '2024-07-01';
SET @FechaFin = '2024-07-31';
EXEC GenerarVentasPorMes @FechaInicio, @FechaFin, @TotalVentas;

-- Inserción de ventas en agosto 2024
SET @FechaInicio = '2024-08-01';
SET @FechaFin = '2024-08-31';
EXEC GenerarVentasPorMes @FechaInicio, @FechaFin, @TotalVentas;

-- Salsa Verde Casera 250g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Lavar y desinfectar los tomatillos, chiles serranos, cebolla, ajo, y cilantro.', 1),
(2, 'Colocar los tomatillos y los chiles en una olla con agua y hervir hasta que estén suaves.', 1),
(3, 'Licuar los tomatillos, chiles, cebolla, ajo, cilantro y el jugo de limón.', 1),
(4, 'Agregar sal y sorbato de potasio, y mezclar bien.', 1),
(5, 'Envasar la salsa en el envase de 250g y sellar herméticamente.', 1);

-- Salsa Verde Casera 600g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Lavar y desinfectar los tomatillos, chiles serranos, cebolla, ajo, y cilantro.', 2),
(2, 'Colocar los tomatillos y los chiles en una olla con agua y hervir hasta que estén suaves.', 2),
(3, 'Licuar los tomatillos, chiles, cebolla, ajo, cilantro y el jugo de limón.', 2),
(4, 'Agregar sal y sorbato de potasio, y mezclar bien.', 2),
(5, 'Envasar la salsa en el envase de 600g y sellar herméticamente.', 2);

-- Salsa Verde Casera 1500g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Lavar y desinfectar los tomatillos, chiles serranos, cebolla, ajo, y cilantro.', 3),
(2, 'Colocar los tomatillos y los chiles en una olla con agua y hervir hasta que estén suaves.', 3),
(3, 'Licuar los tomatillos, chiles, cebolla, ajo, cilantro y el jugo de limón.', 3),
(4, 'Agregar sal y sorbato de potasio, y mezclar bien.', 3),
(5, 'Envasar la salsa en el envase de 1500g y sellar herméticamente.', 3);

-- Salsa Verde Casera 3000g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Lavar y desinfectar los tomatillos, chiles serranos, cebolla, ajo, y cilantro.', 4),
(2, 'Colocar los tomatillos y los chiles en una olla con agua y hervir hasta que estén suaves.', 4),
(3, 'Licuar los tomatillos, chiles, cebolla, ajo, cilantro y el jugo de limón.', 4),
(4, 'Agregar sal y sorbato de potasio, y mezclar bien.', 4),
(5, 'Envasar la salsa en el envase de 3000g y sellar herméticamente.', 4);

-- Salsa Roja Asada 250g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Asar los tomates rojos, chile de árbol, cebolla y ajo.', 5),
(2, 'Licuar los ingredientes asados con el jugo de limón y el agua.', 5),
(3, 'Agregar sal, ácido cítrico, y aceite vegetal, mezclar bien.', 5),
(4, 'Envasar la salsa en el envase de 250g y sellar herméticamente.', 5);

-- Salsa Roja Asada 600g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Asar los tomates rojos, chile de árbol, cebolla y ajo.', 6),
(2, 'Licuar los ingredientes asados con el jugo de limón y el agua.', 6),
(3, 'Agregar sal, ácido cítrico, y aceite vegetal, mezclar bien.', 6),
(4, 'Envasar la salsa en el envase de 600g y sellar herméticamente.', 6);

-- Salsa Roja Asada 1500g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Asar los tomates rojos, chile de árbol, cebolla y ajo.', 7),
(2, 'Licuar los ingredientes asados con el jugo de limón y el agua.', 7),
(3, 'Agregar sal, ácido cítrico, y aceite vegetal, mezclar bien.', 7),
(4, 'Envasar la salsa en el envase de 1500g y sellar herméticamente.', 7);

-- Salsa Roja Asada 3000g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Asar los tomates rojos, chile de árbol, cebolla y ajo.', 8),
(2, 'Licuar los ingredientes asados con el jugo de limón y el agua.', 8),
(3, 'Agregar sal, ácido cítrico, y aceite vegetal, mezclar bien.', 8),
(4, 'Envasar la salsa en el envase de 3000g y sellar herméticamente.', 8);

-- Salsa de Chipotle Cremosa 250g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Lavar y desinfectar los chipotles en adobo.', 9),
(2, 'Licuar los chipotles con crema agria, ajo en polvo y jugo de limón.', 9),
(3, 'Agregar sal y mezclar bien.', 9),
(4, 'Envasar la salsa en el envase de 250g y sellar herméticamente.', 9);

-- Salsa de Chipotle Cremosa 600g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Lavar y desinfectar los chipotles en adobo.', 10),
(2, 'Licuar los chipotles con crema agria, ajo en polvo y jugo de limón.', 10),
(3, 'Agregar sal y mezclar bien.', 10),
(4, 'Envasar la salsa en el envase de 600g y sellar herméticamente.', 10);

-- Salsa de Chipotle Cremosa 1500g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Lavar y desinfectar los chipotles en adobo.', 11),
(2, 'Licuar los chipotles con crema agria, ajo en polvo y jugo de limón.', 11),
(3, 'Agregar sal y mezclar bien.', 11),
(4, 'Envasar la salsa en el envase de 1500g y sellar herméticamente.', 11);

-- Salsa de Chipotle Cremosa 3000g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Lavar y desinfectar los chipotles en adobo.', 12),
(2, 'Licuar los chipotles con crema agria, ajo en polvo y jugo de limón.', 12),
(3, 'Agregar sal y mezclar bien.', 12),
(4, 'Envasar la salsa en el envase de 3000g y sellar herméticamente.', 12);

-- Salsa de Mango Habanero 250g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Lavar y desinfectar los mangos y los chiles habaneros.', 13),
(2, 'Licuar el mango, chile habanero, cebolla, y jugo de limón.', 13),
(3, 'Agregar sal, sorbato de potasio y mezclar bien.', 13),
(4, 'Envasar la salsa en el envase de 250g y sellar herméticamente.', 13);

-- Salsa de Mango Habanero 600g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Lavar y desinfectar los mangos y los chiles habaneros.', 14),
(2, 'Licuar el mango, chile habanero, cebolla, y jugo de limón.', 14),
(3, 'Agregar sal, sorbato de potasio y mezclar bien.', 14),
(4, 'Envasar la salsa en el envase de 600g y sellar herméticamente.', 14);

-- Salsa de Mango Habanero 1500g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Lavar y desinfectar los mangos y los chiles habaneros.', 15),
(2, 'Licuar el mango, chile habanero, cebolla, y jugo de limón.', 15),
(3, 'Agregar sal, sorbato de potasio y mezclar bien.', 15),
(4, 'Envasar la salsa en el envase de 1500g y sellar herméticamente.', 15);

-- Salsa de Mango Habanero 3000g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Lavar y desinfectar los mangos y los chiles habaneros.', 16),
(2, 'Licuar el mango, chile habanero, cebolla, y jugo de limón.', 16),
(3, 'Agregar sal, sorbato de potasio y mezclar bien.', 16),
(4, 'Envasar la salsa en el envase de 3000g y sellar herméticamente.', 16);

-- Salsa de Tomate Albahaca 250g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Lavar y desinfectar los tomates y la albahaca fresca.', 17),
(2, 'Asar los tomates y el ajo.', 17),
(3, 'Licuar los tomates asados, albahaca y el ajo.', 17),
(4, 'Agregar sal y mezclar bien.', 17),
(5, 'Envasar la salsa en el envase de 250g y sellar herméticamente.', 17);

-- Salsa de Tomate Albahaca 600g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Lavar y desinfectar los tomates y la albahaca fresca.', 18),
(2, 'Asar los tomates y el ajo.', 18),
(3, 'Licuar los tomates asados, albahaca y el ajo.', 18),
(4, 'Agregar sal y mezclar bien.', 18),
(5, 'Envasar la salsa en el envase de 600g y sellar herméticamente.', 18);

-- Salsa de Tomate Albahaca 1500g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Lavar y desinfectar los tomates y la albahaca fresca.', 19),
(2, 'Asar los tomates y el ajo.', 19),
(3, 'Licuar los tomates asados, albahaca y el ajo.', 19),
(4, 'Agregar sal y mezclar bien.', 19),
(5, 'Envasar la salsa en el envase de 1500g y sellar herméticamente.', 19);

-- Salsa de Tomate Albahaca 3000g
INSERT INTO PasoReceta (paso, descripcion, idProducto) VALUES 
(1, 'Lavar y desinfectar los tomates y la albahaca fresca.', 20),
(2, 'Asar los tomates y el ajo.', 20),
(3, 'Licuar los tomates asados, albahaca y el ajo.', 20),
(4, 'Agregar sal y mezclar bien.', 20),
(5, 'Envasar la salsa en el envase de 3000g y sellar herméticamente.', 20);

INSERT INTO Paqueteria (nombrePaqueteria, telefono, direccion, estatus) VALUES
('DHL Express', '555-1234', 'Avenida Insurgentes Sur 123, Ciudad de México', 1);

-- INSERTS PARA LA TABLA DE EMAILMESSAGE
INSERT INTO EmailMessage (Email, Mensaje, FechaCreacion) VALUES 
('juan.perez@mail.com', 'Mensaje promocional #1 para juan.perez@mail.com', '2024-01-15T14:00:00'),
('juan.perez@mail.com', 'Mensaje promocional #2 para juan.perez@mail.com', '2024-02-18T14:00:00'),
('juan.perez@mail.com', 'Mensaje promocional #3 para juan.perez@mail.com', '2024-03-20T14:00:00'),
('juan.perez@mail.com', 'Mensaje promocional #4 para juan.perez@mail.com', '2024-04-22T14:00:00'),
('juan.perez@mail.com', 'Mensaje promocional #5 para juan.perez@mail.com', '2024-05-25T14:00:00'),

('luis.martinez@mail.com', 'Mensaje promocional #1 para luis.martinez@mail.com', '2024-01-10T14:00:00'),
('luis.martinez@mail.com', 'Mensaje promocional #2 para luis.martinez@mail.com', '2024-02-14T14:00:00'),
('luis.martinez@mail.com', 'Mensaje promocional #3 para luis.martinez@mail.com', '2024-03-18T14:00:00'),
('luis.martinez@mail.com', 'Mensaje promocional #4 para luis.martinez@mail.com', '2024-04-22T14:00:00'),
('luis.martinez@mail.com', 'Mensaje promocional #5 para luis.martinez@mail.com', '2024-05-26T14:00:00'),

('carlos.lopez@mail.com', 'Mensaje promocional #1 para carlos.lopez@mail.com', '2024-06-12T14:00:00'),
('carlos.lopez@mail.com', 'Mensaje promocional #2 para carlos.lopez@mail.com', '2024-07-15T14:00:00'),
('carlos.lopez@mail.com', 'Mensaje promocional #3 para carlos.lopez@mail.com', '2024-08-20T14:00:00'),
('carlos.lopez@mail.com', 'Mensaje promocional #4 para carlos.lopez@mail.com', '2024-09-22T14:00:00'),
('carlos.lopez@mail.com', 'Mensaje promocional #5 para carlos.lopez@mail.com', '2024-10-25T14:00:00'),

('jorge.ramirez@mail.com', 'Mensaje promocional #1 para jorge.ramirez@mail.com', '2024-11-03T14:00:00'),
('jorge.ramirez@mail.com', 'Mensaje promocional #2 para jorge.ramirez@mail.com', '2024-11-17T14:00:00'),
('jorge.ramirez@mail.com', 'Mensaje promocional #3 para jorge.ramirez@mail.com', '2024-12-01T14:00:00'),
('jorge.ramirez@mail.com', 'Mensaje promocional #4 para jorge.ramirez@mail.com', '2024-12-15T14:00:00'),
('jorge.ramirez@mail.com', 'Mensaje promocional #5 para jorge.ramirez@mail.com', '2024-12-30T14:00:00'),

('maria.garcia@mail.com', 'Mensaje promocional #1 para maria.garcia@mail.com', '2024-01-07T14:00:00'),
('maria.garcia@mail.com', 'Mensaje promocional #2 para maria.garcia@mail.com', '2024-02-14T14:00:00'),
('maria.garcia@mail.com', 'Mensaje promocional #3 para maria.garcia@mail.com', '2024-03-21T14:00:00'),
('maria.garcia@mail.com', 'Mensaje promocional #4 para maria.garcia@mail.com', '2024-04-28T14:00:00'),
('maria.garcia@mail.com', 'Mensaje promocional #5 para maria.garcia@mail.com', '2024-05-05T14:00:00'),

('sofia.rodriguez@mail.com', 'Mensaje promocional #1 para sofia.rodriguez@mail.com', '2024-06-06T14:00:00'),
('sofia.rodriguez@mail.com', 'Mensaje promocional #2 para sofia.rodriguez@mail.com', '2024-07-13T14:00:00'),
('sofia.rodriguez@mail.com', 'Mensaje promocional #3 para sofia.rodriguez@mail.com', '2024-08-20T14:00:00'),
('sofia.rodriguez@mail.com', 'Mensaje promocional #4 para sofia.rodriguez@mail.com', '2024-09-27T14:00:00'),
('sofia.rodriguez@mail.com', 'Mensaje promocional #5 para sofia.rodriguez@mail.com', '2024-10-04T14:00:00'),

('ana.hernandez@mail.com', 'Mensaje promocional #1 para ana.hernandez@mail.com', '2024-11-11T14:00:00'),
('ana.hernandez@mail.com', 'Mensaje promocional #2 para ana.hernandez@mail.com', '2024-12-18T14:00:00'),
('ana.hernandez@mail.com', 'Mensaje promocional #3 para ana.hernandez@mail.com', '2024-01-25T14:00:00'),
('ana.hernandez@mail.com', 'Mensaje promocional #4 para ana.hernandez@mail.com', '2024-02-01T14:00:00'),
('ana.hernandez@mail.com', 'Mensaje promocional #5 para ana.hernandez@mail.com', '2024-03-08T14:00:00'),

('fernanda.morales@mail.com', 'Mensaje promocional #1 para fernanda.morales@mail.com', '2024-04-15T14:00:00'),
('fernanda.morales@mail.com', 'Mensaje promocional #2 para fernanda.morales@mail.com', '2024-05-22T14:00:00'),
('fernanda.morales@mail.com', 'Mensaje promocional #3 para fernanda.morales@mail.com', '2024-06-29T14:00:00'),
('fernanda.morales@mail.com', 'Mensaje promocional #4 para fernanda.morales@mail.com', '2024-07-06T14:00:00'),
('fernanda.morales@mail.com', 'Mensaje promocional #5 para fernanda.morales@mail.com', '2024-08-13T14:00:00'),

('diego.torres@mail.com', 'Mensaje promocional #1 para diego.torres@mail.com', '2024-09-20T14:00:00'),
('diego.torres@mail.com', 'Mensaje promocional #2 para diego.torres@mail.com', '2024-10-27T14:00:00'),
('diego.torres@mail.com', 'Mensaje promocional #3 para diego.torres@mail.com', '2024-11-03T14:00:00'),
('diego.torres@mail.com', 'Mensaje promocional #4 para diego.torres@mail.com', '2024-12-10T14:00:00'),
('diego.torres@mail.com', 'Mensaje promocional #5 para diego.torres@mail.com', '2024-01-17T14:00:00'),

('lucia.gomez@mail.com', 'Mensaje promocional #1 para lucia.gomez@mail.com', '2024-02-24T14:00:00'),
('lucia.gomez@mail.com', 'Mensaje promocional #2 para lucia.gomez@mail.com', '2024-03-03T14:00:00'),
('lucia.gomez@mail.com', 'Mensaje promocional #3 para lucia.gomez@mail.com', '2024-04-10T14:00:00'),
('lucia.gomez@mail.com', 'Mensaje promocional #4 para lucia.gomez@mail.com', '2024-05-17T14:00:00'),
('lucia.gomez@mail.com', 'Mensaje promocional #5 para lucia.gomez@mail.com', '2024-06-24T14:00:00'),

('javier.ortega@mail.com', 'Mensaje promocional #1 para javier.ortega@mail.com', '2024-07-01T14:00:00'),
('javier.ortega@mail.com', 'Mensaje promocional #2 para javier.ortega@mail.com', '2024-08-08T14:00:00'),
('javier.ortega@mail.com', 'Mensaje promocional #3 para javier.ortega@mail.com', '2024-09-15T14:00:00'),
('javier.ortega@mail.com', 'Mensaje promocional #4 para javier.ortega@mail.com', '2024-10-22T14:00:00'),
('javier.ortega@mail.com', 'Mensaje promocional #5 para javier.ortega@mail.com', '2024-11-29T14:00:00'),

('elena.flores@mail.com', 'Mensaje promocional #1 para elena.flores@mail.com', '2024-12-05T14:00:00'),
('elena.flores@mail.com', 'Mensaje promocional #2 para elena.flores@mail.com', '2024-01-12T14:00:00'),
('elena.flores@mail.com', 'Mensaje promocional #3 para elena.flores@mail.com', '2024-02-19T14:00:00'),
('elena.flores@mail.com', 'Mensaje promocional #4 para elena.flores@mail.com', '2024-03-26T14:00:00'),
('elena.flores@mail.com', 'Mensaje promocional #5 para elena.flores@mail.com', '2024-04-02T14:00:00'),

('ricardo.sanchez@mail.com', 'Mensaje promocional #1 para ricardo.sanchez@mail.com', '2024-05-09T14:00:00'),
('ricardo.sanchez@mail.com', 'Mensaje promocional #2 para ricardo.sanchez@mail.com', '2024-06-16T14:00:00'),
('ricardo.sanchez@mail.com', 'Mensaje promocional #3 para ricardo.sanchez@mail.com', '2024-07-23T14:00:00'),
('ricardo.sanchez@mail.com', 'Mensaje promocional #4 para ricardo.sanchez@mail.com', '2024-08-30T14:00:00'),
('ricardo.sanchez@mail.com', 'Mensaje promocional #5 para ricardo.sanchez@mail.com', '2024-09-06T14:00:00'),

('veronica.diaz@mail.com', 'Mensaje promocional #1 para veronica.diaz@mail.com', '2024-10-13T14:00:00'),
('veronica.diaz@mail.com', 'Mensaje promocional #2 para veronica.diaz@mail.com', '2024-11-20T14:00:00'),
('veronica.diaz@mail.com', 'Mensaje promocional #3 para veronica.diaz@mail.com', '2024-12-27T14:00:00'),
('veronica.diaz@mail.com', 'Mensaje promocional #4 para veronica.diaz@mail.com', '2024-01-03T14:00:00'),
('veronica.diaz@mail.com', 'Mensaje promocional #5 para veronica.diaz@mail.com', '2024-02-10T14:00:00'),

('patricia.ruiz@mail.com', 'Mensaje promocional #1 para patricia.ruiz@mail.com', '2024-03-17T14:00:00'),
('patricia.ruiz@mail.com', 'Mensaje promocional #2 para patricia.ruiz@mail.com', '2024-04-24T14:00:00'),
('patricia.ruiz@mail.com', 'Mensaje promocional #3 para patricia.ruiz@mail.com', '2024-05-01T14:00:00'),
('patricia.ruiz@mail.com', 'Mensaje promocional #4 para patricia.ruiz@mail.com', '2024-06-08T14:00:00'),
('patricia.ruiz@mail.com', 'Mensaje promocional #5 para patricia.ruiz@mail.com', '2024-07-15T14:00:00'),

('esteban.mora@mail.com', 'Mensaje promocional #1 para esteban.mora@mail.com', '2024-08-22T14:00:00'),
('esteban.mora@mail.com', 'Mensaje promocional #2 para esteban.mora@mail.com', '2024-09-29T14:00:00'),
('esteban.mora@mail.com', 'Mensaje promocional #3 para esteban.mora@mail.com', '2024-10-06T14:00:00'),
('esteban.mora@mail.com', 'Mensaje promocional #4 para esteban.mora@mail.com', '2024-11-13T14:00:00'),
('esteban.mora@mail.com', 'Mensaje promocional #5 para esteban.mora@mail.com', '2024-12-20T14:00:00');

CREATE PROCEDURE GenerarVentasPorMes
    @FechaInicio DATE,
    @FechaFin DATE,
    @TotalVentas INT
AS
BEGIN
    DECLARE @VentaFecha DATETIME, @ClienteID INT, @ProductoID INT, @Cantidad FLOAT, @Subtotal FLOAT, @Total FLOAT;
    DECLARE @DiaInicio INT, @DiaFin INT, @VentaID INT, @SolicitudID INT, @EnvioID INT;
    SET @DiaInicio = DAY(@FechaInicio);
    SET @DiaFin = DAY(@FechaFin);

    DECLARE @Productos TABLE (
        ProductoID INT,
        PrecioVenta FLOAT
    );

    -- Obtener los productos con sus precios
    INSERT INTO @Productos (ProductoID, PrecioVenta)
    SELECT idProducto, precioVenta FROM Producto;

    DECLARE @Clientes TABLE (
        ClienteID INT
    );

    -- Obtener todos los clientes
    INSERT INTO @Clientes (ClienteID)
    SELECT idUsuario FROM Usuario WHERE rol = 'cliente';

    DECLARE @Empleados TABLE (
        EmpleadoID INT
    );

    -- Obtener todos los empleados
    INSERT INTO @Empleados (EmpleadoID)
    SELECT idUsuario FROM Usuario WHERE rol = 'empleado';

    DECLARE @Paqueterias TABLE (
        PaqueteriaID INT
    );

    -- Obtener todas las paqueterías
    INSERT INTO @Paqueterias (PaqueteriaID)
    SELECT idPaqueteria FROM Paqueteria;

    DECLARE @TotalClientes INT = (SELECT COUNT(*) FROM @Clientes);
    DECLARE @TotalProductos INT = (SELECT COUNT(*) FROM @Productos);
    DECLARE @TotalEmpleados INT = (SELECT COUNT(*) FROM @Empleados);
    DECLARE @TotalPaqueterias INT = (SELECT COUNT(*) FROM @Paqueterias);
    DECLARE @RandomCliente INT, @RandomProducto INT, @RandomEmpleado INT, @RandomPaqueteria INT;

    -- Generar ventas
    DECLARE @Counter INT = 0;
    WHILE @Counter < @TotalVentas
    BEGIN
        -- Fecha de la venta
        SET @VentaFecha = DATEADD(DAY, FLOOR(RAND() * (@DiaFin - @DiaInicio + 1)), @FechaInicio);

        -- Seleccionar un cliente aleatorio
        SET @RandomCliente = FLOOR(RAND() * @TotalClientes) + 1;
        SELECT @ClienteID = ClienteID FROM (SELECT ROW_NUMBER() OVER (ORDER BY ClienteID) AS RowNum, * FROM @Clientes) AS T WHERE RowNum = @RandomCliente;

        -- Calcular el total de la venta
        SET @Total = 0;

        -- Insertar la venta
        INSERT INTO Venta (fechaVenta, total, idUsuario) 
        VALUES (@VentaFecha, 0, @ClienteID);
        SET @VentaID = SCOPE_IDENTITY();

        -- Generar los detalles de la venta
        DECLARE @NumDetalles INT = FLOOR(RAND() * 3) + 1;  -- Cada venta puede tener entre 1 y 3 productos

        DECLARE @DetalleCounter INT = 0;
        WHILE @DetalleCounter < @NumDetalles
        BEGIN
            -- Seleccionar un producto aleatorio
            SET @RandomProducto = FLOOR(RAND() * @TotalProductos) + 1;
            SELECT @ProductoID = ProductoID, @Subtotal = PrecioVenta FROM (SELECT ROW_NUMBER() OVER (ORDER BY ProductoID) AS RowNum, * FROM @Productos) AS T WHERE RowNum = @RandomProducto;

            -- Generar cantidad y subtotal
            SET @Cantidad = FLOOR(RAND() * 5) + 1;
            SET @Subtotal = @Subtotal * @Cantidad;

            -- Insertar detalle de venta
            INSERT INTO DetalleVenta (cantidad, subtotal, idVenta, idProducto)
            VALUES (@Cantidad, @Subtotal, @VentaID, @ProductoID);

            -- Incrementar el total de la venta
            SET @Total = @Total + @Subtotal;

            SET @DetalleCounter = @DetalleCounter + 1;
        END;

        -- Actualizar el total de la venta
        UPDATE Venta SET total = @Total WHERE idVenta = @VentaID;

        -- Insertar en SolicitudProduccion
        INSERT INTO SolicitudProduccion (fechaSolicitud, estatus, idVenta, idUsuario)
        VALUES (@VentaFecha, 3, @VentaID, @ClienteID);
        SET @SolicitudID = SCOPE_IDENTITY();

        -- Generar detalle de solicitud
        SET @RandomEmpleado = FLOOR(RAND() * @TotalEmpleados) + 1;
        SELECT @RandomEmpleado = EmpleadoID FROM (SELECT ROW_NUMBER() OVER (ORDER BY EmpleadoID) AS RowNum, * FROM @Empleados) AS T WHERE RowNum = @RandomEmpleado;

        INSERT INTO detalle_solicitud (idSolicitud, fechaInicio, fechaFin, idUsuario, estatus, numeroPaso)
        VALUES (@SolicitudID, @VentaFecha, DATEADD(DAY, 1, @VentaFecha), @RandomEmpleado, 1, 1);

        -- Seleccionar una paquetería aleatoria
        SET @RandomPaqueteria = FLOOR(RAND() * @TotalPaqueterias) + 1;
        SELECT @RandomPaqueteria = PaqueteriaID FROM (SELECT ROW_NUMBER() OVER (ORDER BY PaqueteriaID) AS RowNum, * FROM @Paqueterias) AS T WHERE RowNum = @RandomPaqueteria;

        -- Insertar en Envio
        INSERT INTO Envio (fechaEnvio, fechaEntregaEstimada, estatus, idVenta, idPaqueteria)
        VALUES (@VentaFecha, DATEADD(DAY, 5, @VentaFecha), 'entregado', @VentaID, @RandomPaqueteria);

        SET @Counter = @Counter + 1;
    END;
END;

-- Configuraciones iniciales
DECLARE @FechaInicio DATE, @FechaFin DATE;
DECLARE @TotalVentas INT = 40;

-- Inserción de ventas en junio 2024
SET @FechaInicio = '2024-06-01';
SET @FechaFin = '2024-06-30';
EXEC GenerarVentasPorMes @FechaInicio, @FechaFin, @TotalVentas;

-- Inserción de ventas en julio 2024
SET @FechaInicio = '2024-07-01';
SET @FechaFin = '2024-07-31';
EXEC GenerarVentasPorMes @FechaInicio, @FechaFin, @TotalVentas;

-- Inserción de ventas en agosto 2024
SET @FechaInicio = '2024-08-01';
SET @FechaFin = '2024-08-31';
EXEC GenerarVentasPorMes @FechaInicio, @FechaFin, @TotalVentas;
