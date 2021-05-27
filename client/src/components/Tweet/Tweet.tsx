import React, {FC, ReactElement} from 'react';
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import {Avatar, IconButton, Paper, Typography} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/ModeCommentOutlined";
import RepostIcon from "@material-ui/icons/RepeatOutlined";
import LikeIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShareIcon from '@material-ui/icons/ReplyOutlined';

import {useHomeStyles} from "../../pages/Home/HomeStyles";

interface TweetProps {
    classes: ReturnType<typeof useHomeStyles>
    text: string
    user: {
        fullname: string
        username: string
        avatarUrl: string
    }
}

const Tweet: FC<TweetProps> = ({classes, text, user}: TweetProps): ReactElement => {

    return (
        <Paper className={classNames(classes.tweet, classes.tweetsHeader)} variant="outlined">
            <Avatar
                className={classes.tweetAvatar}
                alt={`Аватарка пользователя ${user.fullname}`}
                src={user.avatarUrl}
            />
            <div>
                <Typography>
                    <b>{user.fullname}</b>&nbsp;
                    <span className={classes.tweetUserName}>@{user.username}</span>&nbsp;
                    <span className={classes.tweetUserName}>·</span>&nbsp;
                    <span className={classes.tweetUserName}>1 ч</span>
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {text}
                </Typography>
                <div className={classes.tweetFooter}>
                    <div>
                        <IconButton>
                            <CommentIcon style={{ fontSize: 20 }} />
                        </IconButton>
                        <span>1</span>
                    </div>
                    <div>
                        <IconButton>
                            <RepostIcon style={{ fontSize: 20 }} />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton>
                            <LikeIcon style={{ fontSize: 20 }} />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton>
                            <ShareIcon style={{ fontSize: 20 }} />
                        </IconButton>
                    </div>
                </div>
            </div>
        </Paper>
    );
};

export default Tweet;
