import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database';
import bookRoutes from './src/routes/book.Routes';
import userRoutes from './src/routes/user.Routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swagger';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser()); // Middleware untuk mengelola cookie
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

connectDB()

export default app;