import { Controller, Get , Request} from "@nestjs/common";


@Controller('health')
export class HealthController{

  constructor() {}

  @Get('')
  Health(@Request() request):boolean{
    return true;
  }
}