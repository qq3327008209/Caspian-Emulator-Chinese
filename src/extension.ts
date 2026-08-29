import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// ============================================================
// Config
// ============================================================

const CONFIG_SECTION = 'caspianEmulatorChinese';
const MAIN_EXTENSION_ID = 'CaspianTools.caspian-emulator';
const BACKUP_SUFFIX = '.caspian-zh.bak';

function getConfig<T>(key: string, fallback: T): T {
  const cfg = vscode.workspace.getConfiguration(CONFIG_SECTION);
  const val = cfg.get<T>(key);
  return val ?? fallback;
}

// ============================================================
// Extension Locator
// ============================================================

function getMainExtensionPath(): string | undefined {
  const ext = vscode.extensions.getExtension(MAIN_EXTENSION_ID);
  if (ext) {
    return ext.extensionPath;
  }

  // Known real path for this setup
  const known = path.join(
    os.homedir(),
    '.vscode',
    'extensions',
    'caspiantools.caspian-emulator-1.4.0',
  );
  if (fs.existsSync(known)) {
    return known;
  }

  // Fallback: search extensions directory
  const candidates = [
    path.join(os.homedir(), '.vscode', 'extensions'),
    path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Microsoft VS Code', 'resources', 'app', 'extensions'),
    path.join(process.env.USERPROFILE || '', '.vscode-server', 'extensions'),
  ];

  for (const base of candidates) {
    if (!fs.existsSync(base)) continue;
    try {
      const entries = fs.readdirSync(base, { withFileTypes: true });
      const dir = entries.find(e => e.isDirectory() && (e.name.startsWith('caspian-emulator') || e.name.startsWith('caspiantools.caspian-emulator')));
      if (dir) return path.join(base, dir.name);
    } catch {
      // ignore
    }
  }
  return undefined;
}

function getMainOutPath(extPath: string): string {
  return path.join(extPath, 'out', 'extension.js');
}

function getMainPackageJsonPath(extPath: string): string {
  return path.join(extPath, 'package.json');
}

// ============================================================
// Translations
// ============================================================

const COMMAND_TITLES: Record<string, string> = {
  caspian_setupSdk: '配置 Android SDK',
  caspian_downloadSdk: '下载并安装 Android SDK',
  caspian_connectPhone: '通过 USB 连接手机',
  caspian_refreshAvds: '刷新虚拟设备列表',
  caspian_createAvd: '创建虚拟设备',
  caspian_launchAvd: '启动模拟器',
  caspian_stopAvd: '停止模拟器',
  caspian_deleteAvd: '删除虚拟设备',
  caspian_editAvd: '编辑虚拟设备配置',
  caspian_refreshDevices: '刷新设备列表',
  caspian_installApk: '安装 APK',
  caspian_takeScreenshot: '截取屏幕',
  caspian_recordScreen: '录制屏幕',
  caspian_openShell: '打开 ADB Shell',
  caspian_showLogcat: '显示日志',
  caspian_showEmulatorScreen: '显示模拟器屏幕',
  caspian_refreshFiles: '刷新文件列表',
  caspian_pullFile: '从设备下载文件',
  caspian_pushFile: '向设备上传文件',
  caspian_deleteFile: '删除设备上的文件',
  caspian_createFolder: '在设备上创建文件夹',
  caspian_renameFile: '重命名设备上的文件',
  caspian_openRemoteFile: '打开设备上的文件',
  caspian_selectDevice: '选择当前设备',
  caspian_showOutput: '显示输出日志',
  caspian_listPackages: '列出已安装的应用',
  caspian_launchApp: '启动应用',
  caspian_forceStopApp: '强制停止应用',
  caspian_clearAppData: '清除应用数据',
  caspian_uninstallApp: '卸载应用',
  caspian_showAppLogcat: '显示应用日志',
  caspian_cloneAvd: '克隆虚拟设备',
  caspian_coldBootAvd: '冷启动模拟器',
  caspian_connectWifi: '通过 Wi-Fi 连接设备',
  caspian_disconnectWifi: '断开 Wi-Fi 设备',
  caspian_qrPair: '通过二维码配对设备',
  caspian_checkAvdDisplay: '检查设备配置',
  caspian_repairAvd: '修复虚拟设备',
  caspian_checkAcceleration: '检查模拟器加速',
  caspian_showEmulatorLog: '显示模拟器启动日志',
  caspian_toggleDemoMode: '切换截图模式',
  caspian_captureStoreScreenshots: '截取商店截图',
  caspian_runCaptureMatrix: '运行多语言与无障碍矩阵',
  caspian_openCaptureFolder: '打开截图文件夹',
  caspian_resetDeviceOverrides: '重置设备显示与语言覆盖',
  caspian_setDisplayCutout: '设置屏幕刘海',
  caspian_setNavigationMode: '设置导航栏模式',
};

