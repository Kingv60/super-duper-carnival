const express = require('express');
const bodyParser = require('express').json;
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const sharedListRoutes = require('./routes/sharedListRoutes');  
const profileRoutes = require('./routes/profile'); // <-- added
const userRoutes = require('./routes/userRoutes');


const errorMiddleware = require('./middleware/errorMiddleware');
const { sequelize } = require('./models');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser());

// Serve upload folder
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Logging middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/shared', sharedListRoutes);
app.use('/api/profile', profileRoutes); 
app.use('/api/users', userRoutes);// <-- added

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Failed syncing database:', err));
