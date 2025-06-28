import React from 'react';

function LoadingSpinner({
    message = 'Loading...',
    size = 'medium',
    className = ''
}) {
    return (
        <div className={'loading-spinner ${size} ${className}'}>
            <div className='spinner-circle'></div>
            {message && <p className='loading-message'>{message}</p>}
        </div>
    );
}

export default LoadingSpinner;