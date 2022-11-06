
import {auth,db} from '../utils/firebase';
import {addDoc,collection,serverTimestamp,updateDoc,doc} from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useState,useEffect } from "react";
import Router from 'next/router'
import {toast} from 'react-toastify'
import { useRouter } from 'next/router';


const Post = () => {

    const [post,setPost]=useState({aciklama:''})
    const [user,loading]=useAuthState(auth);
    const router=useRouter();
    const routerData=router.query;
   
    

    const kullaniciKontrol=async ()=>{
        if(loading) return;
        if(!user) router.push('/auth/login')

        if(routerData.id){
            setPost({aciklama:routerData.aciklama,id:routerData.id})
        }
    }

    useEffect(()=>{
        kullaniciKontrol();
    },[user,loading])

    const handleSubmit=async (e)=>{
        e.preventDefault();

        if(!post.aciklama){
            toast.error("Açıklama Alanı Boş Geçilemez",{
                position:toast.POSITION.TOP_CENTER,
                autoClose:1500
            })

            return;
        }

        
        if(post?.hasOwnProperty("id")){

            

            const docRef=doc(db,"postlar",post.id);
            const guncelPost={...post,tarih:serverTimestamp()}

            await updateDoc(docRef,guncelPost)

            toast.success("Post Güncellendi",{
                position:toast.POSITION.TOP_CENTER,
                autoClose:1500
            })

            return router.push("/")

        }else{
            const collectionRef=collection(db,"postlar")
            await addDoc(collectionRef,{
                ...post,
                tarih:serverTimestamp(),
                kullaniciAd:user.displayName,
                avatar:user.photoURL,
                kullaniciId:user.uid
            })

            toast.success("Post Oluşturuldu",{
                position:toast.POSITION.TOP_CENTER,
                autoClose:1500
            })

            setPost({aciklama:''})
            return router.push('/')

        }
        
        
        
    }

    return ( 
        <div className="my-20 p-12 shadow-lg rounded-lg max-w-lg mx-auto">
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold">{post.hasOwnProperty('id')? 'Post Güncelle':'Yeni Post Ekle'}</h1>
                <div className="py-2">
                    <h3 className="text-lg font-medium py-2">Açıklama</h3>
                    <textarea className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-xl" value={post.aciklama} onChange={(e)=>setPost({...post,aciklama:e.target.value})}></textarea>
                    <p className={`text-cyan-500 font-medium text-sm ${post.aciklama.length >300 ? "text-red-500":""}`}>{post.aciklama.length}/300</p>
                </div>
                <button className={`w-full bg-orange-500 text-white font-bold p-2 my-2 rounded-aos text-2xl hover:bg-orange-700 ${post.aciklama.length >300 ? "bg-stone-800 hover:bg-stone-800":""}`} disabled={post.aciklama.length >300}>
                    {post.aciklama.length < 300 ?"Gönder":"Metin Sınırı Aşıldı"}
                </button>
            </form>
        </div>
     );
}
 
export default Post;