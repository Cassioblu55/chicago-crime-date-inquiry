import React from 'react';
import { shallow } from 'enzyme';
import LineGraphDisplay from './LineGraphDisplay';

describe('LineGraphDisplay', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<LineGraphDisplay />);
    expect(wrapper).toMatchSnapshot();
  });
});
