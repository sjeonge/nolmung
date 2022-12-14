package com.a703.community.dto.response.connection;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown =true)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDto {

    private Long userIdx;

    private String nickname;

    private String profileImage;
}
