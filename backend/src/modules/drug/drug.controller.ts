import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { DrugService } from './drug.service';
import { FindDrugsQueryDto } from '../../dto/find-drugs-query.dto';

@Controller('drugs')
export class DrugController {
  constructor(private readonly drugService: DrugService) {}

  @Get()
  find(@Query(ValidationPipe) queryDto: FindDrugsQueryDto) {
    return this.drugService.find(queryDto);
  }

}

