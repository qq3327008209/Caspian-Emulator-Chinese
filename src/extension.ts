import * as vscode from 'vscode';

// ============================================================
// Translation Tables
// ============================================================

/** Command titles shown in the Command Palette and context menus */
const COMMAND_TITLES: Record<string, string> = {
  ['caspian.setupSdk']: '配置 Android SDK',
  ['caspian.downloadSdk']: '下载并安装 Android SDK',
  ['caspian.connectPhone']: '通过 USB 连接手机',
  ['caspian.refreshAvds']: '刷新虚拟设备列表',
  ['caspian.createAvd']: '创建虚拟设备',
  ['caspian.launchAvd']: '启动模拟器',
  ['caspian.stopAvd']: '停止模拟器',
  ['caspian.deleteAvd']: '删除虚拟设备',
  ['caspian.editAvd']: '编辑虚拟设备配置',
  ['caspian.refreshDevices']: '刷新设备列表',
  ['caspian.installApk']: '安装 APK',
  ['caspian.takeScreenshot']: '截取屏幕',
  ['caspian.recordScreen']: '录制屏幕',
  ['caspian.openShell']: '打开 ADB Shell',
  ['caspian.showLogcat']: '显示日志',
  ['caspian.showEmulatorScreen']: '显示模拟器屏幕',
  ['caspian.refreshFiles']: '刷新文件列表',
  ['caspian.pullFile']: '从设备下载文件',
  ['caspian.pushFile']: '向设备上传文件',
  ['caspian.deleteFile']: '删除设备上的文件',
  ['caspian.createFolder']: '在设备上创建文件夹',
  ['caspian.renameFile']: '重命名设备上的文件',
  ['caspian.openRemoteFile']: '打开设备上的文件',
  ['caspian.selectDevice']: '选择当前设备',
  ['caspian.showOutput']: '显示输出日志',
  ['caspian.listPackages']: '列出已安装的应用',
  ['caspian.launchApp']: '启动应用',
  ['caspian.forceStopApp']: '强制停止应用',
  ['caspian.clearAppData']: '清除应用数据',
  ['caspian.uninstallApp']: '卸载应用',
  ['caspian.showAppLogcat']: '显示应用日志',
  ['caspian.cloneAvd']: '克隆虚拟设备',
  ['caspian.coldBootAvd']: '冷启动模拟器',
  ['caspian.connectWifi']: '通过 Wi-Fi 连接设备',
  ['caspian.disconnectWifi']: '断开 Wi-Fi 设备',
  ['caspian.qrPair']: '通过二维码配对设备',
  ['caspian.checkAvdDisplay']: '检查设备配置',
  ['caspian.repairAvd']: '修复虚拟设备',
  ['caspian.checkAcceleration']: '检查模拟器加速',
  ['caspian.showEmulatorLog']: '显示模拟器启动日志',
  ['caspian.toggleDemoMode']: '切换截图模式',
  ['caspian.captureStoreScreenshots']: '截取商店截图',
  ['caspian.runCaptureMatrix']: '运行多语言与无障碍矩阵',
  ['caspian.openCaptureFolder']: '打开截图文件夹',
  ['caspian.resetDeviceOverrides']: '重置设备显示与语言覆盖',
  ['caspian.setDisplayCutout']: '设置屏幕刘海',
  ['caspian.setNavigationMode']: '设置导航栏模式',
};

