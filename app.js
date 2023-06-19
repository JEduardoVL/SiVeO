const express = require('express');

const passport = require('passport')
const cookie = require('cookie-parser')
const session = require('express-session')
const passport_local = require('passport-local').Strategy

const { miConexion } = require('./src/database/db');

const hbs = require('hbs');
const bodyParser = require('body-parser');
const puerto = process.env.PORT || 3000;
const cors = require('cors');
const app = express();



const rutaCategorias = require('./src/routes/categorias-routes-api');
const rutaClientes =require('./src/routes/clientes-routes-api');
const rutaFacturas = require('./src/routes/facturas-routes-api');
const rutaProductos = require('./src/routes/productos-routes-api');
const rutaProveedores = require('./src/routes/proveedores-routes-api');
const rutaVentas = require('./src/routes/ventas-routes-api');

app.set('view engine', 'hbs');
hbs. registerPartials(__dirname + '/views/partials',()=>{});


app.use(express.static('public'));
//Middleware para leer los datos en el body del html cuando se hace el request
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(rutaCategorias);
app.use(rutaClientes);
app.use(rutaFacturas);
app.use(rutaProductos);
app.use(rutaProveedores);
app.use(rutaVentas);


//Middleware que quién putas sepa que hagan pero son para el login
app.use(cookie('Esto debería ir en una varible de entorno'));

app.use(session({
	secret: 'Esto debería ir en una varible de entorno',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passport_local(async (username, password, done, next)=>{
	try {
		const conexion =  miConexion();

		const [results] = await conexion.query('SELECT * FROM proveedores WHERE nombre = ?', [username]);
		if(results.length != 0 && results[0].pass === password){
			return done(null, { id: username, name: 'C' });
		}
		
		return done(null, false);

	} catch (error) {
		return next(error);
	}
}));

passport.serializeUser((user, done)=>{
	done(null, user.id)
});
passport.deserializeUser((username, done)=>{
	done(null, { id: username, name: 'C' })
})


app.get('/',(req,res)=>{
    res.render('login');
})

app.get('/login',(req,res)=>{
    res.render('login');
})
app.post('/login', passport.authenticate('local', {
	successRedirect: '/categorias', 
	failureRedirect: '/login'
}));

app.get('/logout', function(req, res, next){
	req.logout(function(err) {
	  if (err) { return next(err); }
	  res.redirect('/login');
	});
  });

app.get('/clientes',(req,res)=>{
    if(req.isAuthenticated()){
        return res.render('clientes', {usuario: req.user.id});
	}

	return res.redirect('/login');
})

app.get('/categorias',(req,res)=>{

    if(req.isAuthenticated()){
        return res.render('categorias', {usuario: req.user.id});
	}

	return res.redirect('/login');
})

app.get('/ventas',(req,res)=>{
    if(req.isAuthenticated()){
        return res.render('ventas', {usuario: req.user.id});
	}

	return res.redirect('/login');
})

app.get('/facturas',(req,res)=>{
    if(req.isAuthenticated()){
        return res.render('facturas', {usuario: req.user.id});
	}

	return res.redirect('/login');
})

app.get('/proveedores',(req,res)=>{
    if(req.isAuthenticated()){
        return res.render('proveedores', {usuario: req.user.id});
	}

	return res.redirect('/login');
})

app.get('/productos',(req,res)=>{
    if(req.isAuthenticated()){
        return res.render('productos', {usuario: req.user.id});
	}

	return res.redirect('/login');
})

app.get('*',(req,res)=>{
    res.render('404');
})

app.listen(puerto,() =>{
    console.log('El servidor esta corriendo en el puerto : ', puerto);
})

