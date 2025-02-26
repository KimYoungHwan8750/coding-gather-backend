import { Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Browser, chromium, Page } from "playwright";

@Injectable()
export class CrawlingService implements OnModuleInit, OnApplicationShutdown{
  private browser: Browser;
  private page: Page;

  async onModuleInit() {
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage({userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"});
  }

  async onApplicationShutdown() {
    await this.browser.close();
  }

  async getBrowser() {
    return this.browser;
  }

  async getScreenshot(url: string): Promise<Buffer<ArrayBufferLike>> {
    try {
      await this.page.goto(url);
    /**
     * 바디를 지우고 row 클래스를 가진 div요소만 남깁니다.
     * 이렇게 하면 현재는 본문만 남는 정상적인 동작이지만
     * 사이트 구조가 바뀌면 제대로 동작하지 않을 수 있습니다.
     */
      await this.page.evaluate(() => {
        const row = document.querySelector("div[class='row']");
        document.body.innerHTML = "";
        document.body.appendChild(row);
      })
    } catch (err) {
      throw new Error("스크린샷을 찍을 수 없습니다.");
    }
    return await this.page.screenshot({fullPage: true});
  }

}