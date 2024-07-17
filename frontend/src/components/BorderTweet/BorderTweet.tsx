import React, { FC, memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";

import { DEFAULT_PROFILE_IMG } from "../../constants/url-constants";
import { formatDate } from "../../util/format-date-helper";
import { textFormatter } from "../../util/text-formatter";
import { HOME_TWEET } from "../../constants/path-constants";
import { TweetResponse } from "../../types/tweet";
import { useBorderStyles } from "./BorderStyles";
import TweetText from "../TweetComponent/TweetText/TweetText";
import TweetImage from "../TweetComponent/TweetImage/TweetImage";
import GifImage from "../GifImage/GifImage";
import VoteComponent from "../VoteComponent/VoteComponent";
import TweetReplyConversation from "../TweetComponent/TweetReplyConversation/TweetReplyConversation";
import { ReplyType } from "../../types/common";
interface BorderTweetProps {
    borderTweet: TweetResponse;
}

const Border: FC<BorderTweetProps> = memo(({ borderTweet }): ReactElement => {
    const classes = useBorderStyles();

    return (
        <Link to={`${HOME_TWEET}/${borderTweet.id}`} className={classes.borderTweetLink}>
            <div className={classes.borderTweetContainer}>
                <div className={classes.borderTweetWrapper}>
                    <Avatar
                        className={classes.borderTweetAvatar}
                        alt={`avatar ${borderTweet.author.avatar}`}
                        src={borderTweet.author.avatar ?? DEFAULT_PROFILE_IMG}
                    />
                    <Typography component={"span"} className={classes.borderTweetFullName}>
                        {borderTweet.author.fullName}
                    </Typography>
                    <Typography component={"span"} className={classes.borderTweetUsername}>
                        @{borderTweet.author.username}
                    </Typography>&nbsp;
                    <Typography component={"span"} className={classes.borderTweetUsername}>·</Typography>&nbsp;
                    <Typography component={"span"} className={classes.borderTweetUsername}>
                        {formatDate(new Date(borderTweet.createdAt))}
                    </Typography>
                </div>
                <TweetText text={borderTweet?.text} tweetId={borderTweet?.id} />
                            {borderTweet?.images?.length !== 0 && (
                                <TweetImage
                                    tweetId={borderTweet?.id}
                                    imageSrc={borderTweet?.images?.[0].src}
                                    imageDescription={borderTweet?.imageDescription}
                                    taggedImageUsers={borderTweet?.taggedImageUsers}
                                />
                            )}
                            {borderTweet?.gifImage && <GifImage tweetId={borderTweet?.id} gifImage={borderTweet?.gifImage} withLink />}
                            {borderTweet?.poll && <VoteComponent tweetId={borderTweet?.id} poll={borderTweet?.poll} />}
                            {borderTweet?.author.isFollower && borderTweet?.replyType === ReplyType.FOLLOW && (
                                <TweetReplyConversation />)}
            </div>

        </Link>


    );
});

export default Border;
