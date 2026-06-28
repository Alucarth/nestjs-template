import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import type { AuthenticatedRequest } from 'src/common/intereceptors/authenticate-request.interface';
import type { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';

const UPLOAD_LIMITS = { fileSize: 1024 * 1024 * 51 };

function createDiskStorage(destination: (req: unknown) => string) {
  return diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = destination(req);
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

function userDir(req: unknown): string {
  const user_id = (req as AuthenticatedRequest).user?.user_id;
  return `uploads/${user_id}`;
}

@UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: createDiskStorage((req) => userDir(req)),
      limits: UPLOAD_LIMITS,
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    return {
      filename: file.filename,
      path: file.path,
      user_id: req.user?.user_id,
    };
  }

  @Post('workflow-requirements')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: createDiskStorage(
        (req) => `${userDir(req)}/workflow/requirements`,
      ),
      limits: UPLOAD_LIMITS,
    }),
  )
  uploadFileWorkflow(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    return {
      filename: file.filename,
      path: file.path,
      user_id: req.user?.user_id,
    };
  }

  @Post('workflow-form')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: createDiskStorage((req) => `${userDir(req)}/workflow/template`),
      limits: UPLOAD_LIMITS,
    }),
  )
  uploadFileWorkflowForm(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    return {
      filename: file.filename,
      path: file.path,
      user_id: req.user?.user_id,
    };
  }

  @Post('procedure-workflow-requirements')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: createDiskStorage(
        (req) => `${userDir(req)}/procedures/requirements`,
      ),
      limits: UPLOAD_LIMITS,
    }),
  )
  uploadProcedureRequirementFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    return {
      filename: file.filename,
      path: file.path,
      user_id: req.user?.user_id,
    };
  }

  @Get('get-file/*path')
  downloadFile(@Param('path') path: string[], @Res() res: Response) {
    const relativePath = path.join('/');
    const projectRoot = join(__dirname, '..', '..', '..');
    const filePath = join(projectRoot, relativePath);
    const filename = path[path.length - 1];

    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found.');
    }

    try {
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${filename}"`,
      );
      res.sendFile(filePath);
    } catch {
      throw new InternalServerErrorException('Error processing file download.');
    }
  }
}
