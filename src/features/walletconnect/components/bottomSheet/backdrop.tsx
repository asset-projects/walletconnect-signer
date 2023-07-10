import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import React, {type FC} from 'react';

export const CustomBottomSheetBackdrop: FC<
  BottomSheetBackdropProps
> = props => {
  return (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );
};
