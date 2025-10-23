const express = require('express');
var cors = require('cors')

require('dotenv').config();
const db = require('./models');


const app = express();


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));



//RUTAS
const authRoutes = require('./routes/auth.routes'); 
const productoRoutes = require('./routes/producto.routes')
const carritoRoutes = require('./routes/carrito.routes');
const ordenRoutes = require('./routes/orden.routes')




app.use(express.json());
app.use('/api/usuario', authRoutes);
app.use('/api/producto', productoRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/orden', ordenRoutes);





const PORT = process.env.PORT || 3000;



app.get('/', (req, res) => {
  res.send('Hello World!');
});


db.sequelize
  .sync({
    alter: true,
  })
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});