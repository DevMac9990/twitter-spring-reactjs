import { RootState } from "../../store";
import { UserTweetsState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const selectUserTweetsState = (state: RootState): UserTweetsState => state.userTweets;
export const selectUserTweetsLoadingStatus = (state: RootState): LoadingStatus => selectUserTweetsState(state).loadingState;
export const selectIsUserTweetsLoading = (state: RootState): boolean => selectUserTweetsLoadingStatus(state) === LoadingStatus.LOADING;
export const selectIsUserTweetsLoaded = (state: RootState): boolean => selectUserTweetsLoadingStatus(state) === LoadingStatus.LOADED;
export const selectUserTweetsItems = (state: RootState) => {
    let lastQuoteIndex = -1;
    selectUserTweetsState(state).items.forEach((item, index) => {
        if (item.quoteTweet && typeof item.quoteTweet === 'object') {
            lastQuoteIndex = index;
        }
    });
    let updatedItems =  selectUserTweetsState(state).items.map((item, index) => {
        if (index === lastQuoteIndex) {
            return {...item, isFalse: true};
        }
        return item;
    });
    let referencedIds = new Set();
    selectUserTweetsState(state).items.forEach(item => {
        if (item.quoteTweet && typeof item.quoteTweet === 'object') {
            referencedIds.add(item.quoteTweet.id);
        }
    });

    let tweets = updatedItems.filter(item => !referencedIds.has(item.id) ||  item.isFalse);
   return tweets
};

export const selectPagesCount = (state: RootState) => selectUserTweetsState(state).pagesCount;