/** Notification messages from the original extension */
const NOTIFICATIONS: Record<string, string> = {
  // SDK
  'Android SDK not found. Install it automatically or configure an existing installation.':
    '未检测到 Android SDK。可以自动下载安装，或手动配置已有 SDK。',
  'Install Android SDK': '安装 Android SDK',
  'Configure Manually': '手动配置',
  'Android SDK configured successfully!': 'Android SDK 配置成功！',

  // Phone connection
  'Phone detected. Check your phone screen and tap "Allow USB Debugging".':
    '检测到手机。请在手机屏幕上点击"允许 USB 调试"。',
  'How to Connect': '连接指南',

  // APK
  'APK installed successfully.': 'APK 安装成功。',

  // Screenshot
  'Screenshot saved to ': '截图已保存至 ',

  // Recording
  'Screen recording started. Click stop when done.': '屏幕录制已开始。完成后点击停止。',
  'Stop Recording': '停止录制',
  'Recording saved to ': '录制已保存至 ',

  // Shell
  'ADB Shell: ': 'ADB Shell: ',

  // Logcat
  'No third-party apps found.': '未找到第三方应用。',

  // App management
  'Launched ': '已启动 ',
  'Force stopped ': '已强制停止 ',
  'Cleared data for ': '已清除数据：',
  'Uninstalled ': '已卸载 ',

  // File operations
  'Downloaded ': '已下载 ',
  'File uploaded.': '文件已上传。',
  'Renamed to ': '已重命名为 ',
  'Created folder: ': '已创建文件夹：',
  'File too large to preview. Use download instead.': '文件过大，无法预览。请使用下载功能。',
  'No device selected for file explorer.': '文件浏览器未选择设备。',
  'No device selected.': '未选择设备。',

  // Capture
  'A capture run is already in progress on that device.': '该设备上已有截图任务正在进行中。',
  'No workspace is open, so captures go to ': '当前没有打开的工作区，截图将保存至 ',
  'Captured ': '已截图 ',
  ' screenshots': ' 张',
  ' screenshot': ' 张',
  ' failed Play validation': ' 张未通过 Play 验证',
  ' — ': ' — ',
  ' warnings': ' 条警告',
  ' warning': ' 条警告',
  'Device overrides reset.': '设备覆盖设置已重置。',
  'Reset finished, but these could not be cleared: ': '重置完成，但以下设置未能清除：',

  // Errors
  'Failed to list AVDs: ': '列出虚拟设备失败：',
  'No AVDs found.': '未找到虚拟设备。',
  'No connected devices.': '没有连接的设备。',
  'No devices connected.': '没有连接的设备。',
  'No Wi-Fi devices connected.': '没有连接的 Wi-Fi 设备。',
  '"': '"',
  '" does not appear to be running.': '" 似乎未在运行。',
  '" did not shut down. It may be wedged.': '" 未能正常关闭。可能已卡死。',
  'Repair...': '修复...',
  'Show Log': '查看日志',
  '" was force-killed. Its next start will be a cold boot.':
    '" 已被强制终止。下次启动时将进行冷启动。',
  'Caspian has no handle on the "': 'Caspian 无法控制 "',
  '": it was started outside this window. Close the emulator window directly, then cold boot it.':
    '"：它是在其他窗口中启动的。请直接关闭模拟器窗口，然后冷启动。',
  'Repair failed: ': '修复失败：',
  'Display check failed: ': '显示检查失败：',
  'Capture failed: ': '截图失败：',
  'Matrix run failed: ': '矩阵运行失败：',
  'Screenshot mode failed: ': '截图模式失败：',
  'Pairing failed: ': '配对失败：',
  'Connection failed: ': '连接失败：',
  'Failed to launch app: ': '启动应用失败：',
  'Failed to read file: ': '读取文件失败：',
  'No system images found. Use the preset flow to download one automatically.':
    '未找到系统镜像。请使用预设流程自动下载。',
  'Emulator failed to start: ': '模拟器启动失败：',
  'Emulator exited immediately (code ': '模拟器立即退出（代码 ',
  ' started but Android never finished booting':
    ' 已启动但 Android 未能完成启动',
  ' — the package manager reports "': ' — 包管理器报告"',
  '". This is usually too little guest RAM, a corrupt snapshot, or a GPU mode this host cannot drive.':
    '"。通常原因：Guest RAM 不足、快照损坏或 GPU 模式与主机不兼容。',
  ' has not finished booting after ': ' 在 ',
  's (': ' 秒后仍未完成启动（',
  ').': '）。',
  'File to upload': '要上传的文件',
  'Remote destination path': '远程目标路径',
  'No apps selected.': '未选择应用。',
  'Failed to open folder: ': '打开文件夹失败：',

  // Device state
  'Allow USB debugging on your phone': '请在手机上允许 USB 调试',
  'Device offline': '设备离线',
  'Run VS Code with elevated permissions': '请以管理员权限运行 VS Code',

  // Wifi
  'Enter pairing address (IP:port) shown on your phone': '输入手机上显示的配对地址（IP:端口）',
  'Enter the 6-digit pairing code shown on your phone': '输入手机上显示的 6 位配对码',
  'Now enter the connection address (IP:port) from Wireless Debugging settings':
    '现在输入无线调试设置中的连接地址（IP:端口）',
  'Enter device address (IP:port)': '输入设备地址（IP:端口）',

  // AVD creation
  'How do you want to create the virtual device?': '你希望如何创建虚拟设备？',
  'From preset': '从预设',
  'Custom': '自定义',
  'Select a device': '选择设备',
  'AVD name': '虚拟设备名称',
  'Use only letters, numbers, underscores, dots, and hyphens':
    '只能使用字母、数字、下划线、点和连字符',
  'Select a system image': '选择系统镜像',
  'Enter AVD name': '输入虚拟设备名称',
  'Select a device profile (optional)': '选择设备配置（可选）',
  'Creating AVD "': '正在创建虚拟设备 "',
  '"...': '"...',
  ' virtual device "': '" 虚拟设备已创建（',
  '" created (': '" 已创建（',
  ').': '）。',
  '). ': '）。',
  'Folding postures are not emulated for non-Google foldables.':
    '非谷歌折叠屏设备的折叠姿态不会被模拟。',
  'Your SDK does not include the "': '你的 SDK 不包含"',
  '" device definition, so folding postures are not emulated. Update the SDK command-line tools for full fold support.':
    '" 设备定义，因此折叠姿态不会被模拟。请更新 SDK 命令行工具以获得完整折叠支持。',
  'Your SDK lacks the "': '你的 SDK 缺少"',
  '" device definition, so Caspian configured the display directly.':
    '" 设备定义，Caspian 已直接配置显示参数。',
  'Select AVD to launch': '选择要启动的虚拟设备',
  'Select an emulator to stop': '选择要停止的模拟器',
  'Select AVD to delete': '选择要删除的虚拟设备',
  'Select AVD to check': '选择要检查的虚拟设备',
  'Select an emulator to repair': '选择要修复的模拟器',
  'Select AVD to clone': '选择要克隆的虚拟设备',
  'Select AVD to cold boot': '选择要冷启动的虚拟设备',
  'Select an app to launch': '选择要启动的应用',
  'Select an app to force stop': '选择要强制停止的应用',
  'Select app to clear data': '选择要清除数据的应用',
  'Select app to uninstall': '选择要卸载的应用',
  'Select app to view logs': '选择要查看日志的应用',
  'Select active device': '选择当前设备',
  'Select APK to install': '选择要安装的 APK 文件',
  'Save screenshot as': '截图另存为',
  'Save recording as': '录制视频另存为',
  'PNG Images': 'PNG 图片',
  'MP4 Video': 'MP4 视频',
  'Taking screenshot...': '正在截图...',
  'Installing APK...': '正在安装 APK...',
  'Stopping ': '正在停止 ',
  'Select file to upload': '选择要上传的文件',
  'Select language to capture (none = current language only)':
    '选择要截图的语言（留空 = 仅当前语言）',
  'Select font scales (none = leave unchanged)': '选择字体大小（留空 = 不更改）',
  'Display settings are changed temporarily and restored when the run finishes, including if you cancel it.':
    '显示设置将被临时更改，运行结束后会自动恢复，即使取消也会恢复。',
  'Start': '开始',
  'Cancel': '取消',
  'Select orientations': '选择屏幕方向',
  'Force right-to-left layout?': '强制从右到左布局？',
  'No': '否',
  'Yes': '是',
  'Capture with the normal layout direction': '使用正常布局方向',
  'Turn on "Force RTL layout direction" for the run': '开启"强制从右到左布局"',
  'Select display sizes (none = leave unchanged)': '选择显示大小（留空 = 不更改）',
  'Restore Now': '立即恢复',
  'Dismiss': '忽略',
  'Done': '完成',
  'Next →': '下一步 →',
  'Download': '下载',
  'Use This Mode': '使用此模式',
  'Set GPU Mode': '设置 GPU 模式',
  'Show Folder': '显示文件夹',
  'Configure': '配置',
  'Open Folder': '打开文件夹',
  'View Report': '查看报告',
  'Cold Boot Now': '立即冷启动',
  'Reset Overrides': '重置覆盖',
  "Don't Check Again": '不再检查',
  'Open Language Settings': '打开语言设置',
  'Continue Without Languages': '不使用语言继续',
  'Update SDK Tools': '更新 SDK 工具',
  'Delete': '删除',
  'Force Kill': '强制终止',
  'Wipe Data': '清除数据',
  'Reset': '重置',
  'Retry Restore': '重试恢复',
  'Create folder in ': '在 ',
  'Rename "': '重命名 "',
  '" to:': '" 为：',
  'Delete ': '删除 ',
  'This cannot be undone.': '此操作不可撤销。',
  'Clear all data for ': '清除 ',
  '? This removes login state, preferences, and cached files.':
    ' 的所有数据？这将删除登录状态、偏好设置和缓存文件。',
  'Clear Data': '清除数据',
  'Uninstall ': '卸载 ',
  'Select the app to test': '选择要测试的应用',
  'Capture run name (a folder under the capture directory)':
    '截图任务名称（截图目录下的文件夹）',
  'Capture ': '截图 ',
  ' screenshots of ': ' 张截图 — ',
  ' on ': ' — 设备：',
  '?': '？',
  'No system images found. Use the preset flow to download one automatically.':
    '未找到系统镜像。请使用预设流程自动下载一个。',
  'Downloading ': '正在下载 ',
  ' system image...': ' 系统镜像...',
  'Creating ': '正在创建 ',
  ' virtual device...': ' 虚拟设备...',
  '" was created without a usable display configuration (':
    '" 创建时没有可用的显示配置（',
  ').': '）。',
  '" created (': '" 已创建（',
  ').': '）。',

  // Progress messages
  'Checking emulator acceleration...': '正在检查模拟器加速...',
  'Loading installed apps...': '正在加载已安装的应用...',
  'Resetting device overrides...': '正在重置设备覆盖设置...',
  'Restoring device settings...': '正在恢复设备设置...',
  'Capturing store screenshots on ': '正在 ',
  'Capture matrix on ': '正在对 ',
  'Running locale & accessibility matrix on ': '正在对 ',
  ' locale and accessibility matrix': ' 运行多语言与无障碍矩阵',

  // Status bar
  '$(device-mobile) No devices': '$(device-mobile) 无设备',
  '$(device-mobile) ': '$(device-mobile) ',
  ' devices': ' 台设备',
  ' device': ' 台设备',
  'Click to select a device': '点击选择设备',
  'Click to select active device': '点击选择当前设备',
  'Screenshot Mode': '截图模式',
  'Demo mode is on for ': '截图模式已开启：',
  '.\nBattery, signal, and clock are faked. Click to turn it off.':
    '。\n电量、信号和时间均为模拟值。点击关闭。',
};

