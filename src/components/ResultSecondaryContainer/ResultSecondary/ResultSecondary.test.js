import React from 'react';
import { shallow } from 'enzyme';
import ResultSecondary from './ResultSecondary';

describe('ResultSecondary', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ResultSecondary />);
    expect(wrapper).toMatchSnapshot();
  });
});
