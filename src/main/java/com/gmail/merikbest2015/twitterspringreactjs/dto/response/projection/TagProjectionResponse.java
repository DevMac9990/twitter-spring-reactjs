package com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TagProjectionResponse {
    private Long id;
    private String tagName;
    private Long tweetsQuantity;
}
