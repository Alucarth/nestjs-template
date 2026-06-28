import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';

export interface UploadOptions {
  destination: (req: unknown) => string;
}

@Injectable()
export class UploadService {
  createDiskStorage(options: UploadOptions) {
    return diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = options.destination(req);
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(
          null,
          `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
        );
      },
    });
  }
}
