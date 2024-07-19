import React, { FC, memo, ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MODAL } from "../../../constants/path-constants";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { CloseIcon } from "../../../icons";
import { useAddTweetImageStyles } from "./AddTweetImageStyles";
import TagPeople from "./TagPeople/TagPeople";
import AddDescription from "./AddDescription/AddDescription";
import { selectImages } from "../../../store/ducks/addTweetForm/selector";
import { removeImages } from "../../../store/ducks/addTweetForm/actionCreators"


const AddTweetImage: FC = memo((): ReactElement | null => {
    const classes = useAddTweetImageStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const images = useSelector(selectImages);
    let  arrImg = [...images]
    const onClickRemoveImage = (img:any): void => {
        // console.log("images", images);
        // console.log("img", img);
        const index = arrImg.indexOf(img);
        // console.log(index)
        arrImg.splice(index, 1);
        dispatch(removeImages([...arrImg]));
    };

    if (images.length === 0) {
        return null;
    }
    // console.log("images=======",images)
    return (
        <>
            {
                images.map((img) => <div
                    className={(location.pathname.includes(MODAL)) ? classes.imageSmall : classes.image}>
                    <img src={img.src} alt={img.src} />
                    <div className={classes.imageRemove}>
                        <ActionIconButton
                            actionText={"Remove"}
                            icon={CloseIcon}
                            onClick={()=>{
                                onClickRemoveImage(img)
                            }}
                            size={"medium"}
                        />
                    </div>
                </div>)
            }
            <div>
                <TagPeople />
                <AddDescription />
            </div>
        </>
    );
});

export default AddTweetImage;