const PACKAGE_JSON_REPLACEMENTS: [string, string][] = [
  // Category
  ['"Caspian Emulator"', '"Caspian 模拟器"'],

  // Views
  ['"Virtual Devices"', '"虚拟设备"'],
  ['"Connected Devices"', '"已连接的设备"'],
  ['"Device Files"', '"设备文件"'],

  // Commands
  ['Setup Android SDK', '配置 Android SDK'],
  ['Download & Install Android SDK', '下载并安装 Android SDK'],
  ['Connect Phone via USB', '通过 USB 连接手机'],
  ['Refresh AVD List', '刷新虚拟设备列表'],
  ['Create AVD', '创建虚拟设备'],
  ['Launch Emulator', '启动模拟器'],
  ['Stop Emulator', '停止模拟器'],
  ['Delete AVD', '删除虚拟设备'],
  ['Edit AVD Configuration', '编辑虚拟设备配置'],
  ['Refresh Device List', '刷新设备列表'],
  ['Install APK', '安装 APK'],
  ['Take Screenshot', '截取屏幕'],
  ['Record Screen', '录制屏幕'],
  ['Open ADB Shell', '打开 ADB Shell'],
  ['Show Logcat', '显示日志'],
  ['Show Emulator Screen', '显示模拟器屏幕'],
  ['Refresh File Explorer', '刷新文件列表'],
  ['Download File from Device', '从设备下载文件'],
  ['Upload File to Device', '向设备上传文件'],
  ['Delete File on Device', '删除设备上的文件'],
  ['Create Folder on Device', '在设备上创建文件夹'],
  ['Rename File on Device', '重命名设备上的文件'],
  ['Open File from Device', '打开设备上的文件'],
  ['Select Active Device', '选择当前设备'],
  ['Show Output Log', '显示输出日志'],
  ['List Installed Apps', '列出已安装的应用'],
  ['Launch App', '启动应用'],
  ['Force Stop App', '强制停止应用'],
  ['Clear App Data', '清除应用数据'],
  ['Uninstall App', '卸载应用'],
  ['Show App Logcat', '显示应用日志'],
  ['Clone AVD', '克隆虚拟设备'],
  ['Cold Boot Emulator', '冷启动模拟器'],
  ['Connect Device via Wi-Fi', '通过 Wi-Fi 连接设备'],
  ['Disconnect Wi-Fi Device', '断开 Wi-Fi 设备'],
  ['Pair Device with QR Code', '通过二维码配对设备'],
  ['Check Device Configuration', '检查设备配置'],
  ['Repair Virtual Device', '修复虚拟设备'],
  ['Check Emulator Acceleration', '检查模拟器加速'],
  ['Show Emulator Launch Log', '显示模拟器启动日志'],
  ['Toggle Screenshot Mode', '切换截图模式'],
  ['Capture Store Screenshots', '截取商店截图'],
  ['Run Locale & Accessibility Matrix', '运行多语言与无障碍矩阵'],
  ['Open Capture Folder', '打开截图文件夹'],
  ['Reset Device Display & Language Overrides', '重置设备显示与语言覆盖'],
  ['Set Display Cutout (Notch)', '设置屏幕刘海'],
  ['Set Navigation Mode', '设置导航栏模式'],

  // Welcome messages
  ['No Android SDK found.', '未检测到 Android SDK。'],
  ['Caspian can download and set up the SDK automatically — no Android Studio required.', 'Caspian 可自动下载并配置 SDK，无需安装 Android Studio。'],
  ['Download & Install Android SDK', '下载并安装 Android SDK'],
  ['Configure Existing SDK', '手动配置已有 SDK'],
  ['No devices connected.', '没有连接的设备。'],
  ['Launch a virtual device from the panel above, or connect a phone.', '从上方面板启动虚拟设备，或连接手机。'],
  ['Connect Phone via USB', '通过 USB 连接手机'],
  ['Connect via Wi-Fi', '通过 Wi-Fi 连接'],
  ['No device selected.', '未选择设备。'],
  ['Connect a device or launch an emulator to browse its files.', '连接设备或启动模拟器以浏览其文件。'],
  ['Select Device', '选择设备'],
];

