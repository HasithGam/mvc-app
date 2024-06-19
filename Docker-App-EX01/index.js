const express = require('express');
const cors = require("cors");
const catFactRoutes = require('./routes/catFactRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/catfacts', catFactRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to my DOCKER application.'
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
