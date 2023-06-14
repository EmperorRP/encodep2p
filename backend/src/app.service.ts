import { Injectable } from '@nestjs/common';
import{Contract, ethers} from "ethers";
import * as p2p from "./assets/p2p.json";
import { ConfigService } from '@nestjs/config';
import { SellDto } from './dtos/SellDto';
import { SellerListDto } from './dtos/SellerListDto';
import {ResponseDto} from './dtos/ResponseDto';
import {BuyOrderDto} from './dtos/BuyOrderDto';

@Injectable()
export class AppService {

   provider: ethers.providers.BaseProvider ;
   apiKey: string;
   signer: ethers.Wallet;
   p2pContract: ethers.Contract;

   constructor(private configService: ConfigService){
    this.apiKey=this.configService.get<string>('ETHERSCAN_API_KEY');
    this.provider= new ethers.providers.EtherscanProvider('sepolia',this.apiKey);
   //  this.provider = ethers.getDefaultProvider("sepolia");
     const pkey=this.configService.get<string>('PRIVATE_KEY');
    const wallet=new ethers.Wallet(pkey);
    this.signer=wallet.connect(this.provider);
    this.p2pContract = new Contract(this.configService.get<string>('P2PADDRESS'), p2p.abi, this.provider);
   }
  getHello(): string {
    return 'Hello World!';
  }

  getLastBlock(): Promise<ethers.providers.Block> {

   return this.provider.getBlock("latest");
  }

  async getTransactionReceipt(hash: string){
    const tx= await this.provider.getTransaction(hash);
    const receipt=await tx.wait();
     return receipt;
  }


  async sellToken(sellDto : SellDto){ 
    const returnVal = await this.p2pContract.connect(this.signer).postSellOrder(sellDto.address,sellDto.token,sellDto.amount,sellDto.exchangeToken,sellDto.unitAmount);
    console.log(returnVal);
    var txn= await this.getTransactionReceipt(returnVal.hash);
    var response:ResponseDto = new ResponseDto();
     if(txn.status ==1){
        response.status="Success";
     }
     else if(txn.status==0)
     {
        response.status="Failure";
     }
     response.data= "https://sepolia.etherscan.io/tx/"+returnVal.hash;
    return response;
  }

   async displayList(){
     const returnVal = await this.p2pContract.connect(this.signer).getSellOrders();
     console.log(returnVal);
     console.log(returnVal[0].availableTokens.toNumber());
     var response:ResponseDto = new ResponseDto();
     var sellersList:SellerListDto[] = new Array();
     if(returnVal.length>0){
      
    
      for(var i=0; i<returnVal.length; i++){
        if(returnVal[i].availableTokens.toNumber()!=0){
          var seller = {token: returnVal[i].tokenId.toString() , address: returnVal[i].sellerAddress,
           amount:returnVal[i].availableTokens.toNumber(),requestId:returnVal[i].sellOrderId.toNumber(),
           exchangeToken: returnVal[i].exchangeToken.toString(), unitAmount: returnVal[i].pricePerToken.toNumber()};
           sellersList.push(seller);
          }
      }
    }
    if(sellersList.length>0){
      response.status="Success";
      response.data=sellersList; 
      return response; 
     }
     else{
      response.status="Failure";
      response.data="No tokens Listed";
     }
    
   } 

   async displayListForToken(token: string){
    return this.p2pContract.getSellersListForToken(token);
   }

   async processBuyOrder(procssOrderDto: BuyOrderDto){
      const returnVal = await this.p2pContract.connect(this.signer).processBuyOrder(procssOrderDto.address,procssOrderDto.sellOrderID,procssOrderDto.tokenId,procssOrderDto.amount);
      console.log(returnVal);
      var txn= await this.getTransactionReceipt(returnVal.hash);
      var response:ResponseDto = new ResponseDto();
       if(txn.status ==1){
          response.status="Success";
       }
       else if(txn.status==0)
       {
          response.status="Failure";
       }
       response.data= "https://sepolia.etherscan.io/tx/"+returnVal.hash;
      return response;
   }

}
