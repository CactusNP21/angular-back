import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put, Req, UseGuards } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";
import { CreateDashboardDto } from "./dto/create-dashboard.dto";
import { UpdateDashboardDto } from "./dto/update-dashboard.dto";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { JwtRequest } from "../interfaces";

@Controller("dashboards")
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {
  }

  private readonly logger = new Logger(DashboardController.name);

    @Put("create")
  create(
    @Req() req: JwtRequest,
    @Body() createDashboardDto: CreateDashboardDto
  ) {
    this.logger.log(req.user);
    return this.dashboardService.create(createDashboardDto, req.user.username);
  }

  @Get()
  getAll(@Req() req: JwtRequest) {
    this.logger.log(req.user);
    return this.dashboardService.findAll(req.user.username);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch("update")
  update(@Body() updateDashboardDto: UpdateDashboardDto) {
    this.logger.log(updateDashboardDto);
    return this.dashboardService.update(updateDashboardDto);
  }

  @Delete()
  remove(@Body() body: { id: string }) {
    return this.dashboardService.remove(body.id);
  }
}
