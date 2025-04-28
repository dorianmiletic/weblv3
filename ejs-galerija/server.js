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
const fs = require('fs');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Redirect from home page ("/") to images gallery page ("/slike")
app.get('/', (req, res) => {
  res.redirect('/slike');
});

// Route to display the images from the 'public/images' folder
app.get('/slike', (req, res) => {
  const folderPath = path.join(__dirname, 'public', 'images');

  // Use fs.readdirSync to get the list of files, but handle errors
  let files = [];
  try {
    files = fs.readdirSync(folderPath);
  } catch (err) {
    return res.status(500).send('Error reading images directory.');
  }

  // Filter and map the image files to add metadata
  const images = files
    .filter(file => file.endsWith('.jpg') || file.endsWith('.svg'))
    .map((file, index) => ({
      url: `/images/${file}`,
      id: `slika${index + 1}`,
      title: `Slika ${index + 1}`
    }));

  // If no images found, display a message
  if (images.length === 0) {
    return res.send('No images found.');
  }

  // Render the 'slike' template with the images
  res.render('slike', { images });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});