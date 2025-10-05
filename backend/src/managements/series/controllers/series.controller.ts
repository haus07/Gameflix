import { Controller, Get, HttpStatus, Param, ParseIntPipe, Res } from '@nestjs/common';
import { SeriesService } from '../services/series.service';
import { LoggerService } from 'src/utils/log_service.service';

@Controller({
    path: 'series',
    version:'1'
})
export class SeriesController {
    constructor(private readonly seriesService: SeriesService,
        private readonly logger:LoggerService
    ) {
           
    }

    @Get('')
    async handleGetSeriesManagement(@Res() res) {
        try {
            const seriesInformation = await this.seriesService.getDataSeries()
            return res.status(HttpStatus.OK).json({
                message: 'success',
                data:seriesInformation
        })
        } catch(error) {
            this.logger.error("Error in get data series ", error)
        }
    }


    @Get(':id')
    async handleGetSeriesById(@Res() res,
                              @Param('id' , ParseIntPipe) id:number) {
        try{
            const oneDataSeriesInfomation = await this.seriesService.getDataSeriesById(id)
            return res.status(HttpStatus.OK).json({
                message: 'success',
                data:oneDataSeriesInfomation
            })

        } catch (error){
            this.logger.error("Error in get one series",error)
        }
    }
}
