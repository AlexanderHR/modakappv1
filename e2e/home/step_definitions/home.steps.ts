import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';
import type { JSX } from 'react';
import IndexScreen from '../../../app/(tabs)/index';

Given('I am on the home screen', function () {
  const screen = render(IndexScreen() as JSX.Element);
  expect(screen).toBeTruthy();
});

Then('I should see the {string} title', function (title: string) {
  const titleElement = screen.getByText(title);
  expect(titleElement).toBeTruthy();
});

When('I tap on the first product', function () {
  const firstProduct = screen.getByTestId('product-card-1');
  fireEvent.press(firstProduct);
});

Then('I should see the product details screen', function () {
  const detailsScreen = screen.getByTestId('product-details');
  expect(detailsScreen).toBeTruthy();
});
