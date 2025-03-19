const express = require('express');
const path = require('path'); // Required to serve static files
// const cors = require('cors');

const app = express();
// app.use(cors());
app.use(express.static(path.join())); // Serve static files
app.use(express.json());

let products = [];
let idCounter = 1;

app.get('/', (req, res) => {
    // res.send('Welcome to the Products API!');
    res.sendFile(path.join('index.html'));
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const newProduct = { id: idCounter++, name, price };
    products.push(newProduct);
    res.json({ message: 'Product added!', product: newProduct });
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id); // Convert id to a number if it's numeric
    const product = products.find(p => p.id === productId); // Find the product by id

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = products.find(p => p.id == id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = name || product.name;
    product.price = price || product.price;
    res.json({ message: 'Product updated!', product });
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    products = products.filter(p => p.id != id);
    res.json({ message: 'Product deleted!' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
