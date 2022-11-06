import Message from "../components/Message"
import { useEffect,useState } from "react"
import { db } from "../utils/firebase"
import {collection,onSnapshot,orderBy,query} from 'firebase/firestore'
import Link from "next/link"

export default function Home() {

  const [postlar,setPostlar]=useState([])

  const postlarGetir=async ()=>{

    const collectionRef=collection(db,"postlar")
    const q=query(collectionRef,orderBy("tarih","desc"))
    const unsub=onSnapshot(q,(snap)=>{
      setPostlar(snap.docs.map(doc=>({...doc.data(),id:doc.id})))
    })
  }

  useEffect(()=>{
    postlarGetir();
    //console.log(postlar);
  },[])
  

  return (
    <div className="my-12 text-lg font-medium">
      <h2 className="text-3xl">Bütün Postlar</h2>
      {postlar && postlar.map(post=>(
        <Message key={post.id} {...post} >
          <Link href={{pathname:`/${post.id}`,query:{...post}}}>
            <button className="font-medium text-white bg-gray-800 py-2 px-4 rounded-lg">
              ({post.yorumlar?.length > 0 ? post.yorumlar?.length : 0}) Yorum Ekle
            </button>
          </Link>
        </Message>
      ))}
    </div>
  )
}
