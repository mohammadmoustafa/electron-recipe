const path = require('path');

function srcPath(subdir) { 
  return path.join(__dirname, "src", subdir);
}

module.exports = {
  resolve: {  
    alias: {    
      "@components": path.join(__dirname, 'src', 'components'),
      "@style": path.join(__dirname, 'src', 'style'),
      "@store": path.join(__dirname, 'src', 'store'),
      "@assets": path.join(__dirname, 'src', 'assets')
    }
  },
}