// Task 4: test the PasswordTab component here, aiming for 100% coverage.
// Acceptance criteria:
// 1) Add form validation that makes sense, as a minimum:

// - `New password` can't be equal to `Current password`.
// - `New password` must match the `Repeat new password`.

// To build the form and the validation schema, you can follow a similar approach as in the AccountTab component.

// 2) When the form has no errors and is submitted, show a toast with:

// - Title: `Success`.
// - Text: `Password changed`.

// 3) Add tests aiming to cover all the functionality.
import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import {fireEvent, render, waitFor} from "@testing-library/react";
import {PasswordTab} from "@/settings/tabs/PasswordTab.jsx";
import {screen} from "@/test/index.js";

const mockToast = vi.fn();
vi.mock('@/components/ui/use-toast.js', () => ({
    useToast: vi.fn(() => ({ toast: mockToast }))
}))

describe('PasswordTab', () => {

    test('should match snapshot', () => {
        const { container } = render(<PasswordTab />)
        expect(container.firstChild).toMatchSnapshot()
    })

    test('submitting calls console.log with expected arguments', async () => {
        const consoleSpy = vi.spyOn(console, 'log')
        const { getByPlaceholderText} = render(<PasswordTab />)
        fireEvent.change(getByPlaceholderText('new'), { target: { value: 'new-secret-password' } })
        fireEvent.change(getByPlaceholderText('new-repeated'), { target: { value: 'new-secret-password' } })
        fireEvent.click(screen.getByRole('button', { name: 'Save password' }))
        await waitFor(() => {

            expect(consoleSpy).toHaveBeenCalledWith({
                values: {
                    new: 'new-secret-password', 'new-repeated': 'new-secret-password'
                }
            })

        })
    })

    test('should show error when new password is equal to current password', async () => {
        const { getByPlaceholderText} = render(<PasswordTab />)
        fireEvent.change(getByPlaceholderText('new'), { target: { value: 'secret-password' } })
        fireEvent.change(getByPlaceholderText('new-repeated'), { target: { value: 'not-same-password' } })
        fireEvent.click(screen.getByRole('button', { name: 'Save password' }))
        await waitFor(() => {
            expect(screen.getByText('New password and repeated password must match')).toBeInTheDocument()
        })
    })

    test('should show a toast with title `Success` and text `Password changed` when form is submitted', async () => {
        const { getByPlaceholderText } = render(<PasswordTab />)

        fireEvent.change(getByPlaceholderText('new'), { target: { value: 'new-secret-password' } })
        fireEvent.change(getByPlaceholderText('new-repeated'), { target: { value: 'new-secret-password' } })
        fireEvent.click(screen.getByRole('button', { name: 'Save password' }))

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalledWith({
                title: 'Success',
                text: 'Password changed'
            })
        })
    })

})