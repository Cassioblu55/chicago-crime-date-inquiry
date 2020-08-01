import React from 'react';
import { shallow } from 'enzyme';
import DateSelector from './LineGraphDateSelector';

describe('DateSelector', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<DateSelector />);
    expect(wrapper).toMatchSnapshot();
  });
});
