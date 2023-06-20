DROP DATABASE IF EXISTS SiVeO;

-- Crear la base de datos SiVeO con el juego de caracteres latin1
CREATE DATABASE SiVeO CHARSET = latin1;

-- Usar la base de datos SiVeO
USE SiVeO;


CREATE TABLE IF NOT EXISTS categorias (
  id INT NOT NULL,
  descripcion VARCHAR(100) NOT NULL,
  CONSTRAINT pk_categorias PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS proveedores (
  id INT NOT NULL AUTO_INCREMENT,
  pass VARCHAR(10) NOT NULL,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  direccion VARCHAR(60),
  telefono VARCHAR(24),
  CONSTRAINT pk_proveedores PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS clientes (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  direccion VARCHAR(60),
  telefono VARCHAR(24),
  CONSTRAINT pk_cliente PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS facturas (
  id INT NOT NULL AUTO_INCREMENT,
  fecha DATE,
  cliente_id INT,
  CONSTRAINT pk_factura PRIMARY KEY (id),
  CONSTRAINT fk_clientes_facturas FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS productos (
  id INT NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(40) NOT NULL,
  proveedor_id INT,
  categoria_id INT,
  precio DECIMAL(19, 4),
  CONSTRAINT pk_producto PRIMARY KEY (id),
  CONSTRAINT fk_categorias_productos FOREIGN KEY (categoria_id) REFERENCES categorias(id),
  CONSTRAINT fk_proveedores_productos FOREIGN KEY (proveedor_id) REFERENCES proveedores(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ventas (
  id INT NOT NULL AUTO_INCREMENT,
  cantidad VARCHAR(10),
  factura_id INT,
  producto_id INT,
  CONSTRAINT pk_venta PRIMARY KEY (id),
  CONSTRAINT fk_facturas_ventas FOREIGN KEY (factura_id) REFERENCES facturas(id) ON DELETE CASCADE,
  CONSTRAINT fk_productos_ventas FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);
/*
select * from categorias;
select * from proveedores;
select * from clientes;
select * from facturas;
select * from productos;
select * from ventas;
/*
DELETE ventas, productos
FROM ventas
INNER JOIN productos ON ventas.producto_id = productos.id
WHERE productos.id = 1 AND ventas.id = 1;

/*
DELETE clientes, facturas 
FROM clientes 
LEFT JOIN facturas ON clientes.id = facturas.cliente_id 
WHERE clientes.id = 6;


INSERT INTO clientes(nombre, direccion, telefono) VALUES('luis', 'casa', '055879140');
UPDATE clientes
SET nombre = 'luis nuevo'
WHERE id = 4;

insert into facturas(nombre,cliente_id) values('factura de luis','6');


*/
-- drop view if exists vNum1;
-- create view vNum1 as
-- select cli.id as clientes_id, fac.id as facturas_id,cli.nombre as nombre_cliente, cli.direccion,cli.telefono,fac.nombre as nombre_fac, fac.cliente_id as cliente_fac 
-- from clientes as cli join facturas as fac
-- on(cli.id = fac.cliente_id);

-- select * from vNum1;
