import { Module } from "@nestjs/common";
import { WebsocketGateway } from "./websocket.gateway";
import { EditorModule } from "src/editor/editor.module";
import { CanvasModule } from "src/canvas/canvas.module";
import { WebsocketService } from "./websocket.service";
import { WebsocketInterceptor } from "./websocket.interceptor";
import { CrawlingModule } from "src/crawling/crawling.module";

@Module({
  imports: [EditorModule, CanvasModule, CrawlingModule],
  providers: [WebsocketGateway, WebsocketService, WebsocketInterceptor],
})
export class WebsocketModule {}