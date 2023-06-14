"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const p2p = require("./assets/p2p.json");
const config_1 = require("@nestjs/config");
const ResponseDto_1 = require("./dtos/ResponseDto");
let AppService = class AppService {
    constructor(configService) {
        this.configService = configService;
        this.apiKey = this.configService.get('ETHERSCAN_API_KEY');
        this.provider = new ethers_1.ethers.providers.EtherscanProvider('sepolia', this.apiKey);
        const pkey = this.configService.get('PRIVATE_KEY');
        const wallet = new ethers_1.ethers.Wallet(pkey);
        this.signer = wallet.connect(this.provider);
        this.p2pContract = new ethers_1.Contract(this.configService.get('P2PADDRESS'), p2p.abi, this.provider);
    }
    getHello() {
        return 'Hello World!';
    }
    getLastBlock() {
        return this.provider.getBlock("latest");
    }
    async getTransactionReceipt(hash) {
        const tx = await this.provider.getTransaction(hash);
        const receipt = await tx.wait();
        return receipt;
    }
    async sellToken(sellDto) {
        const returnVal = await this.p2pContract.connect(this.signer).postSellOrder(sellDto.address, sellDto.token, sellDto.amount, sellDto.exchangeToken, sellDto.unitAmount);
        console.log(returnVal);
        var txn = await this.getTransactionReceipt(returnVal.hash);
        var response = new ResponseDto_1.ResponseDto();
        if (txn.status == 1) {
            response.status = "Success";
        }
        else if (txn.status == 0) {
            response.status = "Failure";
        }
        response.data = "https://sepolia.etherscan.io/tx/" + returnVal.hash;
        return response;
    }
    async displayList() {
        const returnVal = await this.p2pContract.connect(this.signer).getSellOrders();
        console.log(returnVal);
        console.log(returnVal[0].availableTokens.toNumber());
        var response = new ResponseDto_1.ResponseDto();
        var sellersList = new Array();
        if (returnVal.length > 0) {
            for (var i = 0; i < returnVal.length; i++) {
                if (returnVal[i].availableTokens.toNumber() != 0) {
                    var seller = { token: returnVal[i].tokenId.toString(), address: returnVal[i].sellerAddress,
                        amount: returnVal[i].availableTokens.toNumber(), requestId: returnVal[i].sellOrderId.toNumber(),
                        exchangeToken: returnVal[i].exchangeToken.toString(), unitAmount: returnVal[i].pricePerToken.toNumber() };
                    sellersList.push(seller);
                }
            }
        }
        if (sellersList.length > 0) {
            response.status = "Success";
            response.data = sellersList;
            return response;
        }
        else {
            response.status = "Failure";
            response.data = "No tokens Listed";
        }
    }
    async displayListForToken(token) {
        return this.p2pContract.getSellersListForToken(token);
    }
    async processBuyOrder(procssOrderDto) {
        const returnVal = await this.p2pContract.connect(this.signer).processBuyOrder(procssOrderDto.address, procssOrderDto.sellOrderID, procssOrderDto.tokenId, procssOrderDto.amount);
        console.log(returnVal);
        var txn = await this.getTransactionReceipt(returnVal.hash);
        var response = new ResponseDto_1.ResponseDto();
        if (txn.status == 1) {
            response.status = "Success";
        }
        else if (txn.status == 0) {
            response.status = "Failure";
        }
        response.data = "https://sepolia.etherscan.io/tx/" + returnVal.hash;
        return response;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map