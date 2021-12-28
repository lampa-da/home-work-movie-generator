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
    
    app.listen(port, ()=> console.log(`listening on port ${port}`))
  }
  catch(ex){
    console.log(ex)
  }
}
init()