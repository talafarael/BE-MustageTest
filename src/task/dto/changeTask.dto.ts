import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './createTask.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ example: 'id' })
  @IsString()
  id: string;
}
