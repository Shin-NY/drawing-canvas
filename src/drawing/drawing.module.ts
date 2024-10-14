import { Module } from '@nestjs/common';
import { DrawingController } from './drawing.controller';
import { DrawingService } from './drawing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drawing } from './entities/drawing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drawing])],
  controllers: [DrawingController],
  providers: [DrawingService],
})
export class DrawingModule {}
