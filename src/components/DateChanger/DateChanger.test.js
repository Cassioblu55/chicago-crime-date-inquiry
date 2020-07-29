import React from 'react';
import { shallow } from 'enzyme';
import DateChanger from './DateChanger';

describe('DateChanger', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<DateChanger />);
    expect(wrapper).toMatchSnapshot();
  });
});
