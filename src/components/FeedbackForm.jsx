import React, { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

const FeedbackForm = () => {
    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);
    const [text, setText] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [rating, setRating] = useState(10);
    const [message, setMessage] = useState("");

    const handleTextChange = (event) => {
        if (text === "") {
            setBtnDisabled(true);
            setMessage(null);
        } else if (text !== "" && text.trim().length <= 10) {
            setMessage("Test must be at least 10 characters");
            setBtnDisabled(true);
        } else {
            setMessage(null);
            setBtnDisabled(false);
        }
        setText(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating,
            };
            if (feedbackEdit.edit) updateFeedback(feedbackEdit.item.id, newFeedback);
            else addFeedback(newFeedback);
            setText("");
        }
    };

    useEffect(() => {
        if (feedbackEdit.edit) {
            setBtnDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }
    }, [feedbackEdit]);

    return (
        <Card>
            <h2>How was your service with us?</h2>
            <RatingSelect select={(rating) => setRating(rating)} />
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input onChange={handleTextChange} type="text" value={text} />
                    <Button type="submit" isDisabled={btnDisabled}>
                        Send
                    </Button>
                </div>
                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    );
};

export default FeedbackForm;
