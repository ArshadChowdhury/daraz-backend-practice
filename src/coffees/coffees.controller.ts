import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Res() response) {
    response.status(200).json({ data: 'All Coffees', test: 'test' });

    // return 'All Coffees';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `All ${id} Coffees`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body) {
    return body;
  }
}
