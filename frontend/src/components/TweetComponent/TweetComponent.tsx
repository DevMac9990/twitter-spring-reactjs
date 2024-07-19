import React, { FC, memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Paper } from "@material-ui/core";

import { useTweetComponentStyles } from "./TweetComponentStyles";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import TweetComponentActions from "../TweetComponentActions/TweetComponentActions";
import ShareTweetIconButton from "../ShareTweetIconButton/ShareTweetIconButton";
import VoteComponent from "../VoteComponent/VoteComponent";
import QuoteIconButton from "../QuoteIconButton/QuoteIconButton";
import Quote from "../Quote/Quote";
import { TweetResponse } from "../../types/tweet";
import { ReplyType } from "../../types/common";
import TweetDeleted from "../TweetDeleted/TweetDeleted";
import LikeIconButton from "./LikeIconButton/LikeIconButton";
import ReplyIconButton from "./ReplyIconButton/ReplyIconButton";
import AnalyticsIconButton from "./AnalyticsIconButton/AnalyticsIconButton";
import TweetMedia from "./TweetMedia/TweetMedia";
import TweetHeader from "./TweetHeader/TweetHeader";
import TweetAvatar from "./TweetAvatar/TweetAvatar";
import TweetReplyingUsername from "./TweetReplyingUsername/TweetReplyingUsername";
import TweetText from "./TweetText/TweetText";
import TweetImage from "./TweetImage/TweetImage";
import TweetReplyConversation from "./TweetReplyConversation/TweetReplyConversation";
import TweetActions from "./TweetActions/TweetActions";
import { DEFAULT_PROFILE_IMG } from "../../constants/url-constants";
import TweetListComponent from "../TweetListComponent/TweetListComponent";
import GifImage from "../GifImage/GifImage";
import Border from "../BorderTweet/BorderTweet";
import TweetAvatarLine from "./TweetAvatarLine/TweetAvatarLine";
import { tr } from "date-fns/locale";

export interface TweetComponentProps {
    tweet?: TweetResponse;
    activeTab?: number;
    isTweetImageModal?: boolean;
}

