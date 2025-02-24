import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { WebsocketService } from "./websocket.service";

@Injectable()
export class WebsocketInterceptor implements NestInterceptor {
  constructor(private readonly websocketService: WebsocketService) {}
  
  /**
   * @description 매 웹소켓 메세지마다 웹소켓 서비스에 소켓을 설정합니다.
   */
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    this.websocketService.setSocket(context.switchToWs().getClient());
    return next
    .handle();
  }
}