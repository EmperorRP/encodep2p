import { ethers } from "ethers";
import { ConfigService } from '@nestjs/config';
import { SellDto } from './dtos/SellDto';
import { ResponseDto } from './dtos/ResponseDto';
import { BuyOrderDto } from './dtos/BuyOrderDto';
export declare class AppService {
    private configService;
    provider: ethers.providers.BaseProvider;
    apiKey: string;
    signer: ethers.Wallet;
    p2pContract: ethers.Contract;
    constructor(configService: ConfigService);
    getHello(): string;
    getLastBlock(): Promise<ethers.providers.Block>;
    getTransactionReceipt(hash: string): Promise<ethers.providers.TransactionReceipt>;
    sellToken(sellDto: SellDto): Promise<ResponseDto>;
    displayList(): Promise<ResponseDto>;
    displayListForToken(token: string): Promise<any>;
    processBuyOrder(procssOrderDto: BuyOrderDto): Promise<ResponseDto>;
}
