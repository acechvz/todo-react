import React from 'react';

export const withLoading = Component => ({ isLoading, loadingText = '', ...rest }) => {
    return (
        isLoading ?
        <div className="loading">
          <span>{ loadingText }</span>
          <i className="fas fa-spinner fa-pulse fa-1x"></i>
        </div> :
        <Component {...rest} />
    )
}