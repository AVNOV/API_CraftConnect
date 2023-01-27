import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/roles.enum';

export class UpdateUserRoleDto {
  @ApiProperty()
  role: Role;
}
