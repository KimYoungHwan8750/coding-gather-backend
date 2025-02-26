import { Injectable } from "@nestjs/common";
import { CanvasController, CanvasData, ToolsType } from "shared-coding-gather";

@Injectable()
export class CanvasService {
  canvasController: CanvasController = new CanvasController();

  getUrl(): string {
    return this.canvasController.getUrl()
  }

  setUrl(url: string): void {
    this.canvasController.setUrl(url)
  }

  getTool(): ToolsType {
    return this.canvasController.getTool()
  }

  setTool(tool: ToolsType): ToolsType {
    return this.canvasController.setTool(tool)
  }

  isPending(): boolean {
    return this.canvasController.isPending()
  }

  setPending(pending: boolean): void {
    this.canvasController.setPending(pending)
  }

  toString(): string {
    return this.canvasController.toString()
  }
}