const RUNTIME_STRING_REPLACEMENTS: [string, string][] = [
  ['Setup Android SDK', '配置 Android SDK'],
  ['Download & Install Android SDK', '下载并安装 Android SDK'],
  ['Connect Phone via USB', '通过 USB 连接手机'],
  ['Refresh AVD List', '刷新虚拟设备列表'],
  ['Create AVD', '创建虚拟设备'],
  ['Launch Emulator', '启动模拟器'],
  ['Stop Emulator', '停止模拟器'],
  ['Delete AVD', '删除虚拟设备'],
  ['Edit AVD Configuration', '编辑虚拟设备配置'],
  ['Refresh Device List', '刷新设备列表'],
  ['Install APK', '安装 APK'],
  ['Take Screenshot', '截取屏幕'],
  ['Record Screen', '录制屏幕'],
  ['Open ADB Shell', '打开 ADB Shell'],
  ['Show Logcat', '显示日志'],
  ['Show Emulator Screen', '显示模拟器屏幕'],
  ['Refresh File Explorer', '刷新文件列表'],
  ['Download File from Device', '从设备下载文件'],
  ['Upload File to Device', '向设备上传文件'],
  ['Delete File on Device', '删除设备上的文件'],
  ['Create Folder on Device', '在设备上创建文件夹'],
  ['Rename File on Device', '重命名设备上的文件'],
  ['Open File from Device', '打开设备上的文件'],
  ['Select Active Device', '选择当前设备'],
  ['Show Output Log', '显示输出日志'],
  ['List Installed Apps', '列出已安装的应用'],
  ['Launch App', '启动应用'],
  ['Force Stop App', '强制停止应用'],
  ['Clear App Data', '清除应用数据'],
  ['Uninstall App', '卸载应用'],
  ['Show App Logcat', '显示应用日志'],
  ['Clone AVD', '克隆虚拟设备'],
  ['Cold Boot Emulator', '冷启动模拟器'],
  ['Connect Device via Wi-Fi', '通过 Wi-Fi 连接设备'],
  ['Disconnect Wi-Fi Device', '断开 Wi-Fi 设备'],
  ['Pair Device with QR Code', '通过二维码配对设备'],
  ['Check Device Configuration', '检查设备配置'],
  ['Repair Virtual Device', '修复虚拟设备'],
  ['Check Emulator Acceleration', '检查模拟器加速'],
  ['Show Emulator Launch Log', '显示模拟器启动日志'],
  ['Toggle Screenshot Mode', '切换截图模式'],
  ['Capture Store Screenshots', '截取商店截图'],
  ['Run Locale & Accessibility Matrix', '运行多语言与无障碍矩阵'],
  ['Open Capture Folder', '打开截图文件夹'],
  ['Reset Device Display & Language Overrides', '重置设备显示与语言覆盖'],
  ['Set Display Cutout (Notch)', '设置屏幕刘海'],
  ['Set Navigation Mode', '设置导航栏模式'],
  ['Virtual Devices', '虚拟设备'],
  ['Connected Devices', '已连接的设备'],
  ['Device Files', '设备文件'],
  ['No Android SDK found.', '未检测到 Android SDK。'],
  ['Caspian can download and set up the SDK automatically — no Android Studio required.', 'Caspian 可自动下载并配置 SDK，无需安装 Android Studio。'],
  ['Download & Install Android SDK', '下载并安装 Android SDK'],
  ['Configure Existing SDK', '手动配置已有 SDK'],
  ['No devices connected.', '没有连接的设备。'],
  ['Launch a virtual device from the panel above, or connect a phone.', '从上方面板启动虚拟设备，或连接手机。'],
  ['Connect Phone via USB', '通过 USB 连接手机'],
  ['Connect via Wi-Fi', '通过 Wi-Fi 连接'],
  ['No device selected.', '未选择设备。'],
  ['Connect a device or launch an emulator to browse its files.', '连接设备或启动模拟器以浏览其文件。'],
  ['Select Device', '选择设备'],

  // Settings descriptions
  ['Path to the Android SDK root directory. Leave empty for auto-detection.', 'Android SDK 根目录路径。留空则自动检测。'],
  ['Additional arguments to pass when launching the emulator.', '启动模拟器时传递的额外参数。'],
  ['Maximum number of logcat lines to keep in the viewer.', '日志查看器中保留的最大行数。'],
  ['Path to scrcpy binary for screen mirroring. Leave empty for auto-detection.', '屏幕镜像使用的 scrcpy 二进制文件路径。留空则自动检测。'],
  ['Device polling interval in seconds.', '设备轮询间隔（秒）。'],
  ['Font size in the logcat viewer (pixels).', '日志查看器中的字体大小（像素）。'],
  ['Wrap long lines in the logcat viewer.', '在日志查看器中自动换行。'],
  ['Show hidden files (dotfiles) in the device file explorer.', '在设备文件浏览器中显示隐藏文件。'],
  ['Default root path when browsing device files.', '浏览设备文件时的默认根路径。'],
  ['Automatically select newly connected devices as the active device.', '自动选择新连接的设备作为当前设备。'],
  ['Always cold boot emulators (ignore snapshots).', '始终冷启动模拟器（忽略快照）。'],
  ['Warn before launching an emulator when the host has less free memory than the virtual device needs.', '当主机可用内存不足时，在启动模拟器前发出警告。'],
  ['Free memory in megabytes to leave for the host beyond the emulator\'s requirement before warning.', '警告前为主机预留的额外内存（MB）。'],
  ['Check for hardware acceleration (WHPX, HAXM, or KVM) before the first emulator launch of each session.', '在每个会话首次启动模拟器前检查硬件加速（WHPX、HAXM 或 KVM）。'],
  ['Capture emulator output to a log file so startup failures can be reported instead of appearing as a hang.', '将模拟器输出捕获到日志文件，以便报告启动失败而非显示为卡住。'],
  ['How long to wait for Android to finish booting before reporting the emulator as stalled (seconds). A cold boot after a data wipe can take several minutes.', '等待 Android 完成启动的超时时间（秒）。数据擦除后的冷启动可能需要数分钟。'],
  ['Warn when free host memory runs low while an emulator is running, for example when a build starts alongside it.', '模拟器运行时主机可用内存不足时发出警告。'],
  ['Free host memory in megabytes below which the running-emulator warning fires. Set to 0 to disable.', '运行中模拟器内存警告的阈值（MB）。设为 0 禁用。'],
  ['Flag virtual devices configured with less RAM than their system image needs. Modern Google APIs images swap and stop responding below 2560 MB.', '标记 RAM 低于系统图像需求的虚拟设备。现代 Google API 镜像在 2560 MB 以下会卡顿。'],
  ['GPU rendering mode passed to the emulator as -gpu. Use "swiftshader" if screenshots come out black. An explicit -gpu in caspian.emulatorArgs overrides this.', '传递给模拟器的 GPU 渲染模式（-gpu 参数）。如果截图为黑色，请使用 "swiftshader"。emulatorArgs 中的 -gpu 参数将覆盖此设置。'],
  ['When a launch fails with a graphics error, retry automatically with software rendering. Only applies when caspian.emulator.gpuMode is "auto".', '启动因图形错误失败时，自动使用软件渲染重试。仅在 gpuMode 为 "auto" 时生效。'],
  ['When creating a device from a preset, use the newest installed system image at or above the preset\'s API level instead of downloading the exact one.', '从预设创建设备时，使用已安装的、API 级别不低于预设的最新系统镜像，而非下载精确版本。'],
  ['Report virtual device displays outside a 16:9 to 9:16 aspect ratio as Play Store screenshot problems. Most modern phones are taller than 16:9.', '将宽高比超出 16:9 到 9:16 范围的虚拟设备显示报告为 Play Store 截图问题。大多数现代手机比 16:9 更高。'],
  ['Directory where capture runs are saved. Supports ${workspaceFolder} and ~. Falls back to your home folder when no workspace is open.', '截图任务保存目录。支持 ${workspaceFolder} 和 ~。没有打开工作区时回退到用户主目录。'],
  ['Open the capture report when a capture run finishes.', '截图任务完成后打开报告。'],
  ['Enter screenshot mode during capture runs so the status bar is clean and deterministic.', '截图任务期间进入截图模式，使状态栏干净且确定。'],
  ['Extra delay after the screen stops changing, before capturing (milliseconds).', '屏幕停止变化后的额外延迟（毫秒）。'],
  ['Maximum long-side to short-side ratio accepted when validating captures against Play Console rules.', '根据 Play Console 规则验证截图时的最大长宽比。'],
  ['Font scales preselected when running the locale and accessibility matrix.', '运行多语言与无障碍矩阵时预选的字体大小。'],
  ['Locale tags offered when running the locale and accessibility matrix, for example en-US or ar.', '运行多语言与无障碍矩阵时提供的语言标签，例如 en-US 或 ar。'],
  ['When a landscape capture will not rotate, temporarily lower the display density so the launcher treats the device as a tablet. Captures taken this way are marked in the report, because the density is not the device\'s own.', '当横屏截图无法旋转时，临时降低显示密度使启动器将设备视为平板。这样截取的图片会在报告中标注，因为密度并非设备自身的。'],
  ['Check connecting devices for display, rotation, or screenshot-mode overrides left behind by an interrupted capture run, and offer to clear them.', '检查连接设备上是否存在被中断的截图任务遗留的显示、旋转或截图模式覆盖，并提供清除选项。'],
  ['Clock shown in screenshot mode, as four digits in 24-hour HHMM form.', '截图模式下显示的时间，24 小时制 HHMM 格式。'],
  ['Battery percentage shown in screenshot mode.', '截图模式下显示的电池百分比。'],
  ['Wi-Fi and mobile signal bars shown in screenshot mode.', '截图模式下显示的 Wi-Fi 和移动信号条数。'],
  ['Hide notification icons in screenshot mode.', '截图模式下隐藏通知图标。'],
  ['Hide alarm, Bluetooth, location, and other status icons.', '隐藏闹钟、蓝牙、定位和其他状态图标。'],
];
// ============================================================

