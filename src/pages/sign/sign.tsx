import Button from "@mui/material/Button/Button";
import { useEffect, useState } from "react";
import { ethers } from "ethers";


class MetamaskSign {
    public static isMetamaskInstalled(): boolean {
        return typeof window.ethereum !== "undefined";
    }

    public static isMetamaskLocked(): boolean {
        return typeof window.ethereum.isMetaMask !== "undefined" && !window.ethereum.isMetaMask;
    }

    public static getAccount(): string {
        return window.ethereum.selectedAddress;
    }

    public static getProvider(): ethers.providers.JsonRpcProvider {
        return new ethers.providers.Web3Provider(window.ethereum);
    }

    public static getSigner(): ethers.Signer {
        return this.getProvider().getSigner();
    }

    public static async sign(msg: string): Promise<string> {
        try {
            const signer= new ethers.providers.Web3Provider(window.ethereum).getSigner();
            const signature= await signer.signMessage(msg);
            return signature;
        } catch (error: any) {
            return error.toString()
        }
    }

    public static async verify({msg, addr, sig}: {msg:string, addr: string, sig:string}): Promise<boolean>{
        try {
            const signerAddr = await ethers.utils.verifyMessage(msg, sig);
            return addr.toLowerCase() === signerAddr.toLowerCase();
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

/**
 * sign page
 */
const Sign = ()=>{

    const [sig, setSig] = useState('');
    const [accountAdress, setAccountAdress] = useState('');
    

    useEffect(() => {
        if(!MetamaskSign.isMetamaskInstalled())(
            alert('Please open with Metamask')
        )
        if(!MetamaskSign.isMetamaskLocked()){
            window.ethereum.request({ method: 'eth_requestAccounts' }).then(()=>{
                return MetamaskSign.getSigner().getAddress()
            }).then((address:string)=>{
                setAccountAdress(address);
            })
        }
    }, []); 
    
    return (
        <>
            <div style={{height:'100vh',lineHeight:'100vh',textAlign:'center',}}>
                {accountAdress}
                {sig}
                <Button variant="contained" onClick={async ()=>{
                    const s = await MetamaskSign.sign('app metamask sign test');
                    setSig(`${accountAdress}:${s}`)
                    window.location.href = `https://medium.com/@jobinleung/%E4%BD%BF%E7%94%A8universal-link%E5%B7%A7%E5%A6%99%E8%A7%A3%E5%86%B3app%E7%AB%AF%E4%BD%BF%E7%94%A8metamask-app%E6%8E%88%E6%9D%83%E4%BB%A5%E5%8F%8A%E4%BA%A4%E4%BA%92-part-1-ee53bde721a`;
                }}>Sign</Button>
            </div>
        </>
    )
}

export default Sign;