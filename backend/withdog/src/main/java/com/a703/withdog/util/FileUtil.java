package com.a703.withdog.util;

import com.a703.withdog.repository.WalkMongoDBRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RequiredArgsConstructor
@Component
public class FileUtil {

    private final WalkMongoDBRepository walkMongoDBRepository;
    private final ClientUtil clientUtil;

    public String fileUpload(MultipartFile image){
        String uploadPath = "/images/walk-course";

        try {
            String savePath = uploadPath + java.io.File.separator + UUID.randomUUID() + "." + extractExt(image.getOriginalFilename());

            java.io.File check = new java.io.File(uploadPath);
            check.mkdir();
            clientUtil.saveImage(image, savePath);

            return savePath;

        } catch (Exception e) {
            e.printStackTrace();
            return e.toString();
        }
    }

    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }

}
