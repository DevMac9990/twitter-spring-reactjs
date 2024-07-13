import { RootState } from "../../store";
import { TweetsState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";
import { selectUserTweetsState } from "../userTweets/selectors";

export const selectTweetsState = (state: RootState): TweetsState => state.tweets;
export const selectLoadingState = (state: RootState): LoadingStatus => selectTweetsState(state).loadingState;
export const selectIsTweetsLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsTweetsLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;

export const selectTweetsItems = (state: RootState) =>{
    let lastQuoteIndex = -1;
    selectTweetsState(state).items.forEach((item, index) => {
        if (item.quoteTweet && typeof item.quoteTweet === 'object') {
            lastQuoteIndex = index;
        }
    });
    let updatedItems =  selectTweetsState(state).items.map((item, index) => {
        if (index === lastQuoteIndex) {
            return {...item, isFalse: true};
        }
        return item;
    });
    let referencedIds = new Set();
    selectTweetsState(state).items.forEach(item => {
        if (item.quoteTweet && typeof item.quoteTweet === 'object') {
            referencedIds.add(item.quoteTweet.id);
        }
    });

    let tweets = updatedItems.filter(item => !referencedIds.has(item.id) ||  item.isFalse);
    return tweets
};
export const selectTweetsItemsSize = (state: RootState) => selectTweetsState(state).items.length;
export const selectPagesCount = (state: RootState) => selectTweetsState(state).pagesCount;
