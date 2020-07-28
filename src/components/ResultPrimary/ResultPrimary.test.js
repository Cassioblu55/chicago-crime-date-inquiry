import React from 'react';
import { shallow } from 'enzyme';
import ResultPrimary from './ResultPrimary';

describe('ResultPrimary', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ResultPrimary />);
    expect(wrapper).toMatchSnapshot();
  });
});
