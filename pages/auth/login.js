import {FcGoogle} from 'react-icons/fc'
import {auth} from '../../utils/firebase'
import {GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
import { useRouter } from 'next/router'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect } from 'react'

const Login = () => {

    const googleProvider=new GoogleAuthProvider();
    const router=useRouter();

    const [user,loading]=useAuthState(auth);

    const GoogleLogin=async ()=>
    {
        try {
            const result=await signInWithPopup(auth,googleProvider);
            console.log(result);
            if(result){
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(user){
            router.push('/')
        }else{
            console.log('login');
        }
    },[user])


    if(loading){
        return (
            <h1 className='text-3xl'>Kontrol ediliyor...</h1>
        )
    }

    return (  
       <div className='shadow-xl mt-32 p-10 text-gray-700 rounded-lg'>
            <h2 className='text-2xl font-medium'>Giriş Yapınız</h2>
            <div className='py-4'>
                <button className='text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2' onClick={GoogleLogin}>
                    <FcGoogle className='text-2xl' /> Google ile Giriş Yap
                </button>
            </div>
       </div>
    );
}
 
export default Login;