const TweetComponent: FC<TweetComponentProps> = memo(({ tweet, activeTab, isTweetImageModal }): ReactElement => {
    const myProfileId = useSelector(selectUserDataId);
    const isUserCanReply = tweet?.replyType === ReplyType.MENTION && myProfileId !== tweet?.author.id;
    const classes = useTweetComponentStyles({ isTweetImageModal });

    return (
        // one type quoteTweet id
        // two not quoteTweet id
        <Paper className={classes.container} variant="outlined">
            {
             tweet?.quoteTweet?.id ? (
                    <div className={classes.tweetWrapper}>
                        <TweetAvatar userId={tweet?.quoteTweet.author.id} src={tweet?.quoteTweet.author.avatar ?? DEFAULT_PROFILE_IMG} />
                        <div className={classes.tweetContainer}>
                            <div className={classes.header}>
                                <TweetHeader
                                    userId={tweet?.quoteTweet.author.id}
                                    fullName={tweet?.quoteTweet.author.fullName}
                                    username={tweet?.quoteTweet.author.username}
                                    isPrivateProfile={tweet?.quoteTweet.author.isPrivateProfile}
                                    dateTime={tweet!.quoteTweet.createdAt}
                                />
                                <TweetComponentActions tweetId={tweet!.quoteTweet.id} />
                            </div>
                            <div className={classes.tweetContent}>
                                <TweetText text={tweet?.quoteTweet.text} tweetId={tweet?.quoteTweet.id} />
                                {/* 缺少的参数 quoteTweet?.images*/ }
                                {/*{tweet?.images?.length !== 0 && (*/}
                                {/*    <TweetImage*/}
                                {/*        tweetId={tweet?.id}*/}
                                {/*        imageSrc={tweet?.images?.[0].src}*/}
                                {/*        imageDescription={tweet?.imageDescription}*/}
                                {/*        taggedImageUsers={tweet?.taggedImageUsers}*/}
                                {/*    />*/}
                                {/*)}*/}
                                {/*{tweet?.gifImage &&*/}
                                {/*    <GifImage tweetId={tweet?.id} gifImage={tweet?.gifImage} withLink />}*/}
                                {/*{tweet?.poll && <VoteComponent tweetId={tweet?.id} poll={tweet?.poll} />}*/}
                                {/*{tweet?.author.isFollower && tweet?.replyType === ReplyType.FOLLOW && (*/}
                                {/*    <TweetReplyConversation />*/}
                                {/*)}*/}

                                {tweet?.quoteTweet.author.isFollower && (
                                    <TweetReplyConversation />
                                )}
                                {/*{tweet?.quoteTweet &&*/}
                                {/*    (tweet?.quoteTweet.isDeleted ? <TweetDeleted /> : <Quote quoteTweet={tweet?.quoteTweet} />)}*/}
                                <Border borderTweet={tweet} />
                                <TweetMedia
                                    link={tweet?.link}
                                    linkTitle={tweet?.linkTitle}
                                    linkDescription={tweet?.linkDescription}
                                    linkCover={tweet?.linkCover}
                                    linkCoverSize={tweet?.linkCoverSize}
                                />
                                {tweet?.tweetList && <TweetListComponent tweetList={tweet.tweetList} />}
                            </div>
                            <div className={classes.footer}>
                                <ReplyIconButton
                                    tweetId={tweet?.id}
                                    text={tweet?.text}
                                    image={tweet?.images?.[0]}
                                    createdAt={tweet?.createdAt}
                                    tweetAuthor={tweet?.author}
                                    repliesCount={tweet?.repliesCount}
                                    isUserCanReply={isUserCanReply}
                                />
                                <QuoteIconButton
                                    tweetId={tweet?.id}
                                    createdAt={tweet?.createdAt}
                                    text={tweet?.text}
                                    author={tweet?.author}
                                    isTweetRetweeted={tweet?.isTweetRetweeted}
                                    retweetsCount={tweet?.retweetsCount}
                                />
                                <LikeIconButton
                                    tweetId={tweet?.id}
                                    isTweetLiked={tweet?.isTweetLiked}
                                    likesCount={tweet?.likesCount}
                                />
                                <ShareTweetIconButton tweetId={tweet!.id} />
                                {myProfileId === tweet?.author.id && (
                                    <AnalyticsIconButton
                                        tweetUserFullName={tweet?.author.fullName}
                                        tweetUserName={tweet?.author.username}
                                        tweetText={tweet?.text}
                                        isUserCanReply={isUserCanReply}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ) : tweet?.items? (<>{
                    tweet?.items.map((item,i) => (
                        <>
                            <TweetActions tweetId={item.id} retweetsUserIds={item.retweetsUserIds} activeTab={activeTab} />
                            <div style={{
                                display:"flex",
                                alignItems:"stretch",
                            }}>
                                <div><TweetAvatarLine userId={item.author.id} src={item.author.avatar ?? DEFAULT_PROFILE_IMG}  lineTrue={tweet?.items?.length == i+1 ? false :true } /></div>
                                <div className={classes.tweetWrapper}>
                                    <div className={classes.tweetContainer} >
                                        <div className={classes.header}>
                                            <TweetHeader
                                                userId={item.author.id}
                                                fullName={item.author.fullName}
                                                username={item.author.username}
                                                isPrivateProfile={item.author.isPrivateProfile}
                                                dateTime={item.createdAt}
                                            />
                                            <TweetComponentActions tweetId={item.id} />
                                        </div>
                                        <div className={classes.tweetContent}>

                                            {item.addressedUsername && (
                                                <TweetReplyingUsername
                                                    addressedId={item.addressedId}
                                                    addressedUsername={item.addressedUsername}
                                                />
                                            )}
                                            <TweetText text={item.text} tweetId={item.id} />
                                            {item.images?.length !== 0 && (
                                                <TweetImage
                                                    tweetId={item.id}
                                                    imageSrc={item.images?.[0].src}
                                                    imageDescription={item.imageDescription}
                                                    taggedImageUsers={item.taggedImageUsers}
                                                />
                                            )}

                                            {item.gifImage &&
                                                <GifImage tweetId={item.id} gifImage={item.gifImage} withLink />}
                                            {item.poll && <VoteComponent tweetId={item.id} poll={item.poll} />}
                                            {item.author.isFollower && item.replyType === ReplyType.FOLLOW && (
                                                <TweetReplyConversation />
                                            )}
                                            {item.quoteTweet &&
                                                (item.quoteTweet.isDeleted ? <TweetDeleted /> :
                                                    <Quote quoteTweet={item.quoteTweet} />)}
                                            <TweetMedia
                                                link={item.link}
                                                linkTitle={item.linkTitle}
                                                linkDescription={item.linkDescription}
                                                linkCover={item.linkCover}
                                                linkCoverSize={item.linkCoverSize}
                                            />
                                            {item.tweetList && <TweetListComponent tweetList={item.tweetList} />}
                                        </div>
                                        <div className={classes.footer}>
                                            <ReplyIconButton
                                                tweetId={item.id}
                                                text={item.text}
                                                image={item.images?.[0]}
                                                createdAt={item.createdAt}
                                                tweetAuthor={item.author}
                                                repliesCount={item.repliesCount}
                                                isUserCanReply={isUserCanReply}
                                            />
                                            <QuoteIconButton
                                                tweetId={item.id}
                                                createdAt={item.createdAt}
                                                text={item.text}
                                                author={item.author}
                                                isTweetRetweeted={item.isTweetRetweeted}
                                                retweetsCount={item.retweetsCount}
                                            />
                                            <LikeIconButton
                                                tweetId={item.id}
                                                isTweetLiked={item.isTweetLiked}
                                                likesCount={item.likesCount}
                                            />
                                            <ShareTweetIconButton tweetId={item.id} />
                                            {myProfileId === item.author.id && (
                                                <AnalyticsIconButton
                                                    tweetUserFullName={item.author.fullName}
                                                    tweetUserName={item.author.username}
                                                    tweetText={item.text}
                                                    isUserCanReply={isUserCanReply}
                                                />
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                    ))
             }</>) : (
                 <>
                     <TweetActions tweetId={tweet?.id} retweetsUserIds={tweet?.retweetsUserIds} activeTab={activeTab} />
                     <div className={classes.tweetWrapper}>
                         <TweetAvatar userId={tweet?.author.id} src={tweet?.author.avatar ?? DEFAULT_PROFILE_IMG} />
                         <div className={classes.tweetContainer}>
                             <div className={classes.header}>
                                 <TweetHeader
                                     userId={tweet?.author.id}
                                     fullName={tweet?.author.fullName}
                                     username={tweet?.author.username}
                                     isPrivateProfile={tweet?.author.isPrivateProfile}
                                     dateTime={tweet!.createdAt}
                                 />
                                 <TweetComponentActions tweetId={tweet!.id} />
                             </div>
                             <div className={classes.tweetContent}>
                                 {tweet?.addressedUsername && (
                                     <TweetReplyingUsername
                                         addressedId={tweet?.addressedId}
                                         addressedUsername={tweet.addressedUsername}
                                     />
                                 )}
                                 <TweetText text={tweet?.text} tweetId={tweet?.id} />
                                 {tweet?.images?.length !== 0 && (
                                     <div style={{
                                         display: "flex",
                                         flexWrap:"wrap"
                                     }}>
                                         {
                                             tweet?.images?.map((image, index) => (
                                                 <TweetImage
                                                     tweetId={tweet?.id}
                                                     imageSrc={image.src}
                                                     imageDescription={tweet?.imageDescription}
                                                     taggedImageUsers={tweet?.taggedImageUsers}
                                                     key={index}
                                                     lengthImag={tweet?.images.length}
                                                 />

                                             ))
                                         }
                                     </div>
                                     )}
                                 {tweet?.gifImage &&
                                     <GifImage tweetId={tweet?.id} gifImage={tweet?.gifImage} withLink />}
                                 {tweet?.poll && <VoteComponent tweetId={tweet?.id} poll={tweet?.poll} />}
                                 {tweet?.author.isFollower && tweet?.replyType === ReplyType.FOLLOW && (
                                     <TweetReplyConversation />
                                 )}
                                 {tweet?.quoteTweet &&
                                     (tweet?.quoteTweet.isDeleted ? <TweetDeleted /> :
                                         <Quote quoteTweet={tweet?.quoteTweet} />)}
                                 <TweetMedia
                                     link={tweet?.link}
                                     linkTitle={tweet?.linkTitle}
                                     linkDescription={tweet?.linkDescription}
                                     linkCover={tweet?.linkCover}
                                     linkCoverSize={tweet?.linkCoverSize}
                                 />
                                 {tweet?.tweetList && <TweetListComponent tweetList={tweet.tweetList} />}
                             </div>
                             <div className={classes.footer}>
                                 <ReplyIconButton
                                     tweetId={tweet?.id}
                                     text={tweet?.text}
                                     image={tweet?.images?.[0]}
                                     createdAt={tweet?.createdAt}
                                     tweetAuthor={tweet?.author}
                                     repliesCount={tweet?.repliesCount}
                                     isUserCanReply={isUserCanReply}
                                 />
                                 <QuoteIconButton
                                     tweetId={tweet?.id}
                                     createdAt={tweet?.createdAt}
                                     text={tweet?.text}
                                      author={tweet?.author}
                                      isTweetRetweeted={tweet?.isTweetRetweeted}
                                      retweetsCount={tweet?.retweetsCount}
                                  />
                                  <LikeIconButton
                                      tweetId={tweet?.id}
                                      isTweetLiked={tweet?.isTweetLiked}
                                      likesCount={tweet?.likesCount}
                                  />
                                  <ShareTweetIconButton tweetId={tweet!.id} />
                                  {myProfileId === tweet?.author.id && (
                                      <AnalyticsIconButton
                                          tweetUserFullName={tweet?.author.fullName}
                                          tweetUserName={tweet?.author.username}
                                          tweetText={tweet?.text}
                                          isUserCanReply={isUserCanReply}
                                      />
                                  )}
                              </div>
                          </div>
                      </div>
                  </>
                )
            }
        </Paper>
    );
});

export default TweetComponent;
