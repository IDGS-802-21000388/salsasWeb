
DROP DATABASE IF EXISTS SalsasReni;
GO

CREATE DATABASE SalsasReni;
GO

USE SalsasReni;
GO

CREATE TABLE Direccion (
    idDireccion INT IDENTITY(1,1) PRIMARY KEY,
    estado VARCHAR(50) NOT NULL,
    municipio VARCHAR(50) NOT NULL,
    codigoPostal VARCHAR(10) NOT NULL,
    colonia VARCHAR(50) NOT NULL,
    calle VARCHAR(50) NOT NULL,
    numExt VARCHAR(10) NOT NULL,
    numInt VARCHAR(10),
    referencia VARCHAR(255)
);
GO

CREATE TABLE Usuario (
    idUsuario INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    nombreUsuario VARCHAR(45) NOT NULL DEFAULT '',
    correo VARCHAR(45) NOT NULL DEFAULT '' UNIQUE,
    contrasenia VARCHAR(200) NOT NULL DEFAULT '',
    rol VARCHAR(30) NOT NULL,
    estatus INT NOT NULL DEFAULT 1,
    telefono VARCHAR(15) NOT NULL DEFAULT '',
    intentos INT NOT NULL DEFAULT 0,
    idDireccion INT NOT NULL,
    dateLastToken DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (idDireccion) REFERENCES Direccion(idDireccion)
);
GO

CREATE TABLE AgentesVenta (
    idAgentesVenta INT IDENTITY(1,1) PRIMARY KEY,
    idAgente INT NOT NULL,
    idCliente INT NOT NULL,
    FOREIGN KEY (idAgente) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (idCliente) REFERENCES Usuario(idUsuario)
);



CREATE TABLE LogsUser (
    id INT IDENTITY(1,1) PRIMARY KEY,
    procedimiento VARCHAR(255) NOT NULL,
    lastDate DATETIME DEFAULT GETDATE(),
    idUsuario INT
);
GO

CREATE TABLE Medida (
    idMedida INT IDENTITY(1,1) PRIMARY KEY,
    tipoMedida VARCHAR(15)
);
GO

CREATE TABLE Proveedor (
    idProveedor INT IDENTITY(1,1) PRIMARY KEY,
    nombreProveedor VARCHAR(100) NOT NULL DEFAULT '',
    direccion VARCHAR(255) NOT NULL DEFAULT '',
    telefono VARCHAR(15) NOT NULL DEFAULT '',
    nombreAtiende VARCHAR(100) NOT NULL DEFAULT '',
    estatus INT NOT NULL DEFAULT 1
);
GO

CREATE TABLE MateriaPrima (
	idMateriaPrima INT IDENTITY(1,1) PRIMARY KEY,
	nombreMateria VARCHAR(45) NOT NULL DEFAULT '',
	precioCompra FLOAT NOT NULL DEFAULT 0.0,
	idMedida INT,
	idProveedor INT,
	FOREIGN KEY (idMedida) REFERENCES Medida(idMedida),
	FOREIGN KEY (idProveedor) REFERENCES Proveedor(idProveedor)
);
GO

CREATE TABLE Detalle_materia_prima (
    idDetalle_materia_prima INT IDENTITY(1,1) PRIMARY KEY,
    fechaCompra DATETIME NOT NULL DEFAULT GETDATE(),
    fechaVencimiento DATETIME,
    cantidadExistentes FLOAT NOT NULL DEFAULT 0.0,
    estatus INT NOT NULL DEFAULT 1,
    idMateriaPrima INT,
    porcentaje INT NOT NULL DEFAULT 100,
    FOREIGN KEY (idMateriaPrima) REFERENCES MateriaPrima(idMateriaPrima)
);
GO

CREATE TABLE Compra (
    idCompra INT IDENTITY(1,1) PRIMARY KEY,
    idMateriaPrima INT,
    idDetalle_materia_prima INT,
    cantidadComprada FLOAT NOT NULL DEFAULT 0.0,
    FOREIGN KEY (idMateriaPrima) REFERENCES MateriaPrima(idMateriaPrima),
    FOREIGN KEY (idDetalle_materia_prima) REFERENCES Detalle_materia_prima(idDetalle_materia_prima)
);
GO

