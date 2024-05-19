// ./images/backgrounds/index.js
function importAll(r) {
    return r.keys().map(r);
  }
  
  const categories = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));
  
  export default categories;
  