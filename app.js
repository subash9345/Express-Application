const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3007;
const dataFilePath = 'users.json';

app.use(bodyParser.json());
app.use(cors());
async function readData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeData(data) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// function validateItem(item) {
//     console.log(item)
//   if (!item || !item.task || !item.description || !item.dueDate || item.isComplete === undefined) {
//     throw new Error('Invalid item data. Please provide task, name, description,date and Complete status.');
//   }
// }

// app.get('/cart', async (req, res) => {
//   try {
//     const items = await readData();
//     res.json(items);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// });

app.get('/cart/:id', async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const items = await readData();
    const item = items.find((item) => item.id === itemId);

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.post('/cart', async (req, res) => {
  try {
    const newItem = req.body;
    // validateItem(newItem);

    const items = await readData();

    newItem.id = items.length + 1;
    items.push(newItem);
    await writeData(items);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: 'Bad request', error: error.message });
  }
});

app.put('/cart/:id', async (req, res) => {
    try {
      const itemId = parseInt(req.params.id);
      const updatedFields = req.body;
      // validateItem(updatedFields); // Assuming validateItem checks the validity of the updated fields
      let items = await readData();
      items = items.map((item) => {
        if (item.id === itemId) {
          // Update only the specified fields in the item
          Object.keys(updatedFields).forEach((key) => {
            if (key in item) {
              item[key] = updatedFields[key];
            }
          });
        }
        return item;
      });
      await writeData(items);
      res.json({ id: itemId, updatedFields });
    } catch (error) {
      res.status(400).json({ message: 'Bad request', error: error.message });
    }
  });

app.delete('/cart/:id', async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    let items = await readData();

    items = items.filter((item) => item.id !== itemId);
    items = items.map((item, index) => ({ ...item, id: index + 1 }));
    await writeData(items);

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