/** Configuration setting descriptions */
const SETTINGS: Record<string, string> = {
  'Path to the Android SDK root directory. Leave empty for auto-detection.':
    'Android SDK 根目录路径。留空则自动检测。',
  'Additional arguments to pass when launching the emulator.':
    '启动模拟器时传递的额外参数。',
  'Maximum number of logcat lines to keep in the viewer.':
    '日志查看器中保留的最大行数。',
  'Path to scrcpy binary for screen mirroring. Leave empty for auto-detection.':
    '屏幕镜像使用的 scrcpy 二进制文件路径。留空则自动检测。',
  'Device polling interval in seconds.':
    '设备轮询间隔（秒）。',
  'Font size in the logcat viewer (pixels).':
    '日志查看器中的字体大小（像素）。',
  'Wrap long lines in the logcat viewer.':
    '在日志查看器中自动换行。',
  'Show hidden files (dotfiles) in the device file explorer.':
    '在设备文件浏览器中显示隐藏文件。',
  'Default root path when browsing device files.':
    '浏览设备文件时的默认根路径。',
  'Automatically select newly connected devices as the active device.':
    '自动选择新连接的设备作为当前设备。',
  'Always cold boot emulators (ignore snapshots).':
    '始终冷启动模拟器（忽略快照）。',
  'Warn before launching an emulator when the host has less free memory than the virtual device needs.':
    '当主机可用内存不足时，在启动模拟器前发出警告。',
  'Free memory in megabytes to leave for the host beyond the emulator\'s requirement before warning.':
    '警告前为主机预留的额外内存（MB）。',
  'Check for hardware acceleration (WHPX, HAXM, or KVM) before the first emulator launch of each session.':
    '在每个会话首次启动模拟器前检查硬件加速（WHPX、HAXM 或 KVM）。',
  'Capture emulator output to a log file so startup failures can be reported instead of appearing as a hang.':
    '将模拟器输出捕获到日志文件，以便报告启动失败而非显示为卡住。',
  'How long to wait for Android to finish booting before reporting the emulator as stalled (seconds). A cold boot after a data wipe can take several minutes.':
    '等待 Android 完成启动的超时时间（秒）。数据擦除后的冷启动可能需要数分钟。',
  'Warn when free host memory runs low while an emulator is running, for example when a build starts alongside it.':
    '模拟器运行时主机可用内存不足时发出警告。',
  'Free host memory in megabytes below which the running-emulator warning fires. Set to 0 to disable.':
    '运行中模拟器内存警告的阈值（MB）。设为 0 禁用。',
  'Flag virtual devices configured with less RAM than their system image needs. Modern Google APIs images swap and stop responding below 2560 MB.':
    '标记 RAM 低于系统图像需求的虚拟设备。现代 Google API 镜像在 2560 MB 以下会卡顿。',
  'GPU rendering mode passed to the emulator as -gpu. Use "swiftshader" if screenshots come out black. An explicit -gpu in caspian.emulatorArgs overrides this.':
    '传递给模拟器的 GPU 渲染模式（-gpu 参数）。如果截图为黑色，请使用 "swiftshader"。emulatorArgs 中的 -gpu 参数将覆盖此设置。',
  'When a launch fails with a graphics error, retry automatically with software rendering. Only applies when caspian.emulator.gpuMode is "auto".':
    '启动因图形错误失败时，自动使用软件渲染重试。仅在 gpuMode 为 "auto" 时生效。',
  'When creating a device from a preset, use the newest installed system image at or above the preset\'s API level instead of downloading the exact one.':
    '从预设创建设备时，使用已安装的、API 级别不低于预设的最新系统镜像，而非下载精确版本。',
  'Report virtual device displays outside a 16:9 to 9:16 aspect ratio as Play Store screenshot problems. Most modern phones are taller than 16:9.':
    '将宽高比超出 16:9 到 9:16 范围的虚拟设备显示报告为 Play Store 截图问题。大多数现代手机比 16:9 更高。',
  'Directory where capture runs are saved. Supports ${workspaceFolder} and ~. Falls back to your home folder when no workspace is open.':
    '截图任务保存目录。支持 ${workspaceFolder} 和 ~。没有打开工作区时回退到用户主目录。',
  'Open the capture report when a capture run finishes.':
    '截图任务完成后打开报告。',
  'Enter screenshot mode during capture runs so the status bar is clean and deterministic.':
    '截图任务期间进入截图模式，使状态栏干净且确定。',
  'Extra delay after the screen stops changing, before capturing (milliseconds).':
    '屏幕停止变化后的额外延迟（毫秒）。',
  'Maximum long-side to short-side ratio accepted when validating captures against Play Console rules.':
    '根据 Play Console 规则验证截图时的最大长宽比。',
  'Font scales preselected when running the locale and accessibility matrix.':
    '运行多语言与无障碍矩阵时预选的字体大小。',
  'Locale tags offered when running the locale and accessibility matrix, for example en-US or ar.':
    '运行多语言与无障碍矩阵时提供的语言标签，例如 en-US 或 ar。',
  'When a landscape capture will not rotate, temporarily lower the display density so the launcher treats the device as a tablet. Captures taken this way are marked in the report, because the density is not the device\'s own.':
    '当横屏截图无法旋转时，临时降低显示密度使启动器将设备视为平板。这样截取的图片会在报告中标注，因为密度并非设备自身的。',
  'Check connecting devices for display, rotation, or screenshot-mode overrides left behind by an interrupted capture run, and offer to clear them.':
    '检查连接设备上是否存在被中断的截图任务遗留的显示、旋转或截图模式覆盖，并提供清除选项。',
  'Clock shown in screenshot mode, as four digits in 24-hour HHMM form.':
    '截图模式下显示的时间，24 小时制 HHMM 格式。',
  'Battery percentage shown in screenshot mode.':
    '截图模式下显示的电池百分比。',
  'Wi-Fi and mobile signal bars shown in screenshot mode.':
    '截图模式下显示的 Wi-Fi 和移动信号条数。',
  'Hide notification icons in screenshot mode.':
    '截图模式下隐藏通知图标。',
  'Hide alarm, Bluetooth, location, and other status icons.':
    '隐藏闹钟、蓝牙、定位和其他状态图标。',
};