CREATE TABLE Producto (
    idProducto INT IDENTITY(1,1) PRIMARY KEY,
    nombreProducto VARCHAR(50) NOT NULL DEFAULT '',
    precioVenta FLOAT NOT NULL DEFAULT 0.0,
    precioProduccion FLOAT NOT NULL DEFAULT 0.0,
	cantidad FLOAT NOT NULL DEFAULT 0.0,
    idMedida INT,
    fotografia TEXT,
    estatus BIT NOT NULL DEFAULT 1,
    FOREIGN KEY (idMedida) REFERENCES Medida(idMedida)
);
GO

CREATE TABLE Detalle_producto (
    idDetalle_producto INT IDENTITY(1,1) PRIMARY KEY,
    fechaVencimiento DATETIME,
    cantidadExistentes INT NOT NULL DEFAULT 0,
    estatus BIT NOT NULL DEFAULT 1,
    idProducto INT,
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);
GO

CREATE TABLE Merma (
    idMerma INT IDENTITY(1,1) PRIMARY KEY,
    cantidadMerma FLOAT NOT NULL DEFAULT 0.0,
    fechaMerma DATETIME,
    descripcion VARCHAR(100) NOT NULL DEFAULT '',
    idProducto INT,
    idDetalle_producto INT,
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto),
    FOREIGN KEY (idDetalle_producto) REFERENCES Detalle_producto(idDetalle_producto)
);
GO

CREATE TABLE merma_inventario (
    idMerma INT IDENTITY(1,1) PRIMARY KEY,
    cantidadMerma FLOAT NOT NULL DEFAULT 0.0,
    fechaMerma DATETIME NOT NULL DEFAULT GETDATE(),
    idMateriaPrima INT,
    idDetalle_materia_prima INT,
    FOREIGN KEY (idMateriaPrima) REFERENCES MateriaPrima(idMateriaPrima),
    FOREIGN KEY (idDetalle_materia_prima) REFERENCES Detalle_materia_prima(idDetalle_materia_prima)
);
GO

CREATE TABLE Receta (
    idReceta INT IDENTITY(1,1) PRIMARY KEY,
    idMedida INT,
    idProducto INT,
    FOREIGN KEY (idMedida) REFERENCES Medida(idMedida),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);
GO

CREATE TABLE Detalle_receta (
    idDetalle_receta INT IDENTITY(1,1) PRIMARY KEY,
	cantidadMateriaPrima INT NOT NULL,
	medidaIngrediente INT NOT NULL,
    idMateriaPrima INT,
    idReceta INT,
    FOREIGN KEY (idMateriaPrima) REFERENCES MateriaPrima(idMateriaPrima),
	FOREIGN KEY (medidaIngrediente) REFERENCES Medida(idMedida),
    FOREIGN KEY (idReceta) REFERENCES Receta(idReceta)
);
GO

CREATE TABLE Venta (
    idVenta INT IDENTITY(1,1) PRIMARY KEY,
    fechaVenta DATETIME NOT NULL DEFAULT GETDATE(),
    total FLOAT NOT NULL DEFAULT 0.0,
	idUsuario INT,
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);
GO

CREATE TABLE DetalleVenta (
    idDetalleVenta INT IDENTITY(1,1) PRIMARY KEY,
    cantidad FLOAT NOT NULL DEFAULT 0.0,
    subtotal FLOAT NOT NULL DEFAULT 0.0,
    idVenta INT,
    idProducto INT,
    FOREIGN KEY (idVenta) REFERENCES Venta(idVenta),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);
GO

CREATE TABLE Movimiento (
    idMovimiento INT IDENTITY(1,1) PRIMARY KEY,
    fechaMovimiento DATETIME NOT NULL DEFAULT GETDATE(),
    tipoMovimiento VARCHAR(45) NOT NULL DEFAULT '',
    monto FLOAT NOT NULL DEFAULT 0.0,
    idVenta INT,
    idMateriaPrima INT,
    FOREIGN KEY (idVenta) REFERENCES Venta(idVenta),
    FOREIGN KEY (idMateriaPrima) REFERENCES MateriaPrima(idMateriaPrima)
);
GO

CREATE TABLE SolicitudProduccion (
    idSolicitud INT IDENTITY(1,1) PRIMARY KEY,
    fechaSolicitud DATETIME NOT NULL DEFAULT GETDATE(),
	estatus INT NOT NULL DEFAULT 1,
    idVenta INT,
	idUsuario INT,
    FOREIGN KEY (idVenta) REFERENCES Venta(idVenta),
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);
GO

