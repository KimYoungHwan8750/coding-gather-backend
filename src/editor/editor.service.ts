import { Injectable } from "@nestjs/common";
import { EditorData, EditorDatas, EditorDatasType } from "shared-coding-gather";

@Injectable()
export class EditorService {
  readonly editorData: EditorDatasType = new EditorDatas();
}