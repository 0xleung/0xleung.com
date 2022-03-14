import Button from "@mui/material/Button/Button";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";

const ILink = styled('a')({
    textDecoration: 'none',
    color: '#000',
    fontWeight: 'bold',
    position: 'relative',
    top: '-5px',
    textTransform: 'uppercase',
    ':active': {
        color: '#000',
    }
});

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
            // connect wallet
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(()=>{
                // get signer address
                return MetamaskSign.getSigner().getAddress()
            }).then((address:string)=>{
                setAccountAdress(address);
            })
        }
    }, []); 
    
    return (
        <>
            <div style={{height:'100vh',lineHeight:'100vh',textAlign:'center',}}>
                <Box sx={{
                    display: 'none',
                }}>
                {accountAdress}
                <ILink href={`https://www.0xleung.com/authed/${sig}`} target="_blank" rel="noopener noreferrer">
                    BACK
                </ILink>
                {sig}
                </Box>
                <Button variant="contained" onClick={async ()=>{
                    const s = await MetamaskSign.sign('app metamask sign test');
                    setSig(`${accountAdress}:${s}`)
                    // window.location.href = `https://www.0xleung.com/${s}`;
                    // window.open(`https://www.0xleung.com/authed/${s}`, '_blank')
                }}>Sign</Button>
            </div>
        </>
    )
}

export default Sign;