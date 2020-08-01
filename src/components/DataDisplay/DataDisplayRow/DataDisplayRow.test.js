import React from 'react';
import { shallow } from 'enzyme';
import DataDisplayRow from './DataDisplayRow';

describe('DataDisplayRow', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<DataDisplayRow />);
    expect(wrapper).toMatchSnapshot();
  });
});
