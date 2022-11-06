
import {auth,db} from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useEffect,useState } from 'react';
import {collection,onSnapshot,query,where,deleteDoc,doc} from 'firebase/firestore'
import Message from '../components/Message';
import {BsTrash2Fill} from 'react-icons/bs'
import {AiFillEdit} from 'react-icons/ai'
import Link from 'next/link';

const Dashboard = () => {

    const router=useRouter();
    const [user,loading]=useAuthState(auth);
    const [posts,setPosts]=useState([])

    const postSil=async (id)=>{
        const docRef=doc(db,"postlar",id);
        await deleteDoc(docRef)
    }

    const getData=async()=>{
        if(loading) return;
        if(!user) return router.push('/auth/login')

        const collectionRef=collection(db,"postlar");
        const q=query(collectionRef,where("kullaniciId","==",user.uid))
        const unsub=onSnapshot(q,(snap)=>{
            setPosts(snap.docs.map(doc=>({...doc.data(),id:doc.id})))
          })
    }

    useEffect(()=>{
        getData();
    },[user,loading])

    return ( 
        <div>
            <h2 className='text-3xl'>Postlarınız</h2>
            <div>
                {posts.map((post)=>{
                    return (
                        <Message key={post.id} {...post}>
                            <div className='flex gap-4 justify-end'>
                                <button onClick={()=>postSil(post.id)} className='text-rose-700 flex items-center justify-center gap-2 py-2 text-sm'>
                                    <BsTrash2Fill className='text-3xl' />
                                </button>
                                <Link href={{pathname:"/post",query:post}}>
                                <button className='text-green-600 flex items-center justify-center gap-2 py-2 text-sm'>
                                    <AiFillEdit className='text-3xl' />
                                </button>
                                </Link>
                            </div>
                        </Message>
                    )
                })}
            </div>
            <button className='font-medium text-white bg-gray-800 py-2 px-4 my-6 rounded-lg' onClick={()=>auth.signOut()}>Çıkış</button>
        </div>
     );
}
 
export default Dashboard;