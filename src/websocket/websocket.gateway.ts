import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
@WebSocketGateway(80, { namespace: "ws", cors: "localhost:5173"})
export class WebsocketGateway{
  server: Server

  @SubscribeMessage("inputText")
  inputText(@ConnectedSocket() socket: Socket, @MessageBody() data: string): void {
    socket.broadcast.emit("inputText", data);
  }

  @SubscribeMessage("changeLanguage")
  changeLanguage(@ConnectedSocket() socket: Socket, @MessageBody() data: string): void {
    socket.broadcast.emit("changeLanguage", data);
  }

  @SubscribeMessage("search")
  search(@ConnectedSocket() socket: Socket, @MessageBody() data: string): void {
    // socket.broadcast.emit("search", data);
  }
}