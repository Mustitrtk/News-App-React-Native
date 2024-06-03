const express = require('express');
require('dotenv').config();
const app = express();
const parser = require('body-parser');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const cors = require('cors');

const UserRouter = require('./routes/UserRouter');
const RoleRouter = require('./routes/RoleRouter');
const CategoryRouter = require('./routes/CategoryRouter');
const NewsRouter = require('./routes/NewsRouter');
const CommentRouter = require('./routes/CommentRouter')

// DB CONNECTION
const db = require('./config/db');
db();

// ROLE SEEDER
const roleSeeder = require('./seeder/roleSeeder');
// roleSeeder() // Her seferinde çalışmaması için ilk çalıştırmadan sonra yorum satırına alın.

// Use parser for post size
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(cookieParser()); // Add cookie-parser middleware
app.use(cors());

app.use('/user', UserRouter);
app.use('/role', RoleRouter);
app.use('/category', CategoryRouter);
app.use('/news', NewsRouter);
app.use('/comment',CommentRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT}`);
});
