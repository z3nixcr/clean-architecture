
interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type FailureCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly failureCallback: FailureCallback
    ) {}

    async execute(url: string): Promise<boolean> {
        try {
            const request = await fetch(url);
            if (!request.ok) {
                throw new Error(`Failed to check service: ${url}`);
            }

            this.successCallback()
            return true;
        } catch (error) {
            this.failureCallback(`${error}`);
            return false;
        }
    }
}