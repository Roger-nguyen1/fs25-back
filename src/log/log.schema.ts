import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Log extends Document {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  level: string;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