CREATE TABLE PasoReceta (
    idPasoReceta INT IDENTITY(1,1) PRIMARY KEY,
	paso INT,
    descripcion VARCHAR(255) NOT NULL,
    idProducto INT,
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);
GO

CREATE TABLE Pago (
    idPago INT IDENTITY(1,1) PRIMARY KEY,
    fechaPago DATETIME NOT NULL DEFAULT GETDATE(),
    monto FLOAT NOT NULL DEFAULT 0.0,
    metodoPago VARCHAR(20) NOT NULL,  -- 'tarjeta' o 'efectivo'
    idVenta INT,
    FOREIGN KEY (idVenta) REFERENCES Venta(idVenta)
);
GO

CREATE TABLE Tarjeta (
    idTarjeta INT IDENTITY(1,1) PRIMARY KEY,
    numeroTarjeta VARCHAR(16) NOT NULL,
    nombreTitular VARCHAR(100) NOT NULL,
    fechaExpiracion VARCHAR(5) NOT NULL,  -- formato MM/AA
    cvv VARCHAR(4) NOT NULL,
    idPago INT,
    FOREIGN KEY (idPago) REFERENCES Pago(idPago)
);
GO

CREATE TABLE Efectivo (
    idEfectivo INT IDENTITY(1,1) PRIMARY KEY,
    montoRecibido FLOAT NOT NULL DEFAULT 0.0,
    cambioDevuelto FLOAT NOT NULL DEFAULT 0.0,
    idPago INT,
    FOREIGN KEY (idPago) REFERENCES Pago(idPago)
);
GO

CREATE TABLE Paqueteria (
    idPaqueteria INT IDENTITY(1,1) PRIMARY KEY,
    nombrePaqueteria VARCHAR(100) NOT NULL DEFAULT '',
    telefono VARCHAR(15) NOT NULL DEFAULT '',
    direccion VARCHAR(255) NOT NULL DEFAULT '',
    estatus INT NOT NULL DEFAULT 1
);
GO

CREATE TABLE Envio (
    idEnvio INT IDENTITY(1,1) PRIMARY KEY,
    fechaEnvio DATETIME NOT NULL DEFAULT GETDATE(),
    fechaEntregaEstimada DATETIME,
    fechaEntregaReal DATETIME,
    estatus VARCHAR(20) NOT NULL DEFAULT 'pendiente',  -- 'pendiente', 'en tránsito', 'entregado'
    idVenta INT,
    idPaqueteria INT,
    FOREIGN KEY (idVenta) REFERENCES Venta(idVenta),
    FOREIGN KEY (idPaqueteria) REFERENCES Paqueteria(idPaqueteria)
);
GO

CREATE TABLE detalle_solicitud (
    id_detalle_solicitud INT IDENTITY(1,1) PRIMARY KEY,
    idSolicitud INT,
    fechaInicio DATETIME NOT NULL DEFAULT GETDATE(),
    fechaFin DATETIME,
    idUsuario INT,
    estatus BIT NOT NULL DEFAULT 1,
    numeroPaso INT NOT NULL,
    FOREIGN KEY (idSolicitud) REFERENCES SolicitudProduccion(idSolicitud),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);
GO

CREATE TABLE InventarioReporte (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Tipo VARCHAR(50),
    Nombre VARCHAR(100),
    Cantidad FLOAT,
    UltimaActualizacion DATETIME DEFAULT GETDATE()
);

CREATE TABLE RankingClientes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    IdUsuario INT,
    NombreUsuario VARCHAR(100),
    ComprasTotales FLOAT,
    ProductosComprados TEXT,
    UltimaActualizacion DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario)
);

CREATE TABLE VentasPorProductoPeriodo (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ProductoId INT NOT NULL,
    NombreProducto VARCHAR(100) NOT NULL,
    PeriodoInicio DATETIME NOT NULL,
    PeriodoFin DATETIME NOT NULL,
    NumeroVentas INT NOT NULL,
    CantidadVendida FLOAT NOT NULL,
    TotalRecaudado FLOAT NOT NULL,
    IndicadorGlobal VARCHAR(50) NOT NULL,
    FOREIGN KEY (ProductoId) REFERENCES Producto(IdProducto)
);


