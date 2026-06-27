import { Request } from '@nestjs/common';

export interface AuthenticatedRequest extends Request {
  user?: { user_id: number }; // Customize this type according to your needs
}
