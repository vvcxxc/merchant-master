export const dva = {
	config: {
		onError(err: ErrorEvent, dispatch: any) {
			err.preventDefault();
		}
	}
};
