import * as vscode from 'vscode';

export const isLenguageSupported = (relativeFilePath: string) => {
	return relativeFilePath.endsWith('.rb') || relativeFilePath.endsWith('.js') || relativeFilePath.endsWith('.ts');
};

export const shouldUseDoppler = async () => {
	const dopplerFile = await vscode.workspace.findFiles('doppler.yaml');
	return dopplerFile.length > 0 ?  true : false;
};
