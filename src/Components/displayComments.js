import {useParams} from "react-router-dom"
import axios from "axios"
import "./displayComments.css"
import { useEffect,useState } from "react"
export default function DisplayComments()

{ 
    const param=useParams()
    console.log("in");
    const[post,setPost]=useState({})
    const[comments,setComments]=useState([])

    const getPost=async()=>{
        const response=await axios.get(`https://jsonplaceholder.typicode.com/posts/${param.id}`)
        // console.log(response.data)
        setPost(response.data)
    }
    const getComments=async()=>{
        const response=await axios.get((`https://jsonplaceholder.typicode.com/posts/${param.id}/comments`))
        // console.log(response.data)
        setComments(response.data)
    }
    useEffect(()=>{
        console.log("in useEffect mount")
        getPost();
        getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    function PostComments({data})
    {console.log(data.name)
        return(
            <>
            <div className="cardContainer">
                <div className="card1">
                    <div className="cardBody1">
                        <div>
                            <p><b>{data.name}</b></p>
                            <p>{data.email}</p>                          
                        </div>
                        <div>
                        <hr/>
                            <p>{data.body}</p>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }



    return(
        <>  
        <h2>Post</h2>
        <div className="cardContainer">
            <div className="card1">
                <div ><h6>{post.title}</h6></div>
                <hr/>
                <div><p>{post.body}</p></div>
            </div>
        </div>
        <h2>comments</h2>
        {comments.map((a)=>{
            return <PostComments data={a} />
        })}
        </>
    )
    }