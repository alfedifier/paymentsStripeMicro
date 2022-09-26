import { ApiProperty } from "@nestjs/swagger";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {SchemaTypes} from "mongoose";
import Stripe from "stripe";
import { ObjectId } from "bson";


export type PaymentLinkDocs = PaymentLink & Document;
@Schema({ versionKey: false})
export class PaymentLink{

  @ApiProperty()
  _id?:string;

  @Prop({default:false})
  paid?:boolean;

  @Prop({type:Object,index:1})
  @ApiProperty()
  stripePaymentLink:Stripe.PaymentLink;

  @Prop()
  type:string;

  @Prop({type:SchemaTypes.ObjectId})
  ref:string;

  @Prop({default:false})
  softRemove?:boolean;

  @Prop({ type: SchemaTypes.ObjectId})
  user:string ;

  @Prop({ type: SchemaTypes.ObjectId})
  updatedBy?:string ;

  @ApiProperty()
  @Prop({default:new Date()})
  date?:Date

  @ApiProperty()
  @Prop({default:new Date()})
  lastUpdate?:Date
}

export const PaymentLinkSchema = SchemaFactory.createForClass(PaymentLink);
