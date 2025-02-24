import { Injectable } from "@nestjs/common";
import { AppConstant, DirectionType, EditorData, EditorDatas, EditorDatasType, LanguageType } from "shared-coding-gather";

@Injectable()
export class EditorService {
  private readonly editorData: EditorDatasType = new EditorDatas();

  /**
   * @returns type EditorData: 위 EditorData를 반환합니다.
   */
  getTopEditorData(): EditorData {
    return this.editorData.topEditorData;
  }
  /**
   * @returns type EditorData: 아래 EditorData를 반환합니다.
   */
  getBottomEditorData(): EditorData {
    return this.editorData.bottomEditorData;
  }

  /**
   * @param direction Appconstant.direction.TOP | Appconstant.direction.BOTTOM
   * @returns type EditorData
   * @description direction을 전달하면 해당 방향의 EditorData를 반환합니다.
   */
  getText(direction: DirectionType) {
    return direction === AppConstant.direction.TOP ? this.editorData.topEditorData.getText() : this.editorData.bottomEditorData.getText();
  }

  /**
   * @param direction 
   * @returns type LanguageType
   * @description direction을 전달하면 해당 방향의 EditorData의 Language를 반환합니다.
   */
  getLanguage(direction: DirectionType) {
    return direction === AppConstant.direction.TOP ? this.editorData.topEditorData.getLanguage() : this.editorData.bottomEditorData.getLanguage();
  }

  /**
   * @param direction AppConstant.direction.TOP | AppConstant.direction.BOTTOM
   * @param text string
   * @description direction을 전달하면 해당 방향의 EditorData의 text를 설정합니다.
   */
  setText(direction: DirectionType, text: string) {
    if(direction === AppConstant.direction.TOP) {
      this.editorData.topEditorData.setText(text);
    } else {
      this.editorData.bottomEditorData.setText(text);
    }
  }

  /**
   * @param direction AppConstant.direction.TOP | AppConstant.direction.BOTTOM
   * @param language AppConstant.language
   */
  setLanguage(direction: DirectionType, language: LanguageType) {
    if(direction === AppConstant.direction.TOP) {
      this.editorData.topEditorData.setLanguage(language);
    } else {
      this.editorData.bottomEditorData.setLanguage(language);
    }
  }
  
}