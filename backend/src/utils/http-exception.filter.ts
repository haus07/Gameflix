import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { LoggerService } from "./log_service.service";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger:LoggerService){}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string ;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      message =
        (errorResponse as any).message ||
        exception.message ||
        "Unexpected error";
    } else {
      // Nếu lỗi không phải HttpException
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = "Internal server error";
    }

    // 🧾 Log lỗi chi tiết ở server
    this.logger.error(`Error in ${request.url}`,message);

    // 📤 Trả response cho FE
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
    });
  }
}
