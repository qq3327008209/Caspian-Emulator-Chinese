import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class LocalizedLogcatPanel {
  private static panels = new Map<string, LocalizedLogcatPanel>();
  private panel: vscode.WebviewPanel;

  static show(
    extensionUri: vscode.Uri,
    serial: string,
    deviceName: string,
    packageFilter?: string,
  ): LocalizedLogcatPanel {
    const key = packageFilter ? `${serial}:${packageFilter}` : serial;
    const existing = LocalizedLogcatPanel.panels.get(key);
    if (existing) {
      existing.panel.reveal();
      return existing;
    }
    const instance = new LocalizedLogcatPanel(extensionUri, serial, deviceName, packageFilter);
    LocalizedLogcatPanel.panels.set(key, instance);
    return instance;
  }

  private constructor(
    private extensionUri: vscode.Uri,
    private serial: string,
    deviceName: string,
    packageFilter?: string,
  ) {
    const title = packageFilter
      ? `日志: ${deviceName} [${packageFilter}]`
      : `日志: ${deviceName}`;

    this.panel = vscode.window.createWebviewPanel(
      'caspian.logcat.zh',
      title,
      vscode.ViewColumn.Two,
      { enableScripts: true, retainContextWhenHidden: true },
    );
    this.panel.iconPath = new vscode.ThemeIcon('output');

    // Load localized HTML template
    const htmlPath = path.join(this.extensionUri.fsPath, 'resources', 'logcat.html');
    let html = '';
    try {
      html = fs.readFileSync(htmlPath, 'utf-8');
      // Replace VS Code webview CSS variable references with actual values
      html = html.replace(/\$\{webkitPath\}/g, this.panel.webview.asWebviewUri(
        vscode.Uri.joinPath(this.extensionUri, 'resources', 'webview')
      ).toString());
    } catch {
      // Fallback: use inline HTML if template not found
      html = this.buildFallbackHtml(title);
    }

    this.panel.webview.html = html;
    this.panel.onDidDispose(() => {
      LocalizedLogcatPanel.panels.delete(
        packageFilter ? `${this.serial}:${packageFilter}` : this.serial
      );
    });
  }

  private buildFallbackHtml(title: string): string {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  body {
    font-family: var(--vscode-editor-font-family, monospace);
    font-size: 13px;
    background: var(--vscode-editor-background);
    color: var(--vscode-editor-foreground);
    padding: 20px;
  }
  .info { color: var(--vscode-descriptionForeground); }
  .tip { margin-top: 10px; font-size: 12px; }
</style>
</head>
<body>
  <div class="info">中文日志查看器</div>
  <div class="tip">请使用原扩展的"显示日志"命令查看完整日志内容。</div>
  <div class="tip">此面板为本地化版本，显示来自原扩展的日志数据。</div>
</body>
</html>`;
  }
}
