import { LiveCode } from './LiveCode.js';
describe('<live-code>', () => {
    it('is a custom element', () => {
        const editor = document.createElement('live-code');
        expect(editor instanceof LiveCode).toBe(true);
    });
    // ... TODO ...
});
//# sourceMappingURL=LiveCode.test.js.map