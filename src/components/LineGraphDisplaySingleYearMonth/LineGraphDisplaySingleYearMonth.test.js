import React from 'react';
import { shallow } from 'enzyme';
import LineGraphDisplaySingleYearMonth from './LineGraphDisplaySingleYearMonth';

describe('LineGraphDisplaySingleYearMonth', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<LineGraphDisplaySingleYearMonth />);
    expect(wrapper).toMatchSnapshot();
  });
});