function applyJsonPatch(content: string): string {
  let result = content;
  for (const [from, to] of PACKAGE_JSON_REPLACEMENTS) {
    result = result.split(from).join(to);
  }
  return result;
}

function applyRuntimePatch(content: string): string {
  let result = content;
  for (const [from, to] of RUNTIME_STRING_REPLACEMENTS) {
    result = result.split(from).join(to);
  }
  return result;
}

// ============================================================
// Core Actions
// ============================================================

async function backupFile(targetPath: string): Promise<string | undefined> {
  if (!fs.existsSync(targetPath)) return undefined;
  const backupPath = targetPath + BACKUP_SUFFIX;
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(targetPath, backupPath);
  }
  return backupPath;
}

async function restoreFile(targetPath: string): Promise<boolean> {
  const backupPath = targetPath + BACKUP_SUFFIX;
  if (!fs.existsSync(backupPath)) {
    return false;
  }
  fs.copyFileSync(backupPath, targetPath);
  fs.unlinkSync(backupPath);
  return true;
}

async function applyChinese(): Promise<string> {
  const extPath = getMainExtensionPath();
  if (!extPath) {
    return '未找到 Caspian Emulator 主扩展，请先安装 CaspianTools.caspian-emulator。';
  }

  const pkgPath = getMainPackageJsonPath(extPath);
  const outPath = getMainOutPath(extPath);

  if (!fs.existsSync(pkgPath) || !fs.existsSync(outPath)) {
    return '主扩展目录不完整，缺少 package.json 或 out/extension.js。';
  }

  await backupFile(pkgPath);
  await backupFile(outPath);

  const pkgContent = fs.readFileSync(pkgPath, 'utf8');
  const patchedPkg = applyJsonPatch(pkgContent);
  if (patchedPkg !== pkgContent) {
    fs.writeFileSync(pkgPath, patchedPkg, 'utf8');
  }

  const outContent = fs.readFileSync(outPath, 'utf8');
  const patchedOut = applyRuntimePatch(outContent);
  if (patchedOut !== outContent) {
    fs.writeFileSync(outPath, patchedOut, 'utf8');
  }

  return '汉化补丁已应用到主扩展：' + extPath;
}

