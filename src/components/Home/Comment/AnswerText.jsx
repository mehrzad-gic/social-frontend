import React from 'react';  

const AnswerText = ({ rep, setRep, realCommentForm }) => {  
    
    const cancel = () => {  
        realCommentForm.current.blur();  
        setRep(null);  
    };  

    return (  
        <>  
        {rep ? (  
            <div className="d-flex btn-success-soft justify-content-between align-items-center p-2 mb-4 mt-4">  
                <p className="mb-0">Write Your Answer....</p>  
                <button className="btn btn-sm btn-secondary-soft" onClick={cancel}>Cancel</button>  
            </div>  
        ) : null}  
        </>  
    );  

};  

export default AnswerText;