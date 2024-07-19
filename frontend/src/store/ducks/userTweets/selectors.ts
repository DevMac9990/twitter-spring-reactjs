import { RootState } from "../../store";
import { UserTweetsState } from "./contracts/state";
import { LinkCoverSize, LoadingStatus, ReplyType } from "../../../types/common";

export const selectUserTweetsState = (state: RootState): UserTweetsState => state.userTweets;
export const selectUserTweetsLoadingStatus = (state: RootState): LoadingStatus => selectUserTweetsState(state).loadingState;
export const selectIsUserTweetsLoading = (state: RootState): boolean => selectUserTweetsLoadingStatus(state) === LoadingStatus.LOADING;
export const selectIsUserTweetsLoaded = (state: RootState): boolean => selectUserTweetsLoadingStatus(state) === LoadingStatus.LOADED;
export const selectUserTweetsItems = (state: RootState) => {
    let mapState = []
    mapState.push(...selectUserTweetsState(state).items)
    mapState.push({
        "id": 126,
        "text": "11222",
        "quotesCount": 0,
        "poll": {
            id: 1,
            createdAt: "",
            pollChoices: []
        },
        "createdAt": "2024-07-16T11:39:09.639788",
        "scheduledDate": "",
        "addressedUsername": "",
        "addressedId": 0,
        "addressedTweetId": 1,
        "replyType": ReplyType.EVERYONE,
        "link": "",
        "linkTitle": "",
        "linkDescription": "",
        "linkCover": "",
        "gifImage": {
            "id": 100,
            "url": "https://media2.giphy.com/media/yvBAuESRTsETqNFlEl/giphy.gif?cid=bc55fbc55tcm4rtxsn91nuvxcksv8px6s6rlocwufeeawg0b&ep=v1_gifs_search&rid=giphy.gif&ct=g",
            "width": 480,
            "height": 480
        },
        "linkCoverSize": LinkCoverSize.LARGE,
        "author": {
            "id": 2,
            "fullName": "MrCat",
            "username": "Cat",
            "avatar": "https://perfumeweb2.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg",
            "isPrivateProfile": true,
            "isFollower": false,
            "isMyProfileBlocked": false,
            "isUserBlocked": false,
            "isUserMuted": false
        },
        "images": [],
        "imageDescription": "",
        "taggedImageUsers": [],
        "retweetsCount": 0,
        "likesCount": 0,
        "repliesCount": 0,
        "retweetsUserIds": [],
        "isDeleted": false,
        "isTweetLiked": false,
        "isTweetRetweeted": false,
        "isUserFollowByOtherUser": false,
        "isTweetDeleted": false,
        "isTweetBookmarked": false,
        "items":[
            {
                "id": 126,
                "text": "11222",
                "quotesCount": 0,
                "poll": {
                    "id": 1,
                    "createdAt": "",
                    "pollChoices": []
                },
                "createdAt": "2024-07-16T11:39:09.639788",
                "scheduledDate": "",
                "addressedUsername": "",
                "addressedId": 0,
                "addressedTweetId": 1,
                "replyType": ReplyType.EVERYONE,
                "link": "",
                "linkTitle": "",
                "linkDescription": "",
                "linkCover": "",
                "gifImage": {
                    "id": 100,
                    "url": "https://media2.giphy.com/media/yvBAuESRTsETqNFlEl/giphy.gif?cid=bc55fbc55tcm4rtxsn91nuvxcksv8px6s6rlocwufeeawg0b&ep=v1_gifs_search&rid=giphy.gif&ct=g",
                    "width": 480,
                    "height": 480
                },
                "linkCoverSize": LinkCoverSize.LARGE,
                "author": {
                    "id": 2,
                    "fullName": "MrCat",
                    "username": "Cat",
                    "avatar": "https://perfumeweb2.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg",
                    "isPrivateProfile": true,
                    "isFollower": false,
                    "isMyProfileBlocked": false,
                    "isUserBlocked": false,
                    "isUserMuted": false
                },
                "images": [],
                "imageDescription": "",
                "taggedImageUsers": [],
                "quoteTweet": {
                    "id": 116,
                    "text": "00",
                    "createdAt": "2024-07-12T04:00:42.675332",
                    "link": "",
                    "linkTitle": "",
                    "linkDescription": "",
                    "linkCover": "",
                    "linkCoverSize": "",
                    "author": {
                        "id": 2,
                        "fullName": "MrCat",
                        "username": "Cat",
                        "avatar": "https://perfumeweb2.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg",
                        "isPrivateProfile": true,
                        "isFollower": false,
                        "isMyProfileBlocked": false,
                        "isUserBlocked": false,
                        "isUserMuted": false
                    },
                    "isDeleted": false
                },
                "retweetsCount": 0,
                "likesCount": 0,
                "repliesCount": 0,
                "retweetsUserIds": [],
                "isDeleted": false,
                "isTweetLiked": false,
                "isTweetRetweeted": false,
                "isUserFollowByOtherUser": false,
                "isTweetDeleted": false,
                "isTweetBookmarked": false,
            },
            {
                "id": 126,
                "text": "11222",
                "quotesCount": 0,
                "poll": {
                    id: 1,
                    createdAt: "",
                    pollChoices: []
                },
                "createdAt": "2024-07-16T11:39:09.639788",
                "scheduledDate": "",
                "addressedUsername": "",
                "addressedId": 0,
                "addressedTweetId": 1,
                "replyType": ReplyType.EVERYONE,
                "link": "",
                "linkTitle": "",
                "linkDescription": "",
                "linkCover": "",
                "gifImage": {
                    "id": 100,
                    "url": "https://media2.giphy.com/media/yvBAuESRTsETqNFlEl/giphy.gif?cid=bc55fbc55tcm4rtxsn91nuvxcksv8px6s6rlocwufeeawg0b&ep=v1_gifs_search&rid=giphy.gif&ct=g",
                    "width": 480,
                    "height": 480
                },
                "linkCoverSize": LinkCoverSize.LARGE,
                "author": {
                    "id": 2,
                    "fullName": "MrCat",
                    "username": "Cat",
                    "avatar": "https://perfumeweb2.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg",
                    "isPrivateProfile": true,
                    "isFollower": false,
                    "isMyProfileBlocked": false,
                    "isUserBlocked": false,
                    "isUserMuted": false
                },
                "images": [],
                "imageDescription": "",
                "taggedImageUsers": [],
                "quoteTweet": {
                    "id": 116,
                    "text": "00",
                    "createdAt": "2024-07-12T04:00:42.675332",
                    "link": "",
                    "linkTitle": "",
                    "linkDescription": "",
                    "linkCover": "",
                    "linkCoverSize": "",
                    "author": {
                        "id": 2,
                        "fullName": "MrCat",
                        "username": "Cat",
                        "avatar": "https://perfumeweb2.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg",
                        "isPrivateProfile": true,
                        "isFollower": false,
                        "isMyProfileBlocked": false,
                        "isUserBlocked": false,
                        "isUserMuted": false
                    },
                    "isDeleted": false
                },
                // 缺少image相关字段
                "retweetsCount": 0,
                "likesCount": 0,
                "repliesCount": 0,
                "retweetsUserIds": [],
                "isDeleted": false,
                "isTweetLiked": false,
                "isTweetRetweeted": false,
                "isUserFollowByOtherUser": false,
                "isTweetDeleted": false,
                "isTweetBookmarked": false,
            }
        ]
    })
    console.log("MapList",mapState)
    return mapState
};
export const selectPagesCount = (state: RootState) => selectUserTweetsState(state).pagesCount;
