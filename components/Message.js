
import Image from "next/image";

const Message = ({children,kullaniciAd,avatar,aciklama}) => {

    
    return ( 
        <div className="bg-slate-500 p-8 border-b-2 rounded-lg text-white">
            <div className="flex items-center gap-2">
                {/* <img src={avatar}  className="w-10 rounded-full"/> */}
                <Image src={avatar} width={40} height={40} alt="resim" className="w-10 rounded-full"/>
                <h2>{kullaniciAd}</h2>
            </div>
            <div className="py-4">
                <p>{aciklama}</p>
            </div>
            {children}
        </div> 
    );
}
 
export default Message;