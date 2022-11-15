import { Injectable, Logger } from "@nestjs/common";
import { CreateDashboardDto } from "./dto/create-dashboard.dto";
import { UpdateDashboardDto } from "./dto/update-dashboard.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DashboardInterface } from "./model/dashboard.model";

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel("Dashboard")
    private dashboardModel: Model<DashboardInterface>,
  ) {}

  private readonly logger = new Logger("dashboardService");

  async create(createDashboardDto: CreateDashboardDto, user: string) {
    const { title, description } = createDashboardDto;
    const dashboard: DashboardInterface = {
      title: title,
      description: description,
      date: new Date(),
      publisher: user,
      tasks: { todo: [], progress: [], done: [], archive: [] },
    };
    // await this.dashboardModel.create(dashboard);
    return this.dashboardModel.create(dashboard).then((r) => {
      return { status: 201, _id: r._id };
    });
  }

  async findAll(username: string) {
    return this.dashboardModel.find({ publisher: username });
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(updateDashboardDto: UpdateDashboardDto) {
    this.logger.log(updateDashboardDto);
    return this.dashboardModel.updateOne(
      { _id: updateDashboardDto.id },
      {
        $set: {
          title: updateDashboardDto.title,
          tasks: updateDashboardDto.tasks,
        },
      },
    );
  }

  remove(id: string) {
    return this.dashboardModel.findByIdAndRemove(id).then((r) => {
      return r;
    });
  }
}