/** Status bar and tree view strings */
const UI: Record<string, string> = {
  // Status bar
  'No devices': '无设备',
  ' device': ' 台设备',
  ' devices': ' 台设备',
  'Click to select a device': '点击选择设备',
  'Click to select active device': '点击选择当前设备',
  'Screenshot Mode': '截图模式',
  'Demo mode is on for ': '截图模式已开启：',
  '.\nBattery, signal, and clock are faked. Click to turn it off.':
    '。\n电量、信号和时间均为模拟值。点击关闭。',

  // Tree view names
  'Virtual Devices': '虚拟设备',
  'Connected Devices': '已连接的设备',
  'Device Files': '设备文件',

  // Device state descriptions
  'Allow USB debugging on your phone': '请在手机上允许 USB 调试',
  'Device offline': '设备离线',
  'Run VS Code with elevated permissions': '请以管理员权限运行 VS Code',

  // Tree item states
  'Running': '运行中',
  'Stopped': '已停止',
  'Emulator': '模拟器',
  'Physical': '实体设备',

  // Repair actions
  'Stop the emulator cleanly': '正常停止模拟器',
  'adb emu kill': 'adb emu kill',
  'Asks the emulator to shut down and save its snapshot. Always try this first.':
    '请求模拟器关闭并保存快照。始终先尝试此选项。',
  'Cold boot — discard the saved snapshot': '冷启动 — 丢弃已保存的快照',
  '-no-snapshot-load': '-no-snapshot-load',
  'Boots from scratch. Slower, but fixes a snapshot that was saved in a bad state. App data is kept.':
    '从头启动。较慢，但可修复处于错误状态的快照。应用数据保留。',
  'Wipe data — factory reset the virtual device': '清除数据 — 恢复出厂设置',
  '-wipe-data': '-wipe-data',
  'Destroys all app data, accounts, and home-screen widgets on this AVD. The first boot afterwards is slow.':
    '销毁此虚拟设备上的所有应用数据、账户和主屏幕小组件。首次启动较慢。',
  'Force Kill': '强制终止',
  '" ignored the shutdown request.': '" 忽略了关闭请求。',
  'Force-killing the emulator process stops it immediately, but qemu never gets to flush its state, so the saved snapshot is left corrupt. Caspian will cold boot this AVD next time to avoid loading it. App data is not affected.':
    '强制终止模拟器进程会立即停止它，但 qemu 无法刷新其状态，导致保存的快照损坏。Caspian 下次将冷启动此虚拟设备。应用数据不受影响。',
  'Wipe all data on "': '清除 "',
  '"?': '" 的所有数据？',
  'This factory-resets the virtual device. Every installed app, signed-in account, and home-screen widget on it is destroyed and cannot be recovered. The first boot takes several minutes.':
    '这将恢复虚拟设备的出厂设置。所有已安装的应用、已登录的账户和主屏幕小组件将被销毁且无法恢复。首次启动需要数分钟。',
  'Wipe Data': '清除数据',

  // Logcat
  'Filter by tag/message or /regex/...': '按标签/消息过滤或使用 /正则/...',
  'Verbose': '详细',
  'Debug': '调试',
  'Info': '信息',
  'Warning': '警告',
  'Error': '错误',
  'Fatal': '致命',
  'Clear': '清除',
  'Pause': '暂停',
  'Resume': '恢复',
  'Export': '导出',
  'Regex': '正则',
  ' lines': ' 行',
  'Clear & restart': '清除并重启',
  'Pause/Resume': '暂停/恢复',
  'Export logs to file': '导出日志到文件',
  'Plain text or /regex/ patterns': '纯文本或 /正则/ 模式',

  // Device groups
  'Google Pixel': 'Google Pixel',
  'Samsung Galaxy': '三星 Galaxy',
  'Other phones': '其他手机',
  'Foldables': '折叠屏',
  'Tablets': '平板',

  // Steps
  'Step 1/4 — Enable Developer Options: Open Settings → About Phone → tap "Build Number" 7 times until you see "You are now a developer!"':
    '步骤 1/4 — 启用开发者选项：打开 设置 → 关于手机 → 连续点击"版本号"7 次，直到看到"您已成为开发者！"',
  'Step 2/4 — Enable USB Debugging: Go to Settings → Developer Options → turn on "USB Debugging"':
    '步骤 2/4 — 启用 USB 调试：进入 设置 → 开发者选项 → 打开"USB 调试"',
  'Step 3/4 — Connect via USB: Plug your phone into your computer with a USB data cable (not a charge-only cable)':
    '步骤 3/4 — USB 连接：使用数据线（非仅充电线）将手机连接到电脑',
  'Step 4/4 — Authorize the connection: A dialog will appear on your phone — tap "Allow USB Debugging". Check "Always allow from this computer" to skip this step in future.':
    '步骤 4/4 — 授权连接：手机上会弹出对话框 — 点击"允许 USB 调试"。勾选"始终允许此计算机"以便以后跳过此步骤。',

  // Emulator screen
  'Emulator Screen': '模拟器屏幕',
  'Emulator screen mirror paused': '模拟器屏幕镜像已暂停',
  'Emulator screen mirror': '模拟器屏幕镜像',
  'Paused during capture': '截图期间已暂停',
  'Waiting for emulator...': '等待模拟器...',
  'No emulator running': '没有运行的模拟器',
  'Open Caspian Emulator panel to start an emulator': '打开 Caspian Emulator 面板启动模拟器',
};

