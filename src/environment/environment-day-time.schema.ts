// environment-day-time.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DayTime extends Document {
  @Prop({ required: true })
  dayTime: string;

  @Prop({ required: true })
  currentDay: string;

  @Prop({ required: true })
  currentMonotonicDay: string;

  @Prop({ required: true })
  realHourTimer: string;

  @Prop({ required: true })
  daysPerPeriod: string;

  @Prop({ type: Object })
  lighting: {
    toneMapping: {
      slope: string;
      toe: string;
      shoulder: string;
      blackClip: string;
      whiteClip: string;
    }[];
  };

  @Prop({ type: Object })
  weather: {
    timeSinceLastRain: string;
  };

  @Prop({ type: Date })
  updatedAt: Date;
}

export const DayTimeSchema = SchemaFactory.createForClass(DayTime);
