import { IsNotEmpty } from 'class-validator';

export class CreateDashboardDto {
  description: string;
  @IsNotEmpty()
  title: string;


}
