import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import bookRoutes from './routes/book.Routes';
import userRoutes from './routes/user.Routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser()); // Middleware untuk mengelola cookie
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


connectDB()
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;