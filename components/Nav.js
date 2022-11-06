
import Link from "next/link";
import {auth} from '../utils/firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
const Nav = () => {

    const [user,loading]=useAuthState(auth)

   

    if(loading){
        return (
            <nav className="flex justify-between items-center py-10">
                <h2 className="text-3xl">Kullanıcı Bekleniyor...</h2>
            </nav>
        )
    }
    

    return ( 
        <nav className="flex justify-between items-center py-10">
            <Link href="/">
                <button className="text-3xl">AOS Sosyal Medya</button>
            </Link>
            <ul>
                {!user && (
                    <Link href={"/auth/login"} legacyBehavior>
                        <a className="text-xl font-small py-2 bg-orange-500 px-4 rounded-lg">Giriş</a>
                    </Link>
                )}

                {user && (
                    <div className="flex items-center gap-6">
                        <Link href="/post">
                            <button className="bg-orange-500 text-white py-2 px-4 rounded-lg text-xl">
                                Post
                            </button>
                        </Link>
                        <Link href="/dashboard">
                            {/* <img className="w-12 rounded-full cursor-pointer" src={user?.photoURL} /> */}
                            <Image className="w-12 rounded-full cursor-pointer" src={user.photoURL} width={48} height={48} alt={user.displayName} />
                            
                        </Link>
                    </div>
                )}
            </ul>
        </nav>
     );
}
 
export default Nav;