const fs = require('fs');

let users = [];

// Load users data from file
try {
    users = JSON.parse(fs.readFileSync('data/users.json'));
} catch (error) {
    console.log('Error reading users data from file:', error);
}

// Function to save users data to file
function saveUsersToFile() {
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2));
}


const createUser = (req, res) => {

  let body = '';
  req.on('data', chunk => {
      body += chunk.toString();
  });
  req.on('end', () => {
      const newUser = JSON.parse(body);
      users.push(newUser);
      saveUsersToFile();
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User created successfully', user: newUser }));
  });
}

const authenticateUser = (req, res) => {
  let body = '';
  req.on('data', chunk => {
      body += chunk.toString();
  });
  req.on('end', () => {
      const credentials = JSON.parse(body);
      const { username, password } = credentials;
      const foundUser = users.find(user => user.username === username && user.password === password);
      if (foundUser) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Authentication successful', user: foundUser }));
      } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Authentication failed' }));
      }
  });
}

const getAllUsers = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}

module.exports = {createUser, authenticateUser, getAllUsers}

