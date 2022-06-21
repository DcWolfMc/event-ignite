import { gql, useQuery } from "@apollo/client"
import { useEffect } from "react"
import { client } from "./lib/apollo"
const GET_LESSONS_QUERY = gql`
query{
  lessons{
    id
    title
  }
}
`
function App() {

  const { data } = useQuery(GET_LESSONS_QUERY)
  console.log(data);
  
  /*
  useEffect(()=>{
    client.query({
      query: GET_LESSONS_QUERY,
    }).then (response =>{
      console.log(response.data);
    })
  },[])*/


  return (
    <h1 className="text-5xl font-bold text-violet-400">Hello  World</h1>
  )
}

export default App
