package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.util.FileUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
@Transactional
@RequiredArgsConstructor
public class FileImageServiceImpl implements ImageService {
    @Value("${file.savePath}")
    private String savePath;
    @Value("${file.fileHost}")
    private String fileHost;

    @Override
    public String uploadImage(MultipartFile multipartFile) {
        return FileUtils.uploadImage(multipartFile, savePath, fileHost);
    }
}
