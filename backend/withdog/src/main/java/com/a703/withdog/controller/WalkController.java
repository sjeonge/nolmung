package com.a703.withdog.controller;

import com.a703.withdog.dto.WalkDTO;
import com.a703.withdog.dto.WalkRes;
import com.a703.withdog.service.WalkService;
import com.a703.withdog.util.FileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/walk")
@RequiredArgsConstructor
public class WalkController {
    private final WalkService walkService;
    private final FileUtil fileUtil;

    @PostMapping
    public ResponseEntity<?> saveWalk(@RequestBody WalkDTO walk) {
        /**
         * @Method Name : saveWalk
         * @Method 설명 : 산책 기록 저장 후 산책 id 반환
         */
        String walkIdx = walkService.saveWalk(walk);

        return ResponseEntity.ok().body(walkIdx.toString());
    }

    @PostMapping(value = "/img/{walkIdx}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> saveImg(@RequestPart(value = "image", required = false) MultipartFile image, @PathVariable String walkIdx) {
        /**
         * @Method Name : saveImg
         * @Method 설명 : 산책코스 이미지 저장
         */
        log.info("이미지 업로드 시작");
        if(image != null) {
            String courseImgUrl = fileUtil.fileUpload(image);
            log.info("이미지URL : "+courseImgUrl);
            walkService.updateImg(courseImgUrl, walkIdx);
        }

        return ResponseEntity.ok().body(HttpStatus.OK);
    }

    @GetMapping("/owner/{ownerIdx}")
    public ResponseEntity<?> getWalkListByOwner(@PathVariable Long ownerIdx) {
        /**
         * @Method Name : getWalkListByOwner
         * @Method 설명 : 견주 id로 산책 기록들 조회
         */
        List<WalkRes> walkResList = walkService.findByOwnerIdx(ownerIdx);
        if (!walkResList.isEmpty()) {
            return ResponseEntity.ok().body(walkResList);
        }

        return ResponseEntity.badRequest().body(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/dog/{walkedDogIdx}")
    public ResponseEntity<?> getWalkListByWalkedDog(@PathVariable Long walkedDogIdx) {
        /**
         * @Method Name : getWalkListByWalkedDog
         * @Method 설명 : 산책한 강아지 id로 산책 기록들 조회
         */
        List<WalkRes> walkResList = walkService.findByWalkedDog(walkedDogIdx);
        if (!walkResList.isEmpty()) {
            return ResponseEntity.ok().body(walkResList);
        }
        return ResponseEntity.badRequest().body(HttpStatus.NOT_FOUND);
    }
}
