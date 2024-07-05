/*
 * @Author: caixin caixin185@163.com
 * @Date: 2024-07-03 19:04:20
 * @LastEditors: caixin
 * @LastEditTime: 2024-07-03 19:11:31
 * @Description: file content
 */
import { expect, test } from 'vitest'
import { testName } from '../src/index.ts'

test('vitest-test', () => {
    expect(testName('jack')).toBe('jack')
}) 