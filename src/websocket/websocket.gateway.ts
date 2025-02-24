import { RouterModule } from "@nestjs/core";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { AppConstant, CanvasData, ChangeLanguagePayload, EditorDatasType, InputTextPayload, SearchPayload } from "shared-coding-gather";
import { Server, Socket } from "socket.io";
import { CanvasService } from "src/canvas/canvas.service";
import { EditorService } from "src/editor/editor.service";
@WebSocketGateway(80, { namespace: "ws", cors: "localhost:5173"})
export class WebsocketGateway{
  constructor(
    private readonly editorService: EditorService,
    private readonly canvasService: CanvasService
  ) {}
  @WebSocketServer()
  server: Server
  canvasData: CanvasData

  @SubscribeMessage("inputText")
  inputText(@ConnectedSocket() socket: Socket, @MessageBody() payload: InputTextPayload): void {
    if(payload.direction === AppConstant.direction.TOP) {
      this.editorService.editorData.topEditorData.setText(payload.text);
    } else {
      this.editorService.editorData.bottomEditorData.setText(payload.text);
    }
    socket.broadcast.emit("inputText", payload);
    console.log(this.editorService.editorData.bottomEditorData.toString());
  }

  @SubscribeMessage("changeLanguage")
  changeLanguage(@ConnectedSocket() socket: Socket, @MessageBody() payload: ChangeLanguagePayload): void {
    if(payload.direction === AppConstant.direction.TOP) {
      this.editorService.editorData.topEditorData.setLanguage(payload.language);
    } else {
      this.editorService.editorData.bottomEditorData.setLanguage(payload.language);
    }
    socket.broadcast.emit("changeLanguage", payload);
  }

  @SubscribeMessage("search")
  search(@ConnectedSocket() socket: Socket, @MessageBody() payload: SearchPayload): void {
    this.canvasService.setUrl(payload.url);
    console.log(this.canvasService.toString());
  }
}