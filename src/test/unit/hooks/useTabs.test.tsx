import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { renderWithQueryClient } from '@test/test-utils';
import StackTemp from '@templates/stackTemp';
import { useFunnel } from '@utils/useFunnel';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

// const setStep = jest.fn();
// const setStepState = jest.fn();
// function TestComponent() {
// 	const [테스트퍼널, setStep] = useFunnel({
// 		initialStep: 'time',
// 	});
// 	const setStepState = jest.fn();
// 	const setStep = jest.fn();

// 	return (
// 		<테스트퍼널>
// 			<테스트퍼널.Step name="time">
// 				<StackTemp next={() => setStep('time')} setState={setStepState} />,
// 			</테스트퍼널.Step>
// 		</테스트퍼널>
// 	);
// }
beforeEach(() => {
	const setStepState = jest.fn();
	const setStep = jest.fn();

	renderWithQueryClient(
		<StackTemp next={() => setStep('time')} setState={setStepState} />,
	);
});

describe('useTabs가 정상적으로 동작하는지 테스트', () => {
	it('기술 Menu가 선택된채로 렌더된다.', async () => {
		const button = screen.getByTestId('skillMenu');
		expect(button).toHaveClass('selected');
	});
	it('skill Menu 버튼을 누르면 skill Menu의 item 들이 렌더된다.', async () => {});
	it('selectedItem 들을 모아볼 수 있는 영역 만들기', async () => {});
	it('MenuItem 사용자 검색 기능', async () => {});
});
