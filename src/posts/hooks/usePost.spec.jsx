// Task 1: test the usePost hook here.
// Acceptance criteria:
// 1) Include a test that intercepts the post by id request and assert the returned data has the correct structure.
// 2) Include a test that covers passing extra arguments to usePost
// (e.g. when passing enabled = true, assert that the useQuery hook is called
// with an object that contains enabled: true).

import { describe, expect, test, } from 'vitest'
import { usePost } from './usePost';
import {renderHook, waitFor} from "@testing-library/react";
import {createReactQueryWrapper, server} from "@/test/index.js";
import {http, HttpResponse} from "msw";


describe('usePost', () => {

    test('should retrieve post by id', async () => {
        const id = 1;

        server.use(
            http.get(`https://jsonplaceholder.typicode.com/posts/${id}`, () => {
                return HttpResponse.json({
                    userId: 1,
                    id: 1,
                    title: 'title',
                    body: 'body'
                })
            })
        )

        const { result } = renderHook(() => usePost(id), { wrapper: createReactQueryWrapper() })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual({
            userId: 1,
            id: 1,
            title: expect.any(String),
            body: expect.any(String)
        })
    });
})

