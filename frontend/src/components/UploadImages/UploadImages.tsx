import React, { FC, memo, ReactElement, useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { MediaIcon } from "../../icons";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import { setImages } from "../../store/ducks/addTweetForm/actionCreators";
import { fi } from "date-fns/locale";

const UploadImages: FC = memo((): ReactElement => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClickImage = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleChangeFileInput = useCallback((event: Event): void => {
        if (event.target) {
            const target = event.target as HTMLInputElement;
            console.log("target", target.files);
            let fileImages = []
            if(target.files && target.files.length > 0 ) {
                for (const file of target.files) {
                    const fileObj = new Blob([file]);
                    console.log(fileObj,file)
                    fileImages.push({
                        src: URL.createObjectURL(fileObj),
                        file: file,
                    })

                }
                console.log(fileImages)
                dispatch(setImages(fileImages))
            }
            // const file = target.files?.[0];
            // console.log("file",file)
            // if (file) {
            //     const fileObj = new Blob([file]);
            //     console.log(fileObj,"000")
            //     dispatch(setImages([{ src: URL.createObjectURL(fileObj), file }]));
            // }
        }
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener("change", handleChangeFileInput);
        }
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener("change", handleChangeFileInput);
            }
        };
    }, []);

    return (
        <>
            <ActionIconButton actionText={"Media"} icon={MediaIcon} onClick={handleClickImage} size={"medium"} />
            <input ref={inputRef} type="file" id="upload-input"  multiple hidden />
        </>
    );
});

export default UploadImages;
