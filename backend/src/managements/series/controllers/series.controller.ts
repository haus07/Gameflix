import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
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


    
}
