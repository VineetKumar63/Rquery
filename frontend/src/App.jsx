import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false) //initially set error false
  const [loading, setLoading]=useState()

  const [search, setSearch] = useState('')

  /////to avoid .then we required async await which is not happns into hook(useeffect),. so we can use iife(immetiate invoke function expression)
  useEffect(()=>{

    //////to stop previous serach query and getting data from the last one, to avoid race condition
    const controller = new AbortController()


    ;(async()=>{
      /////semicolon before iife to sure function that previous function ends
      try {
        setLoading(true)
        setError(false) //always set true to avoid unneccessary error effect
        const response = await axios.get('/api/products?search='+search,{
          signal: controller.signal
        })
        console.log(response.data)
        setProducts(response.data)
        setLoading(false) ////you get the data now set loadinfg to false state
      } catch (error) {
        if(axios.isCancel, (error)){
          console.log("Request canceled", error.message)
          return
        } /////handling axios error comes through contoller during query cancellation
        setError(true)
      }
    })()
    return () =>{
      controller.abort()////////to claen contoller and dismounting
    }
  },[search]
)

// if(error){
//   return <h1>Something went wrong</h1>
// }

// if(loading){
//   return <h1>Loading.....</h1>
// }
//instead of this use conditional rendering

  return (
    <>
      <h1>R-query for friends</h1>
      <input type="text" placeholder='Seach here' onChange={(e)=> setSearch(e.target.value)} />
      {loading && (<h1>Loading.....</h1>)}
      {error && (<h1>Something went wrong</h1>)}
      <h2>Number of products are : {products.length}</h2>
    </>
  )
}

export default App
