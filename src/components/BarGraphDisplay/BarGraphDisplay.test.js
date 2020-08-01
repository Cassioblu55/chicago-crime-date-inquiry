import React from 'react';
import { shallow } from 'enzyme';
import BarGraphDisplay from './BarGraphDisplay';

describe('BarGraphDisplay', () => {
	test('matches snapshot', () => {
		const wrapper = shallow(<BarGraphDisplay />);
		expect(wrapper).toMatchSnapshot();
	});
});
