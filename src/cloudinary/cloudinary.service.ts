import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './types/cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          transformation: [
            {
              width: 320, // Resize the image to a width of 520px
              height: 240, // Resize the image to a width of 520px
              crop: 'fill',
              quality: 'auto', // Automatically adjust the image quality
              fetch_format: 'auto', // Automatically select the best format (e.g., WebP)
            },
          ],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);

      readableStream.pipe(uploadStream);

      readableStream.on('error', (error) => {
        reject(error);
      });
    });
  }

  deleteFile(publicId: string): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
