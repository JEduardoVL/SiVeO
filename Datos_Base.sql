use SiVeO; 

insert into categorias(id,descripcion)
values
('1','Categoria 1'),
('2','Categoria 2'),
('3','Categoria 3');

insert into proveedores(pass,nombre,direccion,telefono)
values
('a','Proveedor 1','Direccion 1','5581623048'),
('b','Proveedor 2','Direccion 2','5581623048'),
('c','Proveedor 3','Direccion 3','5581623048');

insert into clientes (nombre,direccion,telefono)
values 
('Ejemplo 1','Direccion 1','5598632141'),
('Ejemplo 2','Direccion 2','5598632141'),
('Ejemplo 3','Direccion 3','5598632141');

insert into facturas(fecha,cliente_id) 
values
('2023-06-17',1),
('2023-06-17',3),
('2023-06-17',2);

insert into productos(descripcion,proveedor_id,categoria_id,precio)
values
('Descripcion 1',1,2,'25.50'),
('Descripcion 2',3,1,'50.50'),
('Descripcion 3',2,3,'10');

-- Insertar registros en la tabla ventas
INSERT INTO ventas (cantidad, factura_id, producto_id)
VALUES 
('20', 2, 1), 
('30', 1, 2), 
('5', 3, 3);  
