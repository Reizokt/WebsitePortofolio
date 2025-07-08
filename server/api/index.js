const app = require('../app'); 

if (require.main === module) { 
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Local server is running on port: ${PORT}`);
    console.log(`Access it at http://localhost:${PORT}`);
  });
}

module.exports = app;