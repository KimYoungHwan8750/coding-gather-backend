import { Injectable } from "@nestjs/common";
import { AppConstant, ChangeLanguagePayload, ChangeLanguageResponse, InputTextPayload, InputTextResponse, SearchPayload } from "shared-coding-gather";
import { CanvasService } from "src/canvas/canvas.service";
import { EditorService } from "src/editor/editor.service";
import { Socket } from "socket.io";

@Injectable()
export class WebsocketService {
  private socket: Socket;

  constructor(
    private readonly editorService: EditorService,
    private readonly canvasService: CanvasService
  ) {}


  setSocket(socket: Socket) {
    this.socket = socket;
  }
  receiveInputTextEvent(payload: InputTextPayload) {
    if(payload.direction === AppConstant.direction.TOP) {
      this.editorService.getTopEditorData().setText(payload.text);
    } else {
      this.editorService.getBottomEditorData().setText(payload.text);
    }
  }

  transmitInputTextEvent(payload: InputTextPayload) {
    let data: InputTextResponse = {
      direction: payload.direction,
      text: this.editorService.getText(payload.direction),
      language: this.editorService.getLanguage(payload.direction)
    }
    this.socket.emit(AppConstant.websocketEvent.INPUT_TEXT, data);
  }

  receiveChangeLanguageEvent(payload: ChangeLanguagePayload) {
    if(payload.direction === AppConstant.direction.TOP) {
      this.editorService.getTopEditorData().setLanguage(payload.language);
    } else {
      this.editorService.getBottomEditorData().setLanguage(payload.language);
    }
  }

  transmitChangeLanguageEvent(payload: ChangeLanguagePayload) {
    let data: ChangeLanguageResponse = {
      direction: payload.direction,
      language: this.editorService.getLanguage(payload.direction),
    }
    this.socket.emit(AppConstant.websocketEvent.CHANGE_LANGUAGE, data);
  }

  receiveSearchEvent(payload: SearchPayload) {
    this.canvasService.setUrl(payload.url);
  }

  transmitSearchEvent() {
  }

}