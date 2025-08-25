import { Controller, Get } from '@nestjs/common';
import { SeriesService } from './series.service';

@Controller({
  path: 'series',
  version:'1'
})
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {
  }
  @Get()
  async getSeriesList(){
    try {
      const seriesList = await this.seriesService.getAllSeries();
    return {
      success: true,
      message: "Lay du lieu thanh cong",
      data:seriesList
    }
    } catch (error) {
      return {
        success: false,
        message: error.message|| 'Co loi xay ra',
        data:[]

      }
        
      
  }
  }
}
