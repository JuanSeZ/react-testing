// Task 2: test the Post component.
// Acceptance criteria
// 1) Include at least one snapshot.
// 2) The copy to clipboard functionality must be fully tested.
import React from "react";
import { describe, expect, vi, test } from 'vitest';
import {usePost} from "@/posts/hooks/index.js";
import {fireEvent, getByText, render, waitFor} from "@testing-library/react";
import {Post} from "@/posts/Post.jsx";
import {MemoryRouter} from "react-router-dom";

vi.mock('./hooks/usePost', () => ({
    usePost: vi.fn(),
}));


vi.mock('lucide-react', async (importOriginal) => {
    const mod = await importOriginal()
    return {
        ...mod,
        Share2Icon: (props) => <div {...props}>Share2Icon</div>,
        ArrowBigLeftIcon: (props) => <div {...props}>ArrowBigLeftIcon</div>,
    }
})


describe('Post', () => {

    test('should match snapshot when there is succesful', () => {

        usePost.mockReturnValue({
            status: 'success',
            data: {
                title: 'Title',
                body: 'Body'
            }
        });

        const {container} = render(<Post/>, {wrapper: MemoryRouter});
        expect(container.firstChild).toMatchSnapshot();
    });

    test('should match snapshot when there is an error', () => {

        usePost.mockReturnValue({
            status: 'error',
            error: new Error('An error occurred!')
        });

        const {container} = render(<Post/>, {wrapper: MemoryRouter});
        expect(container.firstChild).toMatchSnapshot();
    });
})

describe('Post', () => {

    test('should copy to clipboard', async () => {
        window.navigator.clipboard = {writeText: vi.fn(() => Promise.resolve())}

        usePost.mockReturnValue({
            status: 'success',
            data: {
                title: '..',
                body: '..'
            }
        })

        const {container} = render(<Post />, { wrapper: (props) => <MemoryRouter initialEntries={['/posts/1']} {...props} /> })
        fireEvent.click(getByText(container,'Share2Icon'))

        await waitFor(() => {
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(`${location.origin}/posts/1`)
        })
    })

})