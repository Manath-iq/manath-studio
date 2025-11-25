import React from 'react';

export interface ScrollState {
  progress: number; // 0 to 1
}

export type AsteriskProps = {
  scroll: React.MutableRefObject<number>;
};