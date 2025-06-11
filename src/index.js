const express = require('express')
const app = express()
//const port = 5001
const mongoose = require("mongoose")
//const quotes = require('./quotes.json')
const userRouter = require('./routes/userRoutes')
const noteRouter =require('./routes/noteRoute')


app.use(express.json())

app.use('/users',userRouter)
app.use('/notes',noteRouter);


app.get('/', (req, res) => {
  res.send('Hello World!')
})




mongoose.connect("")
.then(()=>{
  app.listen(5001, () => {
  console.log(` Server running at http://localhost:${port}`)
  });
}).catch((error)=>{
  console.log(error)
})

