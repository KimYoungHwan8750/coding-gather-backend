import { Injectable } from "@nestjs/common";
import { AppConstant, CanvasData, ChangeLanguagePayload, ChangeLanguageResponse, EditorData, FirstJoinResponse, InputTextPayload, InputTextResponse, Mutable, SearchPayload, SearchResponse } from "shared-coding-gather";
import { CanvasService } from "src/canvas/canvas.service";
import { EditorService } from "src/editor/editor.service";
import { Socket } from "socket.io";

@Injectable()
export class WebsocketService {
  private socket: Socket;

  constructor(
    private readonly editorService: EditorService,
    private readonly canvasService: CanvasService,
  ) {}

  setSocket(socket: Socket) {
    this.socket = socket;
  }
  receiveInputTextEvent(payload: InputTextPayload) {
    payload.direction === AppConstant.direction.TOP ? this.editorService.getTopEditorController().setText(payload.text) : this.editorService.getBottomEditorController().setText(payload.text);
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
    payload.direction === AppConstant.direction.TOP ? this.editorService.getTopEditorController().setLanguage(payload.language) : this.editorService.getBottomEditorController().setLanguage(payload.language);
  }

  transmitChangeLanguageEvent(payload: ChangeLanguagePayload) {
    let data: ChangeLanguageResponse = {
      direction: payload.direction,
      language: this.editorService.getLanguage(payload.direction),
    }
    this.socket.broadcast.emit(AppConstant.websocketEvent.CHANGE_LANGUAGE, data);
    this.socket.emit(AppConstant.websocketEvent.CHANGE_LANGUAGE, data);
  }

  async receiveSearchEvent(payload: SearchPayload) {
    this.canvasService.setUrl(payload.url);
    this.canvasService.setPending(true);
  }

  transmitSearchEvent() {
    this.socket.emit(AppConstant.websocketEvent.SEARCH, { pending: this.canvasService.isPending() });
  }

  transmitFirstJoinEvent() {
    const topEditorData: EditorData = {
      direction: AppConstant.direction.TOP,
      text: this.editorService.getTopEditorController().getText(),
      language: this.editorService.getTopEditorController().getLanguage()
    }
    const bottomEditorData: EditorData = {
      direction: AppConstant.direction.BOTTOM,
      text: this.editorService.getBottomEditorController().getText(),
      language: this.editorService.getBottomEditorController().getLanguage()
    }
    const canvasData: CanvasData = {
      url: this.canvasService.getUrl(),
      tool: this.canvasService.getTool(),
      pending: this.canvasService.isPending()
    }
    const data: FirstJoinResponse = {
      topEditorData,
      bottomEditorData,
      canvasData
    }
    this.socket.emit(AppConstant.websocketEvent.FIRST_JOIN, data);
  }
}