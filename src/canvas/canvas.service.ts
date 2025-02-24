import { Injectable } from "@nestjs/common";
import { CanvasData, ToolsType } from "shared-coding-gather";

@Injectable()
export class CanvasService {
  canvas: CanvasData = new CanvasData();

  getBinary(): number[] {
    return this.canvas.getBinary()
  }

  setBinary(binary: number[]): void {
    this.canvas.setBinary(binary)
  }

  getUrl(): string {
    return this.canvas.getUrl()
  }

  setUrl(url: string): void {
    this.canvas.setUrl(url)
  }

  getTool(): ToolsType {
    return this.canvas.getTool()
  }

  setTool(tool: ToolsType): ToolsType {
    return this.canvas.setTool(tool)
  }

  toString(): string {
    return this.canvas.toString()
  }
}