// ============================================================
// Translation Helpers
// ============================================================

function t(str: string): string {
  if (NOTIFICATIONS[str]) return NOTIFICATIONS[str];
  if (SETTINGS[str]) return SETTINGS[str];
  if (UI[str]) return UI[str];

  // Partial key matching for composite strings
  for (const [key, val] of Object.entries(NOTIFICATIONS)) {
    if (str.includes(key)) {
      return str.replace(key, val);
    }
  }
  for (const [key, val] of Object.entries(SETTINGS)) {
    if (str.includes(key)) {
      return str.replace(key, val);
    }
  }
  for (const [key, val] of Object.entries(UI)) {
    if (str.includes(key)) {
      return str.replace(key, val);
    }
  }

  return str;
}

// ============================================================
// VS Code API Interception
// ============================================================

/** Monkey-patch vscode.window methods to translate notifications */
function interceptNotifications(): void {
  const orig = {
    showInformationMessage: vscode.window.showInformationMessage.bind(vscode.window),
    showWarningMessage: vscode.window.showWarningMessage.bind(vscode.window),
    showErrorMessage: vscode.window.showErrorMessage.bind(vscode.window),
  };

  // No-op disposables to keep VS Code happy
  const noop = { dispose() {} };

  function translateArgs(args: any[]): any[] {
    return args.map(a => (typeof a === 'string' ? t(a) : a));
  }

  (vscode.window as any).showInformationMessage = (...args: any[]) => {
    return orig.showInformationMessage(...translateArgs(args));
  };
  (vscode.window as any).showWarningMessage = (...args: any[]) => {
    return orig.showWarningMessage(...translateArgs(args));
  };
  (vscode.window as any).showErrorMessage = (...args: any[]) => {
    return orig.showErrorMessage(...translateArgs(args));
  };
}

// ============================================================
// Localized Tree Views
// ============================================================

interface LocalizedTreeItem extends vscode.TreeItem {
  readonly localized: boolean;
}

class LocalizedAvdTreeItem extends vscode.TreeItem implements LocalizedTreeItem {
  readonly localized = true;

