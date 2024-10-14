import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Drawing } from './entities/drawing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DrawingService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Drawing)
    private drawingsRepository: Repository<Drawing>,
  ) {}

  async uploadImage(image: Express.Multer.File) {
    const AWSKey = this.configService.get('AWS_ACCESS_KEY');
    const AWSSecret = this.configService.get('AWS_SECRET_KEY');

    const client = new S3Client({
      region: 'ap-northeast-2',
      credentials: { accessKeyId: AWSKey, secretAccessKey: AWSSecret },
    });

    const fileName = `${uuidv4()}.png`;
    await client.send(
      new PutObjectCommand({
        Bucket: 'cloud-exam-drawing-service',
        Key: fileName,
        Body: image.buffer,
      }),
    );

    const imageUrl = `https://cloud-exam-drawing-service.s3.ap-northeast-2.amazonaws.com/${fileName}`;
    await this.drawingsRepository.save(
      this.drawingsRepository.create({ imageUrl }),
    );
  }

  async getImages() {
    return await this.drawingsRepository.find({ order: { createdAt: 'DESC' } });
  }
}
