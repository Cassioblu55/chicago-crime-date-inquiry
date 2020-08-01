import React from 'react';
import { shallow } from 'enzyme';
import LineGraphDisplaySingleYear from './LineGraphDisplaySingleYear';

describe('LineGraphDisplaySingleYear', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<LineGraphDisplaySingleYear />);
    expect(wrapper).toMatchSnapshot();
  });
});
