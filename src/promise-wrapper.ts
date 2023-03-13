import {useEffect, useState} from 'react';

export function wrapAsync<T, A extends unknown[]>(
    init: T,
    promise: (...args: A) => Promise<T>,
): (...arg: A) => T {
    return (...args: A) => {
        const [content, setContent] = useState<T>(init);
        useEffect(() => {
            promise(...args).then(setContent)
        }, [content]);
        return content;
    };
}
