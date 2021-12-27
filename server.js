const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed } = require('./db')
app.use(express.json());

app.use('/api', require('./api'))

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

const init = async()=>{
  try{
    await syncAndSeed()
    const port = process.env.PORT || 3003
    app.listen(port, ()=> console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env))
  }
  catch(ex){
    console.log(ex)
  }
}
init()