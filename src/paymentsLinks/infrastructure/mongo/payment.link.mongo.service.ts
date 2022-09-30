import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import mongodb = require('mongodb');
import { PaymentLink, PaymentLinkDocs } from "../../domain/payment.link.schema";
import { PaymentLinkDto } from "../../domain/payment.link.dto";
import { ObjectId } from "bson";

const ObjectID = mongodb.ObjectId;

@Injectable()
export class PaymentLinkMongoService {
  constructor(
    @InjectModel(PaymentLink.name)
    private paymentLinkRepository: Model<PaymentLinkDocs>
  ) {}

  async get(pagination:any): Promise<PaymentLink[]> {
    const filter = [

    ] as any;

    console.log(filter);
    return await this.paymentLinkRepository.aggregate(
      filter
    ).exec();
  }

  async getId(paymentLinkId: string): Promise<PaymentLink> {
    try {
      const paymentLink = await this.paymentLinkRepository.findOne({
        _id: new ObjectID(paymentLinkId),
      }).exec();

      if (paymentLink === null) {
        throw new HttpException('PaymentLink not found', HttpStatus.NOT_FOUND)
      }
      return paymentLink['_doc'];
    }
    catch (e){
      throw new HttpException('PaymentLink not found',HttpStatus.BAD_REQUEST)
    }

  }


  async createPaymentLink(paymentLinkCreateDto:PaymentLink ):Promise<PaymentLink>{
    try {
      return await this.paymentLinkRepository.create(paymentLinkCreateDto)
    }
    catch (e){
      console.log(e);
    }
  }

  async update(paymentLink: PaymentLink): Promise<boolean> {
    try{
      await this.paymentLinkRepository.replaceOne({ _id: new ObjectID(paymentLink._id.toString())}, paymentLink).exec();
      return true;
    }
    catch (e){
      throw new HttpException('PaymentLink not found',HttpStatus.NOT_FOUND)
    }
  }

  async remove(paymentLinkId: string): Promise<boolean> {
    await this.paymentLinkRepository.remove({ _id: new ObjectID(paymentLinkId) }).exec();
    return true;
  }


  async getIds(ids: string[]):Promise<PaymentLink[]> {
    let idsObjects = ids.map((id:string)=>{
      return new ObjectID(id);
    })
    return await this.paymentLinkRepository.aggregate([
      {
        $match:{
          _id:{$in:idsObjects}
        }
      }
    ]).exec();

  }

  async searchInsidePolygon(coords:number[]):Promise<PaymentLink[]>{
    const paymentLinks = await this.paymentLinkRepository.aggregate([
      {
        $match:{
          geo: {
            $geoIntersects: {
              $geometry: {
                "type": "Point",
                "coordinates": coords
              }
            }
          }
        }
      }
    ]).exec();

    return paymentLinks;
  }

  async getType(data: any,ids:string[] | ObjectId[]):Promise<PaymentLink[]> {

    ids = (ids as string[]).map((id:string)=>{
      return new ObjectID(id);
    })

    const paymentLinks = await this.paymentLinkRepository.aggregate([
      {
        $match:{
          type:data['type'],
          _id:{$in:ids}
        }
      }
    ]).exec()
    return paymentLinks;
  }
}
