import Button from "@mui/material/Button/Button";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";

const saAddress = "0x07d3a60B8E8d2f542b11fFcC8B241D674DFa6d83";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const saAbi = [
  // Some details about the token
  "function name() view returns (string)",
  "function symbol() view returns (string)",

  // Get the account balance
  "function balanceOf(address) view returns (uint)",

  "function tokenURI(uint256 tokenId) external view returns (string memory)",

  "function baseURI() public view virtual returns (string memory)",
];

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

  public static async getTokenURI(tokenId: string): Promise<string> {
      const provider = this.getProvider();
      console.log(provider);
    const saContract: ethers.Contract = new ethers.Contract(saAddress, saAbi, provider);
    return await saContract.tokenURI(tokenId)
  }

  public static async baseURI(): Promise<string> {
    const provider = this.getProvider();
    console.log(provider);
  const saContract: ethers.Contract = new ethers.Contract(saAddress, saAbi, provider);
  return await saContract.baseURI()
}

}

/**
 * sign page
 */
 const PlayGround = ()=>{

  const [sig, setSig] = useState('');
  const [accountAdress, setAccountAdress] = useState('');
  const [tokenId, setTokenId] = useState('');
  

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
            console.log(address)
              setAccountAdress(address);
          })
      }else{
          alert('Please unlock Metamask')
      }
  }, []); 
  
  return (
      <>
          <div style={{height:'100vh',lineHeight:'100vh',textAlign:'center',}}>
              <input type="text" name="tokenid" id="tokenid" onChange={(event)=>{
                console.log(event.target.value)
                setTokenId(event.target.value)
              }}/>
              <button onClick={async ()=>{
                let u:string = await MetamaskSign.getTokenURI(tokenId);
                console.log(u, '111')
                let base:string = await MetamaskSign.baseURI();
                console.log(u, 'base')
              }}>getToken uri</button>
          </div>
      </>
  )
}

export default PlayGround;