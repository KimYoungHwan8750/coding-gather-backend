import { Injectable } from "@nestjs/common";
import { AppConstant, ChangeLanguagePayload, ChangeLanguageResponse, InputTextPayload, InputTextResponse, SearchPayload, SearchResponse } from "shared-coding-gather";
import { CanvasService } from "src/canvas/canvas.service";
import { EditorService } from "src/editor/editor.service";
import { Socket } from "socket.io";
import { CrawlingService } from "src/crawling/crawling.service";

@Injectable()
export class WebsocketService {
  private socket: Socket;

  constructor(
    private readonly editorService: EditorService,
    private readonly canvasService: CanvasService,
    private readonly crawlingService: CrawlingService
  ) {}


  setSocket(socket: Socket) {
    this.socket = socket;
  }
  receiveInputTextEvent(payload: InputTextPayload) {
    const editor = payload.direction === AppConstant.direction.TOP ? this.editorService.getTopEditorData() : this.editorService.getBottomEditorData();
    editor.setText(payload.text);
  }

  transmitInputTextEvent(payload: InputTextPayload) {
    let data: InputTextResponse = {
      direction: payload.direction,
      text: this.editorService.getText(payload.direction),
      language: this.editorService.getLanguage(payload.direction)
    }
    this.socket.broadcast.emit(AppConstant.websocketEvent.INPUT_TEXT, data);
  }

  receiveChangeLanguageEvent(payload: ChangeLanguagePayload) {
    const editor = payload.direction === AppConstant.direction.TOP ? this.editorService.getTopEditorData() : this.editorService.getBottomEditorData();
    editor.setLanguage(payload.language);
  }

  transmitChangeLanguageEvent(payload: ChangeLanguagePayload) {
    let data: ChangeLanguageResponse = {
      direction: payload.direction,
      language: this.editorService.getLanguage(payload.direction),
    }
    this.socket.emit(AppConstant.websocketEvent.CHANGE_LANGUAGE, data);
  }

  async receiveSearchEvent(payload: SearchPayload) {
    const binary = await this.crawlingService.getScreenshot(payload.url);
    this.canvasService.setUrl(payload.url);
    this.canvasService.setBinary(binary);
  }

  transmitSearchEvent() {
    let data: SearchResponse;
    const emit = () => this.socket.emit(AppConstant.websocketEvent.SEARCH, data);
    const ok = () => {
      data.code = 200;
      data.binary = this.canvasService.getBinary();
      emit();
    }
    const fail = () => {
      data.code = 404;
      data.binary = null;
      emit();
    }
    return { ok, fail }
  }

}