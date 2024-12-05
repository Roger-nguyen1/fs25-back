import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Farm extends Document {
  @Prop({ required: true })
  farmId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  money: number;

  @Prop({ type: [String] })
  players: string[];

  @Prop({ type: [Object] })
  finances: Record<string, number | string>[];

  @Prop({ type: Date })
  updatedAt: Date;
}

export const FarmSchema = SchemaFactory.createForClass(Farm);