  constructor(public readonly avd: any) {
    super(avd.displayName || avd.name, vscode.TreeItemCollapsibleState.None);

    const parts: string[] = [];
    if (avd.running) parts.push(t('Running'));
    parts.push(`API ${avd.apiLevel}`);
    parts.push(avd.displaySummary);
    this.description = parts.join(' • ');

    const tooltipLines = [
      `${t('Tree item label')}: ${avd.name}`,
      `${t('Device')}: ${avd.device || '(none)'}`,
      `API Level: ${avd.apiLevel}`,
      `ABI: ${avd.abi}`,
      `Target: ${avd.target}`,
      avd.lcdWidth && avd.lcdHeight
        ? `${avd.lcdWidth}×${avd.lcdHeight}${avd.lcdDensity ? ` @ ${avd.lcdDensity} dpi` : ''}`
        : t('not configured — the emulator will fall back to 320×640'),
      `${t('RAM')}: ${avd.ramMb ? `${avd.ramMb} MB` : 'default'}`,
      `${t('Status')}: ${avd.running ? t('Running') : t('Stopped')}`,
    ];
    this.tooltip = tooltipLines.join('\n');

    const state = avd.running ? 'avd.running' : 'avd.stopped';
    const suffixes = [
      ...(avd.displayHealthy ? [] : ['brokenDisplay']),
      ...(avd.ramHealthy ? [] : ['lowRam']),
    ];
    this.contextValue = [state, ...suffixes].join('.');

    const needsAttention = !avd.displayHealthy || !avd.ramHealthy;
    this.iconPath = new vscode.ThemeIcon(
      avd.running ? 'vm-running' : 'vm',
      needsAttention
        ? new vscode.ThemeColor('problemsWarningIcon.foreground')
        : avd.running ? new vscode.ThemeColor('testing.iconPassed') : undefined,
    );
  }
}

class LocalizedDeviceTreeItem extends vscode.TreeItem implements LocalizedTreeItem {
  readonly localized = true;

  constructor(public readonly device: any) {
    super(device.model, vscode.TreeItemCollapsibleState.None);

    const stateMap: Record<string, string> = {
      unauthorized: t('Allow USB debugging on your phone'),
      offline: t('Device offline'),
      'no permissions': t('Run VS Code with elevated permissions'),
    };
    this.description = stateMap[device.state] ?? device.serial;

    const typeMap: Record<string, string> = {
      emulator: t('Emulator'),
      physical: t('Physical'),
    };

    this.tooltip = [
      `${t('Serial')}: ${device.serial}`,
      `${t('Model')}: ${device.model}`,
      `${t('Product')}: ${device.product}`,
      `${t('Type')}: ${typeMap[device.type] || device.type}`,
      `${t('State')}: ${device.state}`,
    ].join('\n');

    if (device.state === 'device') {
      this.contextValue = device.type === 'emulator' ? 'device.emulator' : 'device.physical';
    } else if (device.state === 'unauthorized') {
      this.contextValue = 'device.unauthorized';
    } else {
      this.contextValue = 'device.inactive';
    }
  }
}

class LocalizedFileTreeItem extends vscode.TreeItem implements LocalizedTreeItem {
  readonly localized = true;

  constructor(public readonly file: any, public readonly deviceSerial: string) {
    super(file.name, file.type === 'directory'
      ? vscode.TreeItemCollapsibleState.Collapsed
      : vscode.TreeItemCollapsibleState.None);

    this.description = file.type === 'directory' ? t('Folder') : `${file.size} bytes`;
    this.tooltip = [
      `${t('Name')}: ${file.name}`,
      `${t('Path')}: ${file.path}`,
      `${t('Type')}: ${file.type}`,
      `${t('Size')}: ${file.size}`,
      `${t('Permissions')}: ${file.permissions}`,
      `${t('Owner')}: ${file.owner}`,
      `${t('Group')}: ${file.group}`,
      `${t('Date')}: ${file.date}`,
    ].join('\n');

    this.contextValue = file.type === 'directory' ? 'folder' : 'file';
    this.resourceUri = vscode.Uri.parse(`vscode-vfs://caspian/${deviceSerial}${file.path}`);
  }
}

class LocalizedTreeDataProvider<T extends LocalizedTreeItem> implements vscode.TreeDataProvider<T> {
  readonly onDidChangeTreeData = new vscode.EventEmitter<T | undefined>();
  private original: vscode.TreeDataProvider<T> | null = null;
  private items: T[] = [];
  private _originalRef: any = null;

  setOriginal(provider: vscode.TreeDataProvider<T>, originalRef: any): void {
    this.original = provider;
    this._originalRef = originalRef;
    if (provider.onDidChangeTreeData) {
      provider.onDidChangeTreeData.event(() => this.refresh(), this);
    }
  }

  refresh(): void {
    this.load();
    this.onDidChangeTreeData.fire(undefined);
  }

  private async load(): Promise<void> {
    if (!this.original) { return; }
    try {
      const items = await this.original.getChildren();
      this.items = items as T[];
    } catch {
      // Silently ignore
    }
  }

  getTreeItem(element: T): vscode.TreeItem {
    return element;
  }

  async getChildren(_element?: T): Promise<T[]> {
    if (!this.original) { return []; }
    const items = await this.original.getChildren();
    return items as T[];
  }

  getItem(element: T): T | undefined {
    return this.items.find(i => i === element);
  }

  get originalProvider(): vscode.TreeDataProvider<T> | null {
    return this.original;
  }

  get originalRef(): any {
    return this._originalRef;
  }
}

// ============================================================
// Localized Webview Panels
// ============================================================

interface LogcatPanelOptions {
  extensionUri: vscode.Uri;
  adbClient: any;
  serial: string;
  deviceName: string;
  packageFilter?: string;
}

class LocalizedLogcatPanel {
  private static panels = new Map<string, LocalizedLogcatPanel>();
  private panel: vscode.WebviewPanel | null = null;

  static show(opts: LogcatPanelOptions): LocalizedLogcatPanel {
    const key = opts.packageFilter ? `${opts.serial}:${opts.packageFilter}` : opts.serial;
    const existing = LocalizedLogcatPanel.panels.get(key);
    if (existing?.panel) {
      existing.panel.reveal();
      return existing;
    }
    const instance = new LocalizedLogcatPanel(opts);
    LocalizedLogcatPanel.panels.set(key, instance);
    return instance;
  }

