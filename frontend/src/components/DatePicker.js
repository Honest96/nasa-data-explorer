import React from 'react';

function DatePicker ({
    value,
    onChange,
    label = 'Select Date',
    id = 'date-picker',
    maxDate = null,
    minDate = null,
    className = ""
}) {
    const defaultMaxDate = new Date().toISOString().split('T')[0]; //YYYY-MM-DD format

    return (
        <div className={'date-picker ${className}'}>
            <label htmlFor={id}>{label}</label>
            <input
                type='date'
                id={id}
                value={value}
                onChange={onChange}
                max={defaultMaxDate}
                min={minDate}
                className='date-picker-input'
                />
        </div>
    );
}

export default DatePicker;