package com.a703.spot.repository;

import com.a703.spot.entity.QSpotReview;
import com.a703.spot.entity.Spot;
import com.a703.spot.entity.SpotReview;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

import java.util.List;

import static com.a703.spot.entity.QSpotReview.spotReview;

@Repository
@RequiredArgsConstructor
public class SpotReviewRepositoryImpl implements SpotReviewRepositoryCustom {

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;
    @Override
    public Long getReviewCnt(String spotId) {
        return queryFactory
                .select(spotReview.count())
                .from(spotReview)
                .where(spotReview.spot.spotId.eq(spotId),
                        spotReview.deleted.eq(false))
                .fetchOne();
    }

    @Override
    public Double getStarAvg(String spotId) {
        return queryFactory
                .select(spotReview.star.avg())
                .from(spotReview)
                .where(spotReview.spot.spotId.eq(spotId),
                        spotReview.deleted.eq(false))
                .fetchOne();
    }

    @Override
    public List<SpotReview> findBySpot(Spot spot) {
        return queryFactory
                .selectFrom(spotReview)
                .where(spotReview.spot.eq(spot),
                        spotReview.deleted.eq(false))
                .orderBy(spotReview.createDate.desc())
                .fetch();
    }
}
