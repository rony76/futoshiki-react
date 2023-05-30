import React, { FC } from 'react';
import './Loading.css';

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => (
  <div className="Loading">
    Loading...
  </div>
);

export default Loading;
