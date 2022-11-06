import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import Message from "../components/Message";

import {auth,db} from '../utils/firebase'
import {toast} from 'react-toastify'
import {arrayUnion,doc,updateDoc,Timestamp,onSnapshot} from 'firebase/firestore'

import Image from "next/image";
import moment from "moment";
import 'moment/locale/tr'

const Detay = () => {

    const router=useRouter();
    const routerData=router.query;

    const [yorum,setYorum]=useState("");
    const [tumYorumlar,setTumYorumlar]=useState([]);

    const handleYorumYap=async ()=>{
        //console.log(yorum);
        if(!auth.currentUser) return router.push("/auth/login")

        if(!yorum){
            toast.warning("Yorum alanı boş geçilemez",{
                position:toast.POSITION.BOTTOM_LEFT,
                autoClose:1500      
            });

            return;

        }

        const docRef=doc(db,"postlar",routerData.id);

        await updateDoc(docRef,{
            yorumlar:arrayUnion({
                yorum,
                avatar:auth.currentUser.photoURL,
                kullaniciAd:auth.currentUser.displayName,
                tarih:Timestamp.now()
            })
        })

        setYorum("")

    }


    const yorumlarGetir=async ()=>{
        const docRef=doc(db,"postlar",routerData.id);
        const unsub=onSnapshot(docRef,(snap)=>{
            setTumYorumlar(snap.data().yorumlar)
        })
    }

    useEffect(()=>{
        if(!router.isReady) return;
        yorumlarGetir();
    },[router.isReady])

    return ( 
        <div>
            <Message {...routerData} />
            <div className="my-4">
                <div className="flex">
                    <input onChange={(e)=>setYorum(e.target.value)} type="text" value={yorum} placeholder="Yorum Yap" className="bg-gray-800 w-full p-2 text-white text-sm" />
                    <button onClick={handleYorumYap} className="bg-cyan-500 text-white py-2 px-4 text-sm">Gönder</button>
                </div>

                <div className="py-6">
                    <h2 className="font-bold">Yorumlar</h2>
                   {tumYorumlar?.map((y)=>(
                     <div className="bg-white p-4 my-4 border-2" key={y.tarih}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 mb-4">
                            <Image src={y.avatar} width={40} height={40} alt="resim" className="w-10 rounded-full"/>
                            <h2>{y.kullaniciAd}</h2>
                            </div>
                            <span>{moment(new Date(y.tarih.toDate())).fromNow()}</span>
                        </div>
                        <h2>{y.yorum}</h2>
                     </div>
                   ))}
                </div>
            </div>
        </div>
     );
}
 
export default Detay;