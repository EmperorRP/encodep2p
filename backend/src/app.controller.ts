import { Controller, Get, Param, Post, Query, Body } from '@nestjs/common';
import{ethers} from "ethers";
import { AppService } from './app.service';
import { SellDto } from './dtos/SellDto';
import {BuyOrderDto} from './dtos/BuyOrderDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
  @Get("last-block")
  getLastBlock() {
    return this.appService.getLastBlock();
  }

  @Get("transaction-receipt/")
  getTransactionReceipt(@Query('hash') hash: string )
  {
    return this.appService.getTransactionReceipt(hash);
  }

  

@Post("sellToken/")
  sellToken(@Body('') body: SellDto){
    console.log("Inside sell method - "+body);
    return this.appService.sellToken(body);
  }

@Get("getAllSellers/")
  getSellersList(){
    console.log("Fetching all Sellers")
    return this.appService.displayList();
  }

  @Post("processBuyOrder")
  processBuyOrder(@Body('') body:BuyOrderDto){
    return this.appService.processBuyOrder(body);
  }

}
