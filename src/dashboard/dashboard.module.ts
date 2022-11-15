import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardSchema } from './schema/dashboard.schema';

@Module({
  imports: [
    // @ts-ignore
    MongooseModule.forFeature([{ name: 'Dashboard', schema: DashboardSchema }]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
