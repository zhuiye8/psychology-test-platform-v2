// ============================================================================
// MediaMTX配置
// ============================================================================

/**
 * MediaMTX媒体服务器配置
 *
 * MediaMTX部署在Windows，通过IP访问
 * 关键端口：
 * - 8889: WebRTC信令(WHIP/WHEP)
 * - 8189: WebRTC UDP媒体传输
 * - 8554: RTSP流输出
 */
export class MediaMtxConfig {
  /**
   * MediaMTX HTTP服务器地址
   * 示例: http://192.168.0.95:8889
   *
   * 获取Windows IP：在Windows CMD中执行 ipconfig
   * 测试连通性：curl http://192.168.0.95:8889
   */
  static getHost(): string {
    return process.env.MEDIAMTX_HOST || 'http://127.0.0.1:8889';
  }

  /**
   * 获取后端公开URL
   * 用于前端浏览器访问后端API
   *
   * @returns 后端公开URL（默认http://localhost:4001）
   */
  static getBackendPublicUrl(): string {
    return process.env.BACKEND_PUBLIC_URL || 'http://localhost:4001';
  }

  /**
   * 构建WHIP端点URL
   * 返回完整的后端代理URL，供浏览器访问
   *
   * @param streamName 流名称
   * @returns WHIP端点URL（完整URL）
   */
  static buildWhipUrl(streamName: string): string {
    const backendUrl = this.getBackendPublicUrl();
    return `${backendUrl}/api/webrtc/whip?stream=${encodeURIComponent(streamName)}`;
  }

  /**
   * 构建WHEP端点URL（用于播放）
   * 返回完整的后端代理URL，供浏览器访问
   *
   * @param streamName 流名称
   * @returns WHEP端点URL（完整URL）
   */
  static buildWhepUrl(streamName: string): string {
    const backendUrl = this.getBackendPublicUrl();
    return `${backendUrl}/api/webrtc/whep?stream=${encodeURIComponent(streamName)}`;
  }

  /**
   * 构建RTSP播放URL
   * 供AI服务消费RTSP流
   *
   * @param streamName 流名称
   * @returns RTSP URL
   */
  static buildRtspUrl(streamName: string): string {
    const host = this.getHost();
    // 将HTTP端口替换为RTSP端口8554
    const rtspHost = host.replace(':8889', ':8554').replace('http://', 'rtsp://');
    return `${rtspHost}/${streamName}`;
  }

  /**
   * 获取MediaMTX的WHIP完整URL（用于内部代理）
   * MediaMTX v1.14+ 标准格式：/{path}/whip
   *
   * @param streamName 流名称
   * @returns MediaMTX WHIP完整URL
   */
  static getMediaMtxWhipUrl(streamName: string): string {
    const host = this.getHost();
    return `${host}/${streamName}/whip`;  // ✅ 修复：正确的端点格式
  }

  /**
   * 获取MediaMTX的WHIP Fallback URL（旧版格式，已废弃）
   * 保留用于兼容旧版MediaMTX
   *
   * @param streamName 流名称
   * @returns MediaMTX WHIP Fallback URL
   */
  static getMediaMtxWhipFallbackUrl(streamName: string): string {
    const host = this.getHost();
    return `${host}/whip/${streamName}`;  // 旧版格式
  }

  /**
   * 获取MediaMTX的WHEP完整URL
   * MediaMTX v1.14+ 标准格式：/{path}/whep
   *
   * @param streamName 流名称
   * @returns MediaMTX WHEP完整URL
   */
  static getMediaMtxWhepUrl(streamName: string): string {
    const host = this.getHost();
    return `${host}/${streamName}/whep`;  // ✅ 修复：正确的端点格式
  }

  /**
   * 获取MediaMTX的WHEP Fallback URL（旧版格式，已废弃）
   * 保留用于兼容旧版MediaMTX
   *
   * @param streamName 流名称
   * @returns MediaMTX WHEP Fallback URL
   */
  static getMediaMtxWhepFallbackUrl(streamName: string): string {
    const host = this.getHost();
    return `${host}/whep/${streamName}`;  // 旧版格式
  }
}

/**
 * AI服务配置
 */
export class AiServiceConfig {
  /**
   * AI分析服务基础URL
   * 本地开发: http://localhost:5678
   * 生产环境: http://<AI服务器IP>:5678
   */
  static getBaseUrl(): string {
    return process.env.AI_SERVICE_URL || 'http://localhost:5678';
  }

  /**
   * 是否自动启动AI RTSP消费
   * 默认false，避免推流未建立时的竞态问题
   */
  static getAutoStartRtsp(): boolean {
    return process.env.AI_AUTOSTART_RTSP === 'true';
  }

  /**
   * 构建AI RTSP启动端点
   */
  static getRtspStartUrl(): string {
    return `${this.getBaseUrl()}/api/rtsp/start`;
  }

  /**
   * 构建AI RTSP停止端点
   */
  static getRtspStopUrl(): string {
    return `${this.getBaseUrl()}/api/rtsp/stop`;
  }
}
