package com.a703.spot.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Getter
@ToString
@Table(name = "tbl_spot_review")
public class SpotReview extends BaseTime {
    @Id
    @Column(name = "review_idx", unique = true, columnDefinition = "BIGINT")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewIdx;

    @ManyToOne
    @JoinColumn(name = "spot_id", updatable = false, nullable = false)
    private Spot spot;

    @Column(name = "star", columnDefinition = "DOUBLE")
    private double star;

    @Column(name = "content", columnDefinition = "VARCHAR(255)")
    private String content;

    @Column(name = "deleted", columnDefinition = "TINYINT(1)")
    @ColumnDefault("0")
    private boolean deleted;

    @Column(name = "user_idx", columnDefinition = "BIGINT", nullable = false)
    private Long userIdx;

    public void setIsDeleted(boolean flag) {
        this.deleted = flag;
    }
}
