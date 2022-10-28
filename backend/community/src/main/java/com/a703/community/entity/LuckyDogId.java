package com.a703.community.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LuckyDogId implements Serializable {

    private Long dogIdx;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_idx", referencedColumnName = "post_idx")
    private Post post;
}
