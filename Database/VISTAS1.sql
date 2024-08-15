/*VISTAS*/
select * from usuario;
SELECT * FROM VentasPorProductoPeriodo;

USE SalsasReni;
GO

SELECT * FROM vw_Envio_DetallesWeb;
CREATE VIEW vw_Envio_DetallesWeb AS
SELECT
    e.idEnvio,
    e.idVenta,
    u.idUsuario,
    u.nombre AS nombreCliente,
    CONCAT(
        d.estado, ', ',
        d.municipio, ', ',
        d.codigoPostal, ', ',
        d.colonia, ', ',
        d.calle, ', ',
        d.numExt,
        CASE 
            WHEN d.numInt IS NOT NULL AND d.numInt != '' THEN CONCAT(', ', d.numInt) 
            ELSE '' 
        END, 
        CASE 
            WHEN d.referencia IS NOT NULL AND d.referencia != '' THEN CONCAT(', ', d.referencia) 
            ELSE '' 
        END
    ) AS domicilio,
    e.estatus AS estatusEnvio,
    FORMAT(e.fechaEnvio, 'dd-MM-yyyy') AS fechaEnvio,
    FORMAT(e.fechaEntregaEstimada, 'dd-MM-yyyy') AS fechaEntregaEstimada,
    STRING_AGG(CONCAT(p.nombreProducto, ' (', dv.cantidad, ' x ', p.cantidad, ' ', m.tipoMedida, ')'), ', ') 
        WITHIN GROUP (ORDER BY p.nombreProducto) AS productos,
    v.total AS total
FROM Envio e
LEFT JOIN Paqueteria paq ON e.idPaqueteria = paq.idPaqueteria
LEFT JOIN Venta v ON e.idVenta = v.idVenta
LEFT JOIN Usuario u ON v.idUsuario = u.idUsuario
LEFT JOIN Direccion d ON u.idDireccion = d.idDireccion
LEFT JOIN DetalleVenta dv ON v.idVenta = dv.idVenta
LEFT JOIN Producto p ON dv.idProducto = p.idProducto
LEFT JOIN Medida m ON p.idMedida = m.idMedida
GROUP BY 
    e.idEnvio, 
    e.idVenta,
    u.idUsuario, 
    u.nombre, 
    d.estado, 
    d.municipio, 
    d.codigoPostal, 
    d.colonia, 
    d.calle, 
    d.numExt, 
    d.numInt, 
    d.referencia, 
    e.estatus, 
    e.fechaEnvio, 
    e.fechaEntregaEstimada,
	v.total,
    p.cantidad,  
    m.tipoMedida; 



/*-------------------------*/
CREATE VIEW vw_Envio_Detalles AS
SELECT
    e.idEnvio,
    e.estatus AS EstatusPedido,
    FORMAT(e.fechaEnvio, 'dd-MM-yyyy') AS fechaEnvio,
    FORMAT(e.fechaEntregaEstimada, 'dd-MM-yyyy') AS fechaEntregaEstimada,
    e.estatus AS estatusEnvio,
    paq.nombrePaqueteria, 
    u.nombre AS nombreCliente,
    p.nombreProducto,
    CONCAT(
        d.estado, ', ',  
        d.municipio, ', ',
        d.codigoPostal, ', ',
        d.colonia, ', ',
        d.calle, ', ',
        d.numExt,
        CASE 
            WHEN d.numInt IS NOT NULL AND d.numInt != '' THEN CONCAT(', ', d.numInt) 
            ELSE '' 
        END, 
        CASE 
            WHEN d.referencia IS NOT NULL AND d.referencia != '' THEN CONCAT(', ', d.referencia) 
            ELSE '' 
        END
    ) AS domicilio,
    v.total AS total
FROM Envio e
LEFT JOIN Paqueteria paq ON e.idPaqueteria = paq.idPaqueteria
LEFT JOIN Venta v ON e.idVenta = v.idVenta
LEFT JOIN Usuario u ON v.idUsuario = u.idUsuario
LEFT JOIN Direccion d ON u.idDireccion = d.idDireccion
LEFT JOIN SolicitudProduccion sp ON v.idVenta = sp.idSolicitud
LEFT JOIN DetalleVenta dv ON v.idVenta = dv.idVenta
LEFT JOIN Producto p ON dv.idProducto = p.idProducto;
GO




/*-------------------------*/
CREATE VIEW vw_Producto_Detalle AS
SELECT
	p.idProducto,
	p.nombreProducto,
	p.precioVenta,
	p.precioProduccion,
	p.cantidad,
	dp.cantidadExistentes AS 'Stock',
	m.tipoMedida,
	p.fotografia,
	p.estatus
	
FROM	
	Producto p
LEFT JOIN Medida m ON p.idMedida = m.idMedida
LEFT JOIN Detalle_producto dp ON p.idProducto = dp.idProducto;

GO

/*-------------------------*/
CREATE VIEW vw_Detalle_Receta_Producto AS
SELECT 
    p.idProducto,
	mp.idMateriaPrima,
	mp.nombreMateria,
	dr.cantidadMateriaPrima,
	m.idMedida,
    m.tipoMedida AS MedidaProducto,
	dr.idReceta
FROM 
    Producto p
INNER JOIN 
    Receta r ON p.idProducto = r.idProducto
INNER JOIN 
    Medida m ON p.idMedida = m.idMedida
INNER JOIN 
    Detalle_receta dr ON r.idReceta = dr.idReceta
INNER JOIN 
    MateriaPrima mp ON dr.idMateriaPrima = mp.idMateriaPrima;
GO

/*-------------------------------*/
CREATE VIEW vw_MateriaPrima_Detalle AS
SELECT
	mp.idMateriaPrima,
	mp.nombreMateria,
	m.tipoMedida
FROM	
	MateriaPrima mp
LEFT JOIN Medida m ON mp.idMedida = m.idMedida;
GO
