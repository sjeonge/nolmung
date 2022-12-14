package com.a703.spot.mapper;

import com.a703.spot.dto.response.SpotDto;
import com.a703.spot.dto.response.SpotSimpleDto;
import com.a703.spot.dto.response.SpotTransferDto;
import com.a703.spot.entity.Spot;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@NoArgsConstructor
public class SpotMapper {

    final String PREFIX = "\\|";

    final String ITEM_DIVIDER = ":";

    final String DESC_DIVDER = ",";

    public SpotDto TransferDtoToDto(SpotTransferDto transferDto) {
        List<String> descList = getDescList(transferDto.getDescription());
        Map<String, String > timeMap = getMap(transferDto.getTime());
        Map<String, String> menuMap = getMap(transferDto.getMenu());
        return SpotDto.builder()
                .spotId(transferDto.getSpotId())
                .name(transferDto.getName())
                .imgCnt(transferDto.getImgCnt())
                .address(transferDto.getAddress())
                .tel(transferDto.getTel())
                .tag(transferDto.getTag())
                .descList(descList)
                .time(timeMap)
                .menu(menuMap)
                .lat(transferDto.getLat())
                .lng(transferDto.getLng())
                .distance(transferDto.getDistance())
                .build();
    }

    public SpotDto EntityToDto(Spot entitiy) {
        List<String> descList = getDescList(entitiy.getDescription());
        Map<String, String > timeMap = getMap(entitiy.getTime());
        Map<String, String> menuMap = getMap(entitiy.getMenu());
        return SpotDto.builder()
                .spotId(entitiy.getSpotId())
                .name(entitiy.getName())
                .imgCnt(entitiy.getImgCnt())
                .address(entitiy.getAddress())
                .tel(entitiy.getTel())
                .tag(entitiy.getTag())
                .descList(descList)
                .time(timeMap)
                .menu(menuMap)
                .lat(entitiy.getLat())
                .lng(entitiy.getLng())
                .build();
    }

    public SpotSimpleDto EntitiyToSimpleDto(Spot entity) {
        return SpotSimpleDto.builder()
                .spotId(entity.getSpotId())
                .name(entity.getName())
                .imgCnt(entity.getImgCnt())
                .lat(entity.getLat())
                .lng(entity.getLng())
                .build();
    }

    List<String> getDescList(String descStr) {
        if(descStr == null || descStr.equals("")) return null;
        List<String> descList = new ArrayList<String>();
        String[] descriptionArr = descStr.split(DESC_DIVDER);
        for(String description : descriptionArr) {
            descList.add(description.trim());
        }
        return descList;
    }

    Map<String, String> getMap(String str) {
        if(str == null || str.equals("")) return null;
        Map<String, String> map = new HashMap<String, String>();
        String[] arr = str.split(PREFIX);
        for(String s : arr) {
            String[] item = s.split(ITEM_DIVIDER);
            String key = item[0].trim();
            String value = item[1].trim();
            map.put(key, value);
        }
        return map;
    }

}
