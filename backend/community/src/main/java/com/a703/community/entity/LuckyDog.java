package com.a703.community.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "lucky_dog")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class LuckyDog {

    @EmbeddedId
    private LuckyDogId id;




}
