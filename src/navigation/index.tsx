import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './stack';

export const NavigationRoot: React.VFC = () => {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};
