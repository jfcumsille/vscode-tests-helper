import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export const isLenguageSupported = (relativeFilePath: string) => {
	return relativeFilePath.endsWith('.rb') || relativeFilePath.endsWith('.js') || relativeFilePath.endsWith('.ts');
};

export const shouldUseDoppler = async () => {
	const dopplerFile = await vscode.workspace.findFiles('doppler.yaml');
	return dopplerFile.length > 0 ?  true : false;
};

export const isVitestInstalled = () => {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	if (!workspaceFolders) {
			return false;
	}

	const rootPath = workspaceFolders[0].uri.fsPath;
	const packageJsonPath = path.join(rootPath, 'package.json');

	try {
			const rawData = fs.readFileSync(packageJsonPath, 'utf8');
			const packageJson = JSON.parse(rawData);

			return !!(packageJson.devDependencies && packageJson.devDependencies.vitest);
	} catch (error) {
			return false;
	}
};