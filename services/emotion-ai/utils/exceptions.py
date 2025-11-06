"""
自定义异常类
用于AI服务的错误处理
"""


class ModelNotFoundError(Exception):
    """
    模型未找到异常

    当必需的AI模型文件不存在时抛出此异常
    通常在服务启动或模型初始化时检测
    """
    pass


class ModelLoadError(Exception):
    """
    模型加载失败异常

    当模型文件存在但加载失败时抛出此异常
    可能的原因：文件损坏、版本不兼容、内存不足等
    """
    pass


class ModelInitializationError(Exception):
    """
    模型初始化失败异常

    当模型加载成功但初始化/预热失败时抛出此异常
    """
    pass
