import {RootState} from "../../store";
import {ChatState} from "./contracts/state";
import {LoadingStatus} from "../../types";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";

export const selectChat = (state: RootState): ChatState => state.chat;
export const selectChatItem = (state: RootState) => selectChat(state).item;
export const selectChatFirstParticipantId = (state: RootState) => selectChatItem(state)?.participants[0].user.id;
export const selectChatSecondParticipantId = (state: RootState) => selectChatItem(state)?.participants[1].user.id;
export const selectChatFirstParticipantAvatar = (state: RootState) => {
    const avatar = selectChatItem(state)?.participants[0].user.avatar;
    return avatar ? avatar.src : DEFAULT_PROFILE_IMG;
};
export const selectChatSecondParticipantAvatar = (state: RootState) => {
    const avatar = selectChatItem(state)?.participants[1].user.avatar
    return avatar ? avatar.src : DEFAULT_PROFILE_IMG;
};
export const selectLoadingState = (state: RootState) => selectChat(state).loadingState;
export const selectIsChatLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsChatLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;
