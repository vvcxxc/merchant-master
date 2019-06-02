/**title: 商圈广告 */

import React, { Component } from 'react';
import AdLayout from '../components/ad-layout';
import From from './form';
import ExpenseCalendar from '../components/expense-calendar';

export default class BusinessArea extends Component {
	render() {
		const form = <From />;
		const expenseCalendar = <ExpenseCalendar />;
		return <AdLayout children={[form, expenseCalendar]} />;
	}
}
