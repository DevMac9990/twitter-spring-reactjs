import React, { FC, memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";

import { PROFILE } from "../../../constants/path-constants";
import { useGlobalStyles } from "../../../util/globalClasses";

interface TweetAvatarProps {
    src?: string;
    userId?: number;
    lineTrue?:boolean
}

const TweetAvatarLine: FC<TweetAvatarProps> = memo(({ src, userId,lineTrue }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    // console.log("TweetAvatarLine", lineTrue);
    return (
        <div style={
            {
                height:"100%",
            }
        }>
            <Link to={`${PROFILE}/${userId}`} className={globalClasses.linkhei}>
                <Avatar className={globalClasses.avatar} src={src} alt={`avatar ${userId}`} />
            </Link>
            <div style={{
                width:"2px",
                backgroundColor: lineTrue ? "rgb(51, 54, 57)" : "",
                height:"100%",
                marginLeft:"auto",
                marginRight:"auto",
            }}></div>

        </div>

    );
});

export default TweetAvatarLine;
