import { Injectable } from "@nestjs/common";
import { AppConstant, DirectionType, EditorController, EditorsController, LanguageType } from "shared-coding-gather";

@Injectable()
export class EditorService {
  private readonly editorsController: EditorsController = new EditorsController();

  /**
   * @returns type EditorController: 위 EditorController를 반환합니다.
   */
  getTopEditorController(): EditorController {
    return this.editorsController.topEditorController;
  }
  /**
   * @returns type EditorController: 아래 EditorController를 반환합니다.
   */
  getBottomEditorController(): EditorController {
    return this.editorsController.bottomEditorController;
  }

  getEditorsController(): EditorsController {
    return this.editorsController;
  }

  /**
   * @param direction Appconstant.direction.TOP | Appconstant.direction.BOTTOM
   * @returns type EditorData
   * @description direction을 전달하면 해당 방향의 EditorController를 반환합니다.
   */
  getText(direction: DirectionType) {
    return direction === AppConstant.direction.TOP ? this.editorsController.topEditorController.getText() : this.editorsController.bottomEditorController.getText();
  }

  /**
   * @param direction 
   * @returns type LanguageType
   * @description direction을 전달하면 해당 방향의 EditorData의 Language를 반환합니다.
   */
  getLanguage(direction: DirectionType) {
    return direction === AppConstant.direction.TOP ? this.editorsController.topEditorController.getLanguage() : this.editorsController.bottomEditorController.getLanguage();
  }

  /**
   * @param direction AppConstant.direction.TOP | AppConstant.direction.BOTTOM
   * @param text string
   * @description direction을 전달하면 해당 방향의 EditorData의 text를 설정합니다.
   */
  setText(direction: DirectionType, text: string) {
    if(direction === AppConstant.direction.TOP) {
      this.editorsController.topEditorController.setText(text);
    } else {
      this.editorsController.bottomEditorController.setText(text);
    }
  }

  /**
   * @param direction AppConstant.direction.TOP | AppConstant.direction.BOTTOM
   * @param language AppConstant.language
   */
  setLanguage(direction: DirectionType, language: LanguageType) {
    if(direction === AppConstant.direction.TOP) {
      this.editorsController.topEditorController.setLanguage(language);
    } else {
      this.editorsController.bottomEditorController.setLanguage(language);
    }
  }
  
}