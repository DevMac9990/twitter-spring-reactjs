package com.gmail.merikbest2015.util;

import cn.hutool.core.io.FileUtil;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileUtils {

    public static String uploadImage(MultipartFile multipartFile, String savePath, String fileHost) {
        String image = null;
        if (multipartFile != null) {
            String fileName = multipartFile.getOriginalFilename();
            String realFileName = System.currentTimeMillis() + fileName.substring(fileName.indexOf("_") + 1);
            String filePath = savePath + "/" + realFileName;
            File file = new File(filePath);
            // 将 MultipartFile 转换为输入流，并写入目标文件
            try {
                FileUtil.writeFromStream(multipartFile.getInputStream(), file);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
//            try (FileOutputStream fos = new FileOutputStream(file)) {
//                fos.write(multipartFile.getBytes());
//                fos.flush();
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
            image = fileHost +"/"+ realFileName;
        }
        return image;
    }
}
