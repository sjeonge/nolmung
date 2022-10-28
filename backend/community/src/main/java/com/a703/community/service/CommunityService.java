package com.a703.community.service;

import com.a703.community.dto.request.RegisterPostRequest;
import com.a703.community.dto.response.MainListDto;
import com.a703.community.dto.response.OtherListDto;
import com.a703.community.dto.response.PostDto;
import com.a703.community.dto.response.WithListDto;
import com.a703.community.entity.TblPost;
import com.a703.community.entity.TblPostLike;
import com.a703.community.entity.TblPostLikeId;
import com.a703.community.entity.TblPostPhoto;
import com.a703.community.repository.PostPhotoRepository;
import com.a703.community.repository.PostRepository;
import com.a703.community.repository.PostLikeRepository;
import com.a703.community.type.CategoryType;
import com.a703.community.util.File;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CommunityService {

    private final PostRepository postRepository;

    private final PostLikeRepository postLikeRepository;

    private final PostPhotoRepository postPhotoRepository;

    private final File file;

    public void registerPost(RegisterPostRequest registerPost, Map<String, Object> token, List<MultipartFile> files) throws IOException {

        Long userIdx = 1L;// 토큰 받아서 유저서버에 보내서 받아오기
        Long dogIdx = 1L;//통신해서 받아와야함 산책할 강아지도 등록해줘야함

        TblPost post = TblPost.builder()
                .subject(registerPost.getSubject())
                .categoryType(registerPost.getCategoryType())
                .content(registerPost.getContent())
                .dogIdx(dogIdx)
                .writerIdx(userIdx)
                .getDeleted(false)
                .getCompleted(false)
                .location(registerPost.getLocation())
                .leadLine(registerPost.getLeadLine())
                .pay(registerPost.getPay())
                .poopBag(registerPost.getPoopBag())
                .walkDate(registerPost.getWalkDate())
                .reRegister(0)
                .build();

        TblPost savePost =postRepository.save(post);

        if (files !=null) {
            for (MultipartFile multipartFile : files) {
                file.fileUpload(multipartFile, savePost.getPostIdx());

            }
        }

    }
    //진짜 삭제하지말기
    public void deletePost(Long postIdx){
        TblPost post = postRepository.findByPostIdx(postIdx);
        post.setGetDeleted(Boolean.TRUE);
        postRepository.save(post);

    }
    //재등록
    public void reRegisterPost(Long postIdx){
        TblPost post = postRepository.findByPostIdx(postIdx);
        post.setReRegister(post.getReRegister()+1);
        postRepository.save(post);

    }

    public void completePost(Long postIdx){
        TblPost post = postRepository.findByPostIdx(postIdx);
        post.setGetCompleted(true);
        postRepository.save(post);

    }

    public void pushLike(Long postIdx,Map<String, Object> token){

        //통신필요
        Long userIdx =1L;
        TblPost post=postRepository.findByPostIdx(postIdx);

        TblPostLikeId id = TblPostLikeId.builder()
                        .userIdx(userIdx)
                        .post(post)
                        .build();

        TblPostLike postLike = TblPostLike.builder()
                        .id(id)
                        .build();

        postLikeRepository.save(postLike);
    }

    public PostDto showPost(Long postIdx, Map<String, Object> token){
        //통신해서 받아와야함
        Long userIdx =1L;
        List<TblPostPhoto> postPhotos = postPhotoRepository.findByPostPostIdx(postIdx);

        TblPost post = postRepository.findByPostIdx(postIdx);
        //강아지 관련 api연결해야됨
        return PostDto.builder()
                .getLike(postLikeRepository.existsByIdUserIdxAndIdPostPostIdx(userIdx,postIdx))
                .writer("통신필요")
                .dogBreed(null)
                .dogName(null)
                .dogImgUrl(null)
                .photoUrl(postPhotoRepository.existsByPostPostIdx(post.getPostIdx()) ? convertPostPhotoListToUrlList(postPhotos) : null)
                .categoryType(post.getCategoryType())
                .content(post.getContent())
                .leadLine(post.getLeadLine())
                .pay(post.getPay())
                .location(post.getLocation())
                .walkDate(post.getWalkDate())
                .poopBag(post.getPoopBag())
                .build();


    }
    public List<String> convertPostPhotoListToUrlList(List<TblPostPhoto> postPhotos){
        return postPhotos.stream().map(TblPostPhoto::getPhotoUrl).collect(Collectors.toList());
    }

    public List<MainListDto> showMainList(Pageable pageable){

        Page<TblPost> mainLists = postRepository.findAll(pageable);

        return mainLists.stream().map(main-> MainListDto.builder()
                        .postIdx(main.getPostIdx())
                        .subject(main.getSubject())
                        .categoryType(main.getCategoryType())
                        .build())
                .collect(Collectors.toList());
    }

    public List<WithListDto> showWithList(Pageable pageable){

        Page<TblPost> withLists = postRepository.findByCategoryType(CategoryType.WITH,pageable);

        return withLists.stream().map(with-> WithListDto.builder()
                .writer("통신필요")
                .postIdx(with.getPostIdx())
                .likeCnt(Math.toIntExact(postLikeRepository.countReviewLikeByIdPostPostIdx(with.getPostIdx())))
                .location(with.getLocation())
                .modifyDate(with.getModifyDate())
                        .thumbnailUrl(postPhotoRepository.existsByPostPostIdx(with.getPostIdx()) ? postPhotoRepository.findByPostPostIdx(with.getPostIdx()).get(0).getPhotoUrl() : null)
                .walkDate(with.getWalkDate())
                .build())
                .collect(Collectors.toList());
    }

    public List<OtherListDto> showOtherList(Pageable pageable){

        Page<TblPost> otherLists =  postRepository.findByCategoryType(CategoryType.OTHER,pageable);

        return otherLists.stream().map(other-> OtherListDto.builder()
                        .writer("통신필요")
                        .postIdx(other.getPostIdx())
                        .likeCnt(Math.toIntExact(postLikeRepository.countReviewLikeByIdPostPostIdx(other.getPostIdx())))
                        .location(other.getLocation())
                        .modifyDate(other.getModifyDate())
                        .walkDate(other.getWalkDate())
                        .pay(other.getPay())
                        .thumbnailUrl(postPhotoRepository.existsByPostPostIdx(other.getPostIdx()) ? postPhotoRepository.findByPostPostIdx(other.getPostIdx()).get(0).getPhotoUrl() : null)
                        .build())
                .collect(Collectors.toList());
    }

}
