import { Injectable } from "@nestjs/common";
import { AppConstant, DirectionType, EditorController, EditorControllers, LanguageType } from "shared-coding-gather";

@Injectable()
export class EditorService {
  private readonly editorControllers: EditorControllers = new EditorControllers();

  /**
   * @returns type EditorController: 위 EditorController를 반환합니다.
   */
  getTopEditorData(): EditorController {
    return this.editorControllers.topEditorController;
  }
  /**
   * @returns type EditorController: 아래 EditorController를 반환합니다.
   */
  getBottomEditorData(): EditorController {
    return this.editorControllers.bottomEditorController;
  }

  /**
   * @param direction Appconstant.direction.TOP | Appconstant.direction.BOTTOM
   * @returns type EditorData
   * @description direction을 전달하면 해당 방향의 EditorController를 반환합니다.
   */
  getText(direction: DirectionType) {
    return direction === AppConstant.direction.TOP ? this.editorControllers.topEditorController.getText() : this.editorControllers.bottomEditorController.getText();
  }

  /**
   * @param direction 
   * @returns type LanguageType
   * @description direction을 전달하면 해당 방향의 EditorData의 Language를 반환합니다.
   */
  getLanguage(direction: DirectionType) {
    return direction === AppConstant.direction.TOP ? this.editorControllers.topEditorController.getLanguage() : this.editorControllers.bottomEditorController.getLanguage();
  }

  /**
   * @param direction AppConstant.direction.TOP | AppConstant.direction.BOTTOM
   * @param text string
   * @description direction을 전달하면 해당 방향의 EditorData의 text를 설정합니다.
   */
  setText(direction: DirectionType, text: string) {
    if(direction === AppConstant.direction.TOP) {
      this.editorControllers.topEditorController.setText(text);
    } else {
      this.editorControllers.bottomEditorController.setText(text);
    }
  }

  /**
   * @param direction AppConstant.direction.TOP | AppConstant.direction.BOTTOM
   * @param language AppConstant.language
   */
  setLanguage(direction: DirectionType, language: LanguageType) {
    if(direction === AppConstant.direction.TOP) {
      this.editorControllers.topEditorController.setLanguage(language);
    } else {
      this.editorControllers.bottomEditorController.setLanguage(language);
    }
  }
  
}