async function restoreOriginal(): Promise<string> {
  const extPath = getMainExtensionPath();
  if (!extPath) {
    return '未找到 Caspian Emulator 主扩展。';
  }

  const pkgPath = getMainPackageJsonPath(extPath);
  const outPath = getMainOutPath(extPath);

  let restored = 0;
  if (await restoreFile(pkgPath)) restored++;
  if (await restoreFile(outPath)) restored++;

  if (restored === 0) {
    return '未找到备份文件，无法还原。';
  }
  return `已还原 ${restored} 个文件到汉化前版本。`;
}

// ============================================================
// Update Watcher
// ============================================================

function watchMainExtension(): vscode.Disposable | undefined {
  const extPath = getMainExtensionPath();
  if (!extPath) return undefined;

  const outPath = getMainOutPath(extPath);
  if (!fs.existsSync(outPath)) return undefined;

  let mtime = fs.statSync(outPath).mtimeMs;

  return vscode.workspace.onDidChangeTextDocument(() => {
    // recheck on document changes is not useful here; we rely on timer
  });
}

let mainWatcher: NodeJS.Timeout | undefined;

function startUpdateWatcher() {
  if (mainWatcher) return;
  mainWatcher = setInterval(() => {
    const extPath = getMainExtensionPath();
    if (!extPath) return;
    const outPath = getMainOutPath(extPath);
    if (!fs.existsSync(outPath)) return;
    // If user wants auto-apply, we can reapply here.
    // For now, only notify.
  }, 5000);
}

