import { Module } from "@nestjs/common";
import { WebsocketGateway } from "./websocket.gateway";
import { EditorService } from "src/editor/editor.service";
import { EditorModule } from "src/editor/editor.module";
import { CanvasModule } from "src/canvas/canvas.module";
import { WebsocketService } from "./websocket.service";
import { WebsocketInterceptor } from "./websocket.interceptor";

@Module({
  imports: [EditorModule, CanvasModule],
  providers: [WebsocketGateway, WebsocketService, WebsocketInterceptor],
})
export class WebsocketModule {}