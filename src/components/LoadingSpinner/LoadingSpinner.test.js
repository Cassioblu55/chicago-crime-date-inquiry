import React from 'react';
import { shallow } from 'enzyme';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<LoadingSpinner />);
    expect(wrapper).toMatchSnapshot();
  });
});
