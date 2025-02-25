import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { AppConstant, CanvasData, ChangeLanguagePayload, InputTextPayload, SearchPayload } from "shared-coding-gather";
import { Server, Socket } from "socket.io";
import { WebsocketService } from "./websocket.service";
import { UseInterceptors } from "@nestjs/common";
import { WebsocketInterceptor } from "./websocket.interceptor";
@UseInterceptors(WebsocketInterceptor)
@WebSocketGateway(80, { namespace: "ws", cors: "localhost:5173"})
export class WebsocketGateway {
  constructor(private readonly websocketService: WebsocketService) {}

  @WebSocketServer()
  server: Server
  canvasData: CanvasData

  @SubscribeMessage(AppConstant.websocketEvent.INPUT_TEXT)
  inputText(@MessageBody() payload: InputTextPayload): void {
    this.websocketService.receiveInputTextEvent(payload);
    this.websocketService.transmitInputTextEvent(payload);
  }

  @SubscribeMessage(AppConstant.websocketEvent.CHANGE_LANGUAGE)
  changeLanguage(@MessageBody() payload: ChangeLanguagePayload): void {
    this.websocketService.receiveChangeLanguageEvent(payload);
    this.websocketService.transmitChangeLanguageEvent(payload);
  }

  @SubscribeMessage(AppConstant.websocketEvent.SEARCH)
  search(@MessageBody() payload: SearchPayload): void {
    try {
      this.websocketService.receiveSearchEvent(payload);
      this.websocketService.transmitSearchEvent().ok();
    } catch (error) {
      this.websocketService.transmitSearchEvent().fail();
    }
  }
}