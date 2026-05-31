import React, { type ComponentPropsWithoutRef } from 'react';

import { env } from '@/configs/env';

interface BaseImageProps extends ComponentPropsWithoutRef<'img'> {
  src?: string;
}

export const ImageServer: React.FC<BaseImageProps> = ({ src, ...restProps }) => {
  const baseUrl = env.baseImageUrl || '';

  const fullSrc = src ? `${baseUrl}${src}` : undefined;

  return <img src={fullSrc} {...restProps} />;
};