function stopUpdateWatcher() {
  if (mainWatcher) {
    clearInterval(mainWatcher);
    mainWatcher = undefined;
  }
}

// ============================================================
// Activation
// ============================================================

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const autoApply = getConfig('autoApplyOnStartup', true);
  const autoUpdate = getConfig('autoApplyOnUpdate', true);

  const applyCmd = vscode.commands.registerCommand('caspianChinese.apply', async () => {
    const msg = await applyChinese();
    vscode.window.showInformationMessage(msg, '重新加载窗口').then(choice => {
      if (choice === '重新加载窗口') {
        vscode.commands.executeCommand('workbench.action.reloadWindow');
      }
    });
  });

  const restoreCmd = vscode.commands.registerCommand('caspianChinese.restore', async () => {
    const msg = await restoreOriginal();
    vscode.window.showInformationMessage(msg, '重新加载窗口').then(choice => {
      if (choice === '重新加载窗口') {
        vscode.commands.executeCommand('workbench.action.reloadWindow');
      }
    });
  });

  const openConfigCmd = vscode.commands.registerCommand('caspianChinese.openConfig', () => {
    vscode.commands.executeCommand('workbench.action.openSettings', 'caspianEmulatorChinese');
  });

  const reloadCmd = vscode.commands.registerCommand('caspianChinese.reload', async () => {
    await applyChinese();
    vscode.window.showInformationMessage('汉化已重新应用', '重新加载窗口').then(choice => {
      if (choice === '重新加载窗口') {
        vscode.commands.executeCommand('workbench.action.reloadWindow');
      }
    });
  });

  context.subscriptions.push(applyCmd, restoreCmd, openConfigCmd, reloadCmd);

  if (autoApply) {
    try {
      const extPath = getMainExtensionPath();
      const pkgPath = extPath ? getMainPackageJsonPath(extPath) : undefined;
      const backupPath = pkgPath ? pkgPath + BACKUP_SUFFIX : undefined;
      const needsApply = !backupPath || !fs.existsSync(backupPath);

      if (needsApply) {
        const msg = await applyChinese();
        if (getConfig('showNotifications', true)) {
          vscode.window.showInformationMessage(msg, '重新加载窗口').then(choice => {
            if (choice === '重新加载窗口') {
              vscode.commands.executeCommand('workbench.action.reloadWindow');
            }
          });
        }
      }
    } catch (err) {
      vscode.window.showErrorMessage('Caspian 汉化应用失败：' + (err instanceof Error ? err.message : err));
    }
  }

  if (autoUpdate) {
    startUpdateWatcher();
  }
}

export async function deactivate(): Promise<void> {
  stopUpdateWatcher();
}
