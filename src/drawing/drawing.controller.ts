import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DrawingService } from './drawing.service';

@Controller('drawings')
export class DrawingController {
  constructor(private readonly drawingService: DrawingService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    this.drawingService.uploadImage(image);
  }

  @Get('/')
  async getImages() {
    return await this.drawingService.getImages();
  }
}
