// ./images/backgrounds/index.js
function importAll(r) {
    return r.keys().map(r);
  }
  
  const backgrounds = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));
  
  export default backgrounds;
  