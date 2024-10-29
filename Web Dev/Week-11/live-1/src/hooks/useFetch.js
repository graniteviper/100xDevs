import { useEffect, useState } from "react";

export function usePostTitle(){

    const [post, setpost] = useState({})
    
    async function getPosts(){
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();
        setpost(data);
    }

    useEffect(()=>{
        getPosts();
    },[])

    return post.title;
    
}