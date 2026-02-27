require("dotenv").config();

const PORT = 3000;
const app = require('./src/app');

app.listen(PORT,()=> {
    console.log(`App listening to port ${PORT}`);
});
