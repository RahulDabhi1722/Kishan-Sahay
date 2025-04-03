const fs = require('fs');
const path = require('path');

// Routes directory
const routesDir = path.join(__dirname, 'routes');

// List all route files
console.log('Checking route files:');
const routeFiles = fs.readdirSync(routesDir);
routeFiles.forEach(file => {
  console.log(`- ${file}`);
  
  try {
    // Try to require each route file
    const routeModule = require(`./routes/${file}`);
    console.log(`  Module loaded successfully`);
  } catch (err) {
    console.error(`  ERROR in ${file}: ${err.message}`);
  }
});

console.log('\nChecking route handlers:');
routeFiles.forEach(file => {
  try {
    const filePath = path.join(routesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Look for suspicious patterns
    if (content.includes('router.use(authorize(')) {
      console.error(`  ISSUE FOUND in ${file}: Using router.use(authorize(...)) directly`);
    }
    
    if (content.includes('undefined') || content.includes('null')) {
      console.error(`  ISSUE FOUND in ${file}: Contains undefined or null`);
    }
  } catch (err) {
    console.error(`  Error reading ${file}: ${err.message}`);
  }
});

console.log('\nDone checking routes.');