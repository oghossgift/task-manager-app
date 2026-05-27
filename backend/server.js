const express = require('express');
const pool = require('./db'); // Importing database connection
const app = express();

app.use(express.json());


//------- ROUTES --------

// 'Add Task' endpoint - CREATE
app.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 'Get Tasks' endpoint - READ
app.get('/tasks', async (req, res) => {
  try {
    // We use SELECT * to get every column, and ORDER BY to see the newest ones first
    const allTasks = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
    
    // Send the rows back to the user as a JSON array
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 'Mark a task as completed or change the title' endpoint - UPDATE
app.put('/tasks/:id', async (req, res) => {

  try {
    const { id } = req.params; // Get ID from the URL (e.g., /tasks/1)
    const { is_completed } = req.body; // Get the new status from the JSON body

    const updateTask = await pool.query(
      'UPDATE tasks SET is_completed = $1 WHERE id = $2 RETURNING *',
      [is_completed, id]
    );

    if (updateTask.rows.length === 0) {
      return res.status(404).json("Task not found");
    }

    res.json("Task was updated!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

// 'Remove Task' endpoint - DELETE
app.delete('/tasks/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const deleteTask = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
   
    res.json("Task was deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});



if (require.main === module) {
  app.listen(3000, () => console.log('Server running on port 3000'));
}

module.exports = app;

