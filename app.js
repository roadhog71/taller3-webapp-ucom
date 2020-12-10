// Importamos las librerias necesarias para correr nuestro frontend

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3005;

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

const expressSwagger = require('express-swagger-generator')(app);

var mascotasRoutes = require('./routes/mascota');

var categoriaRoutes= require('./routes/categoria');

var clienteRoutes = require('./routes/cliente');

var servicioRoutes = require('./routes/servicio');

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));



var cors = require('cors')

var whitelist = ['*']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin ) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.options('*', cors()) 

app.use(cors())


// Configuramos nuestro api para que genere la documentación de las apis en formato Swagger
let optionsExpressSwagger = {
    swaggerDefinition: {
        info: {
            description: 'Api PETSTORE',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:'+port,
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(optionsExpressSwagger)


// routes ======================================================================
app.use('/mascota', mascotasRoutes);
app.use('/categoria',categoriaRoutes);
app.use('/cliente', clienteRoutes);
app.use('/servicio', servicioRoutes);


// launch ======================================================================

app.listen(port);
console.log('Servidor iniciado, go to http://localhost:' + port);


