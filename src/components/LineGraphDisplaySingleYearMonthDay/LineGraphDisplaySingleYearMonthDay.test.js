import React from 'react';
import { shallow } from 'enzyme';
import LineGraphDisplaySingleYearMonthDay from './LineGraphDisplaySingleYearMonthDay';

describe('LineGraphDisplaySingleYearMonthDay', () => {
	test('matches snapshot', () => {
		const wrapper = shallow(<LineGraphDisplaySingleYearMonthDay />);
		expect(wrapper).toMatchSnapshot();
	});
});
