import { WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway(80, { namespace: 'events' })
export class CrawlingService {
  constructor() {
    console.log('CrawlingService constructor');
  }
}