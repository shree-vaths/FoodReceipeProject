'use client'
import { useRef } from 'react';
import classes from './image-picker.module.css';

export default function ImagePicker() {
    const imageRef = useRef();

    function handlePick() {
        imageRef.current.click();
    }
    return (
        <div className={classes.picker}>
            <label htmlFor="image">{"image"}</label>
            <div className={classes.controls}>
                <input
                    className={classes.input}
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg"
                    name="image"
                    ref={imageRef}
                />
                <button onClick = {handlePick}className={classes.button} type="button">Pick an Image</button>
            </div>
        </div>
    )
}