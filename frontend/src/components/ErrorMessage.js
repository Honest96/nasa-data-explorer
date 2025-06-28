import React from 'react';

function ErrorMessage({
    message,
    onRetry = null,
    retryText = 'Try Again',
    type = 'error',
    className = ""
}) {
    return (
        <div className={'error-message ${type} ${className}'}>
            <div className='error-content'>
                <span className='error-icon'>⚠️</span>
                <p className='error-text'>{message}</p>
            </div>
            {onRetry && (
                <button onClick={onRetry}
                        className='error-retry-btn'>
                        {retryText}
                        </button>
            )}
        </div>
    );
}

export default ErrorMessage;