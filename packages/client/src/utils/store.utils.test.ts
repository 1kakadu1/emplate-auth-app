
import { createFeatureSelector } from "./store.utils";

describe('Store utils', () => {
        it('create feature selector', () => {
                const selector = createFeatureSelector<{ value: string, loading: boolean }>("feature");
                expect(selector).not.toBeNull();
        });
});
