package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.broker.producer.TagProducer;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.enums.ReplyType;
import com.gmail.merikbest2015.enums.TweetType;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.client.ImageClient;
import com.gmail.merikbest2015.file.ImageService;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.TweetImage;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.TweetImageRepository;
import com.gmail.merikbest2015.repository.TweetRepository;
import com.gmail.merikbest2015.repository.projection.*;
import com.gmail.merikbest2015.service.TweetService;
import com.gmail.merikbest2015.service.UserService;
import com.gmail.merikbest2015.service.util.TweetServiceHelper;
import com.gmail.merikbest2015.service.util.TweetValidationHelper;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.TWEET_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class TweetServiceImpl implements TweetService {

    private final TweetRepository tweetRepository;
    private final TweetServiceHelper tweetServiceHelper;
    private final TweetValidationHelper tweetValidationHelper;
    private final TweetImageRepository tweetImageRepository;
    private final UserService userService;
    private final TagProducer tagProducer;
    private final ImageClient imageClient;

    @Override
    @Transactional(readOnly = true)
    public Page<TweetProjection> getTweets(Pageable pageable) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return tweetRepository.getTweetsByAuthors(authUserId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public TweetProjection getTweetById(Long tweetId) {
        TweetProjection tweet = tweetRepository.getTweetById(tweetId, TweetProjection.class)
                .orElseThrow(() -> new ApiRequestException(TWEET_NOT_FOUND, HttpStatus.NOT_FOUND));
        tweetValidationHelper.validateTweet(tweet.isDeleted(), tweet.getAuthor().getId());
        return tweet;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<TweetUserProjection> getPinnedTweetByUserId(Long userId) {
        User user = tweetValidationHelper.validateUserProfile(userId);
        return tweetRepository.getPinnedTweetById(user.getPinnedTweet());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TweetUserProjection> getUserTweets(Long userId, Pageable pageable) {
        User user = tweetValidationHelper.validateUserProfile(userId);
        return tweetRepository.getTweetsByUserId(user, user.getPinnedTweet(), pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TweetProjection> getUserMediaTweets(Long userId, Pageable pageable) {
        tweetValidationHelper.validateUserProfile(userId);
        return tweetRepository.getUserMediaTweets(userId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProfileTweetImageProjection> getUserTweetImages(Long userId) {
        tweetValidationHelper.validateUserProfile(userId);
        return tweetRepository.getUserTweetImages(userId, PageRequest.of(0, 6));
    }

    @Override
    @Transactional(readOnly = true)
    public TweetAdditionalInfoProjection getTweetAdditionalInfoById(Long tweetId) {
        TweetAdditionalInfoProjection additionalInfo = tweetRepository.getTweetById(tweetId, TweetAdditionalInfoProjection.class)
                .orElseThrow(() -> new ApiRequestException(TWEET_NOT_FOUND, HttpStatus.NOT_FOUND));
        tweetValidationHelper.validateTweet(additionalInfo.isDeleted(), additionalInfo.getAuthor().getId());
        return additionalInfo;
    }

    @Override
    @Transactional(readOnly = true)
    public List<TweetProjection> getRepliesByTweetId(Long tweetId) {
        tweetValidationHelper.checkValidTweet(tweetId);
        return tweetRepository.getRepliesByTweetId(tweetId);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TweetProjection> getQuotesByTweetId(Long tweetId, Pageable pageable) {
        tweetValidationHelper.checkValidTweet(tweetId);
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return tweetRepository.getQuotesByTweet(authUserId, tweetId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TweetProjection> getMediaTweets(Pageable pageable) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return tweetRepository.getMediaTweets(authUserId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TweetProjection> getTweetsWithVideo(Pageable pageable) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return tweetRepository.getTweetsWithVideo(authUserId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TweetProjection> getFollowersTweets(Pageable pageable) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return tweetRepository.getFollowersTweets(authUserId, pageable);
    }

    @Autowired
    ImageService imageService;
    @Override
    @Transactional(readOnly = false)
    public TweetImage uploadTweetImage(MultipartFile file) {
        String imageSrc = imageService.uploadImage(file);
        return tweetImageRepository.save(new TweetImage(imageSrc));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserProjection> getTaggedImageUsers(Long tweetId, Pageable pageable) {
        Tweet tweet = tweetValidationHelper.checkValidTweet(tweetId);
        return userService.getTaggedImageUsers(tweet, pageable);
    }

    @Override
    @Transactional
    public TweetResponse createNewTweet(Tweet tweet) {
        return tweetServiceHelper.createTweet(tweet);
    }

    @Override
    @Transactional
    public String deleteTweet(Long tweetId) {
        User authUser = userService.getAuthUser();
        Tweet tweet = tweetRepository.getTweetByUserId(authUser.getId(), tweetId)
                .orElseThrow(() -> new ApiRequestException(TWEET_NOT_FOUND, HttpStatus.NOT_FOUND));
        if (authUser.getPinnedTweet() != null && authUser.getPinnedTweet().equals(tweet)) {
            authUser.setPinnedTweet(null);
        }
        tagProducer.deleteTag(tweetId);
        tweet.setDeleted(true);
        return "Your Tweet was deleted";
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TweetProjection> searchTweets(String text, Pageable pageable) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return tweetRepository.searchTweets(text, authUserId, pageable);
    }

    @Override
    @Transactional
    public TweetResponse replyTweet(Long addressedUserId, Long tweetId, Tweet reply) {
        User addressedUser = tweetValidationHelper.validateUserProfile(addressedUserId);
        Tweet tweet = tweetValidationHelper.checkValidTweet(tweetId);
        reply.setTweetType(TweetType.REPLY);
        reply.setAddressedUser(addressedUser);
        reply.setAddressedTweet(tweet);
        TweetResponse tweetResponse = tweetServiceHelper.createTweet(reply);
        tweetRepository.addReply(tweetId, tweetResponse.getId());
        tweetRepository.updateRepliesCount(tweet);
        return tweetResponse;
    }

    @Override
    @Transactional
    public TweetResponse quoteTweet(Long tweetId, Tweet quote) {
        Tweet tweet = tweetValidationHelper.checkValidTweet(tweetId);
        quote.setQuoteTweet(tweet);
        TweetResponse tweetResponse = tweetServiceHelper.createTweet(quote);
        tweetRepository.addQuote(tweetId, tweetResponse.getId());
        tweetRepository.updateQuotesCount(tweet);
        return tweetResponse;
    }

    @Override
    @Transactional
    public TweetProjection changeTweetReplyType(Long tweetId, ReplyType replyType) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        Tweet tweet = tweetRepository.getTweetByAuthorIdAndTweetId(tweetId, authUserId)
                .orElseThrow(() -> new ApiRequestException(TWEET_NOT_FOUND, HttpStatus.NOT_FOUND));

        if (!tweet.getAuthor().getId().equals(authUserId)) {
            throw new ApiRequestException(TWEET_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        tweet.setReplyType(replyType);
        return getTweetById(tweet.getId());
    }
}
