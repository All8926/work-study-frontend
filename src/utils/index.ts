import { message, Upload } from "antd";
import { UploadFile } from "antd/lib";

// 校验上传文件
export const checkImageFile = (file: UploadFile) => {

    // 校验文件大小
    if ((file.size || 0) > 1024 * 1024 * 2) {
      message.error('文件大小不能超过2MB');
      return Upload.LIST_IGNORE;
    }
    // 校验文件类型
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file?.type || '')) {
      message.error('不支持该文件类型!');
      return Upload.LIST_IGNORE;
    }
    return true;
}