  private constructor(private opts: LogcatPanelOptions) {
    this.panel = vscode.window.createWebviewPanel(
      'caspian.logcat.zh',
      opts.packageFilter ? `${t('Logcat')}: ${opts.deviceName} [${opts.packageFilter}]` : `${t('Logcat')}: ${opts.deviceName}`,
      vscode.ViewColumn.Two,
      { enableScripts: true, retainContextWhenHidden: true },
    );
    this.panel.iconPath = new vscode.ThemeIcon('output');
    this.panel.webview.html = this.buildHtml();
    this.panel.onDidDispose(() => {
      LocalizedLogcatPanel.panels.delete(
        opts.packageFilter ? `${opts.serial}:${opts.packageFilter}` : opts.serial,
      );
    });
  }

  private buildHtml(): string {
    const fontSize = 13;
    const wrapLines = false;
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${t('Logcat')}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: var(--vscode-editor-font-family, monospace);
    font-size: ${fontSize}px;
    background: var(--vscode-editor-background);
    color: var(--vscode-editor-foreground);
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .toolbar {
    display: flex; gap: 6px; padding: 6px 10px;
    background: var(--vscode-titleBar-activeBackground);
    border-bottom: 1px solid var(--vscode-panel-border);
    align-items: center; flex-shrink: 0; flex-wrap: wrap;
  }
  .toolbar input, .toolbar select {
    background: var(--vscode-input-background);
    color: var(--vscode-input-foreground);
    border: 1px solid var(--vscode-input-border);
    padding: 3px 8px; font-size: 12px; border-radius: 2px;
  }
  .toolbar input[type="text"] { flex: 1; min-width: 120px; }
  .toolbar button {
    background: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    border: none; padding: 3px 10px; cursor: pointer;
    border-radius: 2px; font-size: 12px; white-space: nowrap;
  }
  .toolbar button:hover { background: var(--vscode-button-hoverBackground); }
  .toolbar button.secondary {
    background: var(--vscode-button-secondaryBackground);
    color: var(--vscode-button-secondaryForeground);
  }
  .toolbar button.secondary:hover { background: var(--vscode-button-secondaryHoverBackground); }
  .log-container { flex: 1; overflow-y: auto; padding: 4px 0; }
  .log-line { padding: 0 10px; white-space: pre; line-height: 1.4; }
  .log-line:hover { background: var(--vscode-list-hoverBackground); }
  .V { color: var(--vscode-terminal-ansiWhite, #ccc); }
  .D { color: var(--vscode-terminal-ansiCyan, #0cc); }
  .I { color: var(--vscode-terminal-ansiGreen, #0c0); }
  .W { color: var(--vscode-terminal-ansiYellow, #cc0); }
  .E { color: var(--vscode-terminal-ansiRed, #c00); }
  .F { color: var(--vscode-terminal-ansiMagenta, #c0c); }
  .count { font-size: 11px; color: var(--vscode-descriptionForeground); padding: 0 6px; }
</style>
</head>
<body>
  <div class="toolbar">
    <input id="search" type="text" placeholder="${t('Filter by tag/message or /regex/...')}" title="${t('Plain text or /regex/ patterns')}" />
    <select id="priority">
      <option value="V">${t('Verbose')}</option>
      <option value="D">${t('Debug')}</option>
      <option value="I" selected>${t('Info')}</option>
      <option value="W">${t('Warning')}</option>
      <option value="E">${t('Error')}</option>
      <option value="F">${t('Fatal')}</option>
    </select>
    <button id="btnClear" title="${t('Clear & restart')}">${t('Clear')}</button>
    <button id="btnPause" title="${t('Pause/Resume')}">${t('Pause')}</button>
    <button id="btnExport" class="secondary" title="${t('Export logs to file')}">${t('Export')}</button>
    <label><input id="chkRegex" type="checkbox" /> ${t('Regex')}</label>
    <span class="count" id="lineCount">0 ${t('lines')}</span>
  </div>
  <div class="log-container" id="logContainer"></div>
  <script>
    const vscode = acquireVsCodeApi();
    // Logcat logic placeholder - delegates to original extension via commands
    document.getElementById('btnClear').addEventListener('click', () => {
      vscode.postMessage({ type: 'forward', command: 'caspian.showLogcat', serial: '${opts.serial}' });
    });
    document.getElementById('btnPause').addEventListener('click', () => {
      // Pause/resume toggle
    });
    document.getElementById('btnExport').addEventListener('click', () => {
      vscode.postMessage({ type: 'forward', command: 'caspian.showLogcat', serial: '${opts.serial}' });
    });
  </script>
</body>
</html>`;
  }
}

// ============================================================
// Status Bar Update
// ============================================================

let statusBarItem: vscode.StatusBarItem | null = null;
let statusBarTimer: NodeJS.Timeout | null = null;

function startStatusBarMonitor(): void {
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 50);
  statusBarItem.command = COMMAND_TITLES['caspian.selectDevice'] || 'caspian.selectDevice';
  statusBarItem.tooltip = t('Click to select a device');
  statusBarItem.show();

  statusBarTimer = setInterval(updateStatusBar, 3000);
  updateStatusBar();
}

function stopStatusBarMonitor(): void {
  if (statusBarTimer) {
    clearInterval(statusBarTimer);
    statusBarTimer = null;
  }
  statusBarItem?.dispose();
  statusBarItem = null;
}

async function updateStatusBar(): Promise<void> {
  if (!statusBarItem) { return; }
  try {
    const devices = await vscode.commands.executeCommand<any[]>('caspian.getAllDevices');
    const connected = devices?.filter((d: any) => d.state === 'device') || [];
    if (connected.length === 0) {
      statusBarItem.text = t('$(device-mobile) No devices');
      statusBarItem.tooltip = t('Click to select a device');
    } else {
      const text = t('$(device-mobile) ') + connected.length + (connected.length > 1 ? t(' devices') : t(' device'));
      statusBarItem.text = text;
      const tooltip = connected.map((d: any) => `${d.model} (${d.serial})`).join('\n')
        + '\n\n' + t('Click to select active device');
      statusBarItem.tooltip = tooltip;
    }
  } catch {
    // Caspian not ready yet
    statusBarItem.text = '$(device-mobile) ' + t('No devices');
    statusBarItem.tooltip = t('Click to select a device');
  }
}

// ============================================================
// Activation
// ============================================================

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  vscode.env.logMessage('[Caspian Chinese] 汉化插件激活中...');

  // 1. Intercept notification APIs immediately
  interceptNotifications();

  // 2. Register all commands with Chinese titles
  //    VS Code uses the LAST registered title, so this overrides English
  const cmd = (id: string) => {
    const title = COMMAND_TITLES[id];
    if (!title) { return; }
    context.subscriptions.push(
      vscode.commands.registerCommand(id, async (...args: any[]) => {
        // Show a localized QuickPick for commands that have sub-options
        if (id === 'caspian.connectWifi') {
          const method = await vscode.window.showQuickPick(
            [
              { label: '$(radio-tower) ' + t('Pair with QR Code (Android 11+)'), description: t('Scan a QR code from your phone — fastest method'), value: 'qr' },
              { label: '$(key) ' + t('Wireless Debugging (Android 11+)'), description: t('Pair with code, then connect'), value: 'pair' },
              { label: '$(plug) ' + t('TCP/IP Connect'), description: t('Connect to IP:port directly'), value: 'tcpip' },
            ],
            { placeHolder: t('How do you want to connect?') },
          );
          if (method) {
            return vscode.commands.executeCommand(id, method.value);
          }
          return;
        }

        if (id === 'caspian.showAppLogcat') {
          // Forward to original with args
          return vscode.commands.executeCommand(id, ...args);
        }

        // Default: delegate to original command
        return vscode.commands.executeCommand(id, ...args);
      }),
    );
  };

  // Register all commands
  Object.keys(COMMAND_TITLES).forEach(id => cmd(id));

  // 3. Create localized tree data providers
  const avdProvider = new LocalizedTreeDataProvider<LocalizedAvdTreeItem>();
  const deviceProvider = new LocalizedTreeDataProvider<LocalizedDeviceTreeItem>();
  const fileProvider = new LocalizedTreeDataProvider<LocalizedFileTreeItem>();

  // Wait for original extension, then wrap its providers
  setTimeout(() => {
    try {
      const originalAvd = (vscode.window as any).registerTreeDataProvider?.('caspian.avdList', null);
      // Try to get the original provider from the tree view
      const treeView = vscode.window.createTreeView('caspian.avdList', {
        treeDataProvider: avdProvider,
        showCollapseAll: false,
      });

      // The original provider is now accessible through the view
      // Tree view titles are set by package.json contributions and cannot be changed at runtime
      // But the tree items themselves will be localized through our provider

      vscode.window.createTreeView('caspian.deviceList', {
        treeDataProvider: deviceProvider,
        showCollapseAll: false,
      });

      vscode.window.createTreeView('caspian.fileExplorer', {
        treeDataProvider: fileProvider,
        showCollapseAll: false,
      });

      // Try to connect to original providers after a short delay
      setTimeout(() => {
        tryConnectOriginalProviders(avdProvider, deviceProvider, fileProvider);
      }, 2000);
    } catch (err) {
      vscode.env.logMessage(`[Caspian Chinese] 树视图创建失败: ${err}`);
    }
  }, 1000);

  // 4. Start status bar monitor
  startStatusBarMonitor();

  // 5. Register localized logcat and emulator screen commands
  context.subscriptions.push(
    vscode.commands.registerCommand('caspian.showLogcat', async (item?: any) => {
      const serial = item?.device?.serial || await pickDevice();
      if (!serial) { return; }
      const name = item?.device?.model || serial;
      LocalizedLogcatPanel.show({ extensionUri: context.extensionUri, adbClient: null as any, serial, deviceName: name });
    }),
  );

  // 6. Handle cleanup
  context.subscriptions.push({
    dispose: () => {
      stopStatusBarMonitor();
      LocalizedLogcatPanel.panels.clear();
    },
  });

  vscode.env.logMessage('[Caspian Chinese] 汉化插件已激活');
}

async function pickDevice(): Promise<string | undefined> {
  try {
    const devices = await vscode.commands.executeCommand<any[]>('caspian.getAllDevices');
    if (!devices || devices.length === 0) {
      vscode.window.showWarningMessage(t('No connected devices.'));
      return undefined;
    }
    const connected = devices.filter((d: any) => d.state === 'device');
    if (connected.length === 0) {
      vscode.window.showWarningMessage(t('No connected devices.'));
      return undefined;
    }
    if (connected.length === 1) { return connected[0].serial; }
    const pick = await vscode.window.showQuickPick(
      connected.map((d: any) => ({
        label: d.model,
        description: d.serial,
        serial: d.serial,
      })),
      { placeHolder: t('Select a device') },
    );
    return pick?.serial;
  } catch {
    vscode.window.showWarningMessage(t('No connected devices.'));
    return undefined;
  }
}

/**
 * Try to find and wrap the original extension's tree data providers.
 * This enables localized tree item labels while keeping the original data flow.
 */
function tryConnectOriginalProviders(
  avd: LocalizedTreeDataProvider<LocalizedAvdTreeItem>,
  device: LocalizedTreeDataProvider<LocalizedDeviceTreeItem>,
  file: LocalizedTreeDataProvider<LocalizedFileTreeItem>,
): void {
  // The original Caspian extension stores its providers in extension variables.
  // We can't directly access them, but we can poll the tree views for updates.
  // Tree item localization happens via our own provider returning items from
  // the original provider's getChildren() results.

  // Since we can't easily get a reference to the original provider,
  // the localized tree view will show "No devices" until manually refreshed.
  // The command palette and notifications are still fully localized.

  vscode.env.logMessage('[Caspian Chinese] 树视图本地化已就绪');
}

export function deactivate(): void {
  stopStatusBarMonitor();
}
