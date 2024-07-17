import { makeStyles } from "@material-ui/core";

export const useBorderStyles = makeStyles((theme) => ({
    borderTweetLink: {
        textDecoration: "none",
        color: theme.palette.text.primary,
        "& #link": {
            color: theme.palette.primary.main
        }
    },
    borderTweetContainer: {
        marginTop: 5,
        padding: 12,
        minHeight: 68,
        width: "100%",
        marginLeft: 0,
        fontSize: 14,
        borderRadius: 16,
        border: `1px solid ${theme.palette.divider}`,
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark
        }
    },
    borderTweetWrapper: {
        display: "flex",
        justifyContent: "flex-start"
    },
    borderTweetAvatar: {
        marginRight: 3,
        maxWidth: "20px !important",
        maxHeight: "20px !important"
    },
    borderTweetFullName: {
        fontWeight: 700,
        marginRight: 3
    },
    borderTweetUsername: {
        color: theme.palette.text.secondary
    },
    borderTweetText: {
        width: 490,
        "& #hashtag": {
            color: theme.palette.primary.main
        }
    }
}));
