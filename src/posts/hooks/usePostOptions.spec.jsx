import { describe, expect, test, vi } from 'vitest'
import {createReactQueryWrapper} from "@/test/index.js";
import {renderHook, waitFor} from "@testing-library/react";
import {usePost} from "@/posts/hooks/usePost.js";
import {useQuery} from "@tanstack/react-query";


// Task 1.2: test the usePost case when enabled is true
describe('usePostOptions', () => {

    test('should call useQuery when enabled is true', () => {
        const id = 1

        const {result} = renderHook(() => usePost(id, {enabled: true}), {wrapper: createReactQueryWrapper()})

        waitFor(() => {expect(result.current.isSuccess).toBe(true)})

        vi.mock('@tanstack/react-query')

        expect(useQuery).toHaveBeenCalledWith({enabled: true, queryKey: expect.any(Array), queryFn: expect.any(Function)})
    });
});