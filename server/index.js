import 'dotenv/config'
import express from 'express'

const app = express();

const port = process.env.PORT||3000

app.get('/api/products',(req, res)=>{
    const products = [
        {
            id:1,
            name:'rahul',
            city: 'bhopal'
        }, {
            id:2,
            name:'Sita',
            city: 'mithla'
        },{
            id:3,
            name:'ram',
            city: 'ayodhya'
        },{
            id:4,
            name:'indra',
            city: 'indore'
        },{
            id:5,
            name:'shiva',
            city: 'kailash'
        }
    ]
    ////search query
    if(req.query.search){
        const filterProducts = products.filter(product => product.name.includes(req.query.search))
        res.send(filterProducts);
        return;
    }

    // timeout to delay our response for checking purpose
    setTimeout(()=>{
        res.send(products);
    }, 3000)
})

app.listen(port,()=>{
    console.log(`Server is runnning on port ${port}`)
})