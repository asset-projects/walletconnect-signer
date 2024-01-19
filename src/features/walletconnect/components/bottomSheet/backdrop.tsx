import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import React from 'react';

export function CustomBottomSheetBackdrop(
  props: BottomSheetBackdropProps,
): React.JSX.Element {
  return (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );
}
