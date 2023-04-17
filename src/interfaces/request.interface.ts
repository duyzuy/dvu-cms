import { User } from 'src/users/entities/user.entity';

export interface RequestWithAuth extends Request {
  user: User;
}
