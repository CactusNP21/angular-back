import { PartialType } from '@nestjs/mapped-types';
import { CreateDashboardDto } from './create-dashboard.dto';
import { IsNotEmpty } from "class-validator";
import { Tasks } from "../model/dashboard.model";

export class UpdateDashboardDto extends PartialType(CreateDashboardDto) {
  @IsNotEmpty()
  id: string;

  title?: string;
  tasks?: Tasks;
}
