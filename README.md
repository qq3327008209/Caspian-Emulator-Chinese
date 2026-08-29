# Caspian Emulator 汉化包

为 [Caspian Emulator](https://marketplace.visualstudio.com/items?itemName=CaspianTools.caspian-emulator) 提供**简体中文**界面的 VS Code 扩展。

本汉化包通过覆盖主扩展的界面字符串实现汉化，主扩展更新后汉化包会自动重新应用。

仓库地址：https://github.com/qq3327008209/Caspian-Emulator-Chinese

## 安装方法

### 方法一：从 VSIX 安装

1. 下载 `caspian-emulator-chinese-X.Y.Z.vsix`
2. 运行：
   ```bash
   code --install-extension caspian-emulator-chinese-X.Y.Z.vsix
   ```
3. 重启 VS Code

### 方法二：从源码开发安装

```bash
cd Caspian-Emulator-Chinese
npm install
npm run build
code --install-extension caspian-emulator-chinese-X.Y.Z.vsix
```

## 使用说明

**必须同时安装 [Caspian Emulator](https://marketplace.visualstudio.com/items?itemName=CaspianTools.caspian-emulator) 扩展。**

汉化插件会在启动后自动：
- 将主扩展的 package.json 中的命令、视图、菜单标题替换为中文
- 翻译主扩展的 bundle 中的运行期通知和 UI 字符串
- 汉化侧边栏树视图内容
- 自动备份原始文件，支持一键还原

## 本地化覆盖范围

| 元素 | 状态 |
|------|------|
| 命令面板 & 右键菜单标题 | 全汉化 |
| 通知消息 | 全汉化 |
| 侧边栏树节点 | 全汉化 |
| 状态栏 | 全汉化 |
| QuickPick 选择菜单 | 入口汉化（子选项保持原文） |
| 设置项描述 | 全汉化 |
| Webview 面板 | 中文界面 |

## 快捷键

与原扩展相同：
- `Ctrl+Shift+L` — 显示日志
- `Ctrl+Shift+D` — 选择设备
- `Ctrl+Shift+O` — 显示输出日志

## 开发

```bash
npm install        # 安装依赖
npm run watch      # 监听模式编译
npm run build      # 生产编译
npm run lint       # 代码检查
npm run typecheck  # 类型检查
npm run package    # 打包 VSIX
```

## 兼容版本

- VS Code ^1.85.0
- Caspian Emulator >= 1.4.0

## License

MIT
