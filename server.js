// const express = require('express');
// const app = express();
// app.use(express.static('public')); // "posluzuje" index.html
// // Automatski koristi sve iz mape public
// app.get('/', (req, res) => {
// res.send("Ili obican tekst ako nema HTML datoteke.");
// });
// app.listen(3000, () => {
// console.log("Server pokrenut na http://localhost:3000");
// });

const express = require('express');
const app = express();
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
res.send('Pozdrav sa Railway servera!');
});
app.listen(PORT, () => {
console.log('Server pokrenut na portu ${PORT}');
});