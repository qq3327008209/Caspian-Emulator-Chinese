import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class LocalizedEmulatorScreenPanel {
  private static panels = new Map<string, LocalizedEmulatorScreenPanel>();
  private panel: vscode.WebviewPanel;

  static show(
    extensionUri: vscode.Uri,
    serial: string,
    deviceName: string,
  ): LocalizedEmulatorScreenPanel {
    const existing = LocalizedEmulatorScreenPanel.panels.get(serial);
    if (existing) {
      existing.panel.reveal();
      return existing;
    }
    const instance = new LocalizedEmulatorScreenPanel(extensionUri, serial, deviceName);
    LocalizedEmulatorScreenPanel.panels.set(serial, instance);
    return instance;
  }

  static setPaused(serial: string, paused: boolean): void {
    const panel = LocalizedEmulatorScreenPanel.panels.get(serial);
    if (panel?.panel) {
      try {
        panel.panel.webview.postMessage({ type: paused ? 'pause' : 'resume' });
      } catch {
        // Webview may be disposed
      }
    }
  }

  private constructor(
    private extensionUri: vscode.Uri,
    private serial: string,
    deviceName: string,
  ) {
    this.panel = vscode.window.createWebviewPanel(
      'caspian.emulatorScreen.zh',
      `模拟器屏幕: ${deviceName}`,
      vscode.ViewColumn.Two,
      { enableScripts: true, retainContextWhenHidden: true },
    );
    this.panel.iconPath = new vscode.ThemeIcon('device-mobile');

    const htmlPath = path.join(this.extensionUri.fsPath, 'resources', 'emulator-screen.html');
    let html = '';
    try {
      html = fs.readFileSync(htmlPath, 'utf-8');
    } catch {
      html = this.buildFallbackHtml(deviceName);
    }

    this.panel.webview.html = html;
    this.panel.onDidDispose(() => {
      LocalizedEmulatorScreenPanel.panels.delete(this.serial);
    });
  }

  private buildFallbackHtml(deviceName: string): string {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>模拟器屏幕镜像</title>
<style>
  body {
    font-family: var(--vscode-editor-font-family, sans-serif);
    background: var(--vscode-editor-background);
    color: var(--vscode-editor-foreground);
    padding: 20px;
    text-align: center;
  }
  .info { color: var(--vscode-descriptionForeground); margin-top: 10px; }
</style>
</head>
<body>
  <div>📱</div>
  <div class="info">中文模拟器屏幕镜像</div>
  <div class="info">设备: ${deviceName}</div>
  <div class="info">请使用原扩展的"显示模拟器屏幕"命令查看完整镜像内容。</div>
</body>
</html>`;
